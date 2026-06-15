import { getPublicUrl } from "../utils/supabase";

export default function OptimizedImage({
  src,
  alt,
  className = "",
  priority = false,
  width,
  height,
  ...props
}) {
  return (
    <img
      src={getPublicUrl(src)}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : undefined}
      {...props}
    />
  );
}
