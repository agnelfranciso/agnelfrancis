"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
} from "lucide-react";

interface VideoPlayerProps {
  src: string;
  title?: string;
  poster?: string;
}

const SPEED_OPTIONS = [1, 1.25, 1.5, 2, 0.75];

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export default function VideoPlayer({ src, title, poster }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [hoverTime, setHoverTime] = useState<{ time: number; pct: number } | null>(null);

  const scheduleHideControls = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    setShowControls(true);
    if (isPlaying) {
      hideTimerRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2400);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      setShowControls(true);
    } else {
      scheduleHideControls();
    }
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [isPlaying, scheduleHideControls]);

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused || video.ended) {
      if (video.ended) {
        video.currentTime = 0;
        setHasEnded(false);
      }
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.muted || video.volume === 0) {
      video.muted = false;
      if (video.volume === 0) {
        video.volume = 0.8;
        setVolume(0.8);
      }
      setIsMuted(false);
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  }, []);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    const video = videoRef.current;
    if (!video) return;
    video.volume = val;
    video.muted = val === 0;
    setVolume(val);
    setIsMuted(val === 0);
  };

  const cycleSpeed = () => {
    const nextIdx = (speedIndex + 1) % SPEED_OPTIONS.length;
    setSpeedIndex(nextIdx);
    if (videoRef.current) {
      videoRef.current.playbackRate = SPEED_OPTIONS[nextIdx];
    }
  };

  const toggleFullscreen = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }, []);

  const seekFromClientX = useCallback(
    (clientX: number) => {
      const bar = progressRef.current;
      const video = videoRef.current;
      if (!bar || !video || !duration) return;
      const rect = bar.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const newTime = pct * duration;
      video.currentTime = newTime;
      setCurrentTime(newTime);
      setHasEnded(false);
    },
    [duration]
  );

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => seekFromClientX(e.clientX);
    const onUp = () => setIsDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [isDragging, seekFromClientX]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;
    if (e.key === " " || e.key.toLowerCase() === "k") {
      e.preventDefault();
      togglePlay();
    } else if (e.key.toLowerCase() === "m") {
      e.preventDefault();
      toggleMute();
    } else if (e.key.toLowerCase() === "f") {
      e.preventDefault();
      toggleFullscreen();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      video.currentTime = Math.min(duration, video.currentTime + 5);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      video.currentTime = Math.max(0, video.currentTime - 5);
    }
  };

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;
  const bufferedPct = duration > 0 ? (buffered / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className="cvp-container"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseMove={scheduleHideControls}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      onTouchStart={scheduleHideControls}
      aria-label={title || "Project demo video player"}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        preload="metadata"
        className="cvp-video"
        onClick={togglePlay}
        onPlay={() => {
          setIsPlaying(true);
          setHasEnded(false);
        }}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setIsPlaying(false);
          setHasEnded(true);
          setShowControls(true);
        }}
        onLoadedMetadata={(e) => {
          setDuration(e.currentTarget.duration || 0);
        }}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          setCurrentTime(v.currentTime);
          if (v.buffered.length > 0) {
            setBuffered(v.buffered.end(v.buffered.length - 1));
          }
        }}
      />

      {/* Top Title Pill */}
      {title && (
        <div className={`cvp-top-bar ${showControls ? "visible" : ""}`}>
          <span className="cvp-title-badge">
            <span className="cvp-live-dot" />
            {title}
          </span>
        </div>
      )}

      {/* Center Play / Replay Overlay */}
      {(!isPlaying || hasEnded) && (
        <button
          type="button"
          className="cvp-center-play"
          onClick={togglePlay}
          aria-label={hasEnded ? "Replay video" : "Play video"}
        >
          {hasEnded ? (
            <RotateCcw size={26} color="#09090b" strokeWidth={2.3} />
          ) : (
            <Play size={26} fill="#09090b" color="#09090b" strokeWidth={2} style={{ marginLeft: "3px" }} />
          )}
        </button>
      )}

      {/* Bottom Controls Overlay */}
      <div className={`cvp-controls-bar ${showControls ? "visible" : ""}`}>
        {/* Seek / Progress Track */}
        <div
          ref={progressRef}
          className="cvp-progress-wrap"
          onMouseDown={(e) => {
            setIsDragging(true);
            seekFromClientX(e.clientX);
          }}
          onMouseMove={(e) => {
            if (!progressRef.current || !duration) return;
            const rect = progressRef.current.getBoundingClientRect();
            const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            setHoverTime({ time: pct * duration, pct: pct * 100 });
          }}
          onMouseLeave={() => setHoverTime(null)}
          role="slider"
          aria-label="Video progress"
          aria-valuemin={0}
          aria-valuemax={Math.round(duration)}
          aria-valuenow={Math.round(currentTime)}
        >
          {hoverTime && (
            <div className="cvp-hover-time" style={{ left: `${hoverTime.pct}%` }}>
              {formatTime(hoverTime.time)}
            </div>
          )}
          <div className="cvp-progress-track">
            <div className="cvp-progress-buffered" style={{ width: `${bufferedPct}%` }} />
            <div className="cvp-progress-filled" style={{ width: `${progressPct}%` }}>
              <span className="cvp-progress-thumb" />
            </div>
          </div>
        </div>

        {/* Controls Row */}
        <div className="cvp-controls-row">
          <div className="cvp-controls-left">
            <button
              type="button"
              className="cvp-icon-btn"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>

            <div className="cvp-volume-group">
              <button
                type="button"
                className="cvp-icon-btn"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="cvp-volume-slider"
                aria-label="Volume"
              />
            </div>

            <span className="cvp-time-display">
              {formatTime(currentTime)} <span style={{ opacity: 0.45 }}>/</span> {formatTime(duration)}
            </span>
          </div>

          <div className="cvp-controls-right">
            <button
              type="button"
              className="cvp-speed-btn"
              onClick={cycleSpeed}
              aria-label="Playback speed"
            >
              {SPEED_OPTIONS[speedIndex]}x
            </button>

            <button
              type="button"
              className="cvp-icon-btn"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
