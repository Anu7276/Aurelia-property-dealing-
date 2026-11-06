import React from "react";

interface PictureImageProps {
  src: string; // e.g. "/assets/images/architecture" or "/assets/images/architecture.jpg"
  alt: string;
  className?: string;
  imgClassName?: string;
  loading?: "lazy" | "eager";
  sizes?: string;
  style?: React.CSSProperties;
}

export default function PictureImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  loading = "lazy",
  sizes = "100vw",
  style,
}: PictureImageProps) {
  // Strip any extension if present
  const basePath = src.replace(/\.(webp|jpg|jpeg|png)$/i, "");

  return (
    <picture className={`block overflow-hidden ${className}`} style={style}>
      <source srcSet={`${basePath}.webp`} type="image/webp" sizes={sizes} />
      <img
        src={`${basePath}.jpg`}
        alt={alt}
        loading={loading}
        decoding="async"
        className={`w-full h-full object-cover block will-change-transform ${imgClassName}`}
      />
    </picture>
  );
}

