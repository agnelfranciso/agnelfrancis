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

  return (
    <figure className="mdx-figure">
      <div className="mdx-image-wrapper">
        {mounted ? (
          <Zoom
            zoomMargin={16}
            canSwipeToUnzoom={true}
            wrapElement="div"
          >
            <img
              src={src}
              alt={alt || "Blog image"}
              className="mdx-image-element"
              loading="lazy"
            />
          </Zoom>
        ) : (
          <img
            src={src}
            alt={alt || "Blog image"}
            className="mdx-image-element"
            loading="lazy"
          />
        )}
      </div>
      {displayCaption && (
        <figcaption className="mdx-figcaption">
          {displayCaption}
        </figcaption>
      )}
    </figure>
  );
}


