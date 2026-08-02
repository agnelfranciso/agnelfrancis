"use client";
import { useState, useEffect } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

export default function MDXImage({ src, alt }: { src: string; alt: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const imgElement = (
    <img
      src={src}
      alt={alt}
      style={{ 
        maxWidth: '100%', 
        maxHeight: '600px',
        width: 'auto',
        height: 'auto', 
        borderRadius: '20px',
        display: 'block',
        margin: '2.5rem 0',
        objectFit: 'contain'
      }}
    />
  );

  if (!mounted) {
    return imgElement;
  }

  return (
    <Zoom>
      {imgElement}
    </Zoom>
  );
}
