import { cn } from "@/lib/utils";

/**
 * Responsive YouTube embed for an exercise demonstration.
 *
 * The player fills its parent rather than setting its own size, so the parent
 * keeps full control of the frame. The details media area already declares
 * `aspect-video`, which gives the player the exact 16:9 box YouTube expects on
 * every breakpoint — the iframe needs no fixed width or height, so the embed
 * stays fluid on mobile and desktop without touching the surrounding layout.
 */
export function YouTubeEmbed({
  videoId,
  title,
  className,
}: {
  videoId: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("absolute inset-0", className)}>
      <iframe
        className="size-full border-0"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}