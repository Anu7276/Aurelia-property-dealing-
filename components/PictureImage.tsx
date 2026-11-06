import React from "react";

interface PictureImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  loading?: "lazy" | "eager";
  sizes?: string;
  style?: React.CSSProperties;
  cinematic?: boolean; // Adds subtle video-like ambient breathing motion
}

export default function PictureImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  loading = "lazy",
  sizes = "100vw",
  style,
  cinematic = true,
}: PictureImageProps) {
  const basePath = src.replace(/\.(webp|jpg|jpeg|png)$/i, "");

  return (
    <picture
      className={`relative block overflow-hidden group/pic ${className}`}
      style={style}
    >
      <source srcSet={`${basePath}.webp`} type="image/webp" sizes={sizes} />
      <img
        src={`${basePath}.jpg`}
        alt={alt}
        loading={loading}
        decoding="async"
        className={`w-full h-full object-cover block will-change-transform brightness-[1.02] contrast-[1.03] transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/pic:scale-[1.05] ${
          cinematic ? "animate-cinematic-drift" : ""
        } ${imgClassName}`}
      />
    </picture>
  );
}
