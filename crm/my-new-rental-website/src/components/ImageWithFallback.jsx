import { useState, useEffect } from 'react';
import Image from 'next/image';

const ImageWithFallback = ({ src, alt, fallbackSrc, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Default fallback image
  const defaultFallback = '/images/Property-1.png';

  useEffect(() => {
    setImgSrc(src);
    setLoading(true);
    setError(false);
  }, [src]);

  return (
    <>
      {loading && !error && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
      <Image
        {...props}
        src={imgSrc}
        alt={alt}
        onError={() => {
          console.error('Image failed to load:', src);
          setError(true);
          setLoading(false);
          setImgSrc(fallbackSrc || defaultFallback);
        }}
        onLoadingComplete={() => {
          setLoading(false);
        }}
      />
    </>
  );
};

export default ImageWithFallback;