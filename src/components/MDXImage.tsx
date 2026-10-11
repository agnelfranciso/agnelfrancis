"use client";
import { useState, useEffect } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

interface MDXImageProps {
  src: string;
  alt?: string;
  caption?: string;
}

export default function MDXImage({ src, alt, caption }: MDXImageProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const displayCaption = caption || alt;

  const imageCard = (
    <div className="mdx-image-wrapper">
      <img
        src={src}
        alt={alt || "Blog image"}
        className="mdx-image-element"
        loading="lazy"
      />
      <div className="mdx-image-hint" aria-hidden="true">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 3 21 3 21 9" />
          <polyline points="9 21 3 21 3 15" />
          <line x1="21" y1="3" x2="14" y2="10" />
          <line x1="3" y1="21" x2="10" y2="14" />
        </svg>
        <span>Click to enlarge</span>
      </div>
    </div>
  );

  // On mobile screens, use smaller margin (12px) for maximum image enlargement; 32px on desktop
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  return (
    <figure className="mdx-figure">
      {mounted ? (
        <Zoom
          zoomMargin={isMobile ? 12 : 32}
          canSwipeToUnzoom={true}
          wrapElement="div"
          classDialog="mdx-zoom-dialog"
        >
          {imageCard}
        </Zoom>
      ) : (
        imageCard
      )}
      {displayCaption && (
        <figcaption className="mdx-figcaption">
          {displayCaption}
        </figcaption>
      )}
    </figure>
  );
}

