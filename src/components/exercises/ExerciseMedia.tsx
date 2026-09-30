import { useEffect, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { Dumbbell } from "lucide-react";
import {
  getExerciseCardMedia,
  getExerciseMedia,
  type ExerciseMediaRecord,
} from "@/data/exercise-media";

const LOOP_INTERVAL_MS = 1600;

function CardPlaceholder({ label }: { label: string }) {
  return (
    <div className="relative flex flex-col items-center gap-3 px-4 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl border border-primary/25 bg-background/60 text-primary shadow-lg shadow-black/20 backdrop-blur-sm">
        <Dumbbell className="size-6" />
      </span>
      <span className="font-display text-sm uppercase tracking-[0.18em] text-muted-foreground/70">
        {label}
      </span>
    </div>
  );
}

/**
 * Exercise card media. Uses the ExerciseDB GIF where one matches the exercise,
 * otherwise the still from the exercise's own media, otherwise the placeholder.
 */
export function ExerciseCardMedia({
  slug,
  name,
}: {
  slug: string;
  name: string;
}) {
  const src = getExerciseCardMedia(slug);
  const [failed, setFailed] = useState(false);
  const showMedia = Boolean(src) && !failed;
  // ExerciseDB GIFs are square, so they stay padded to keep the full movement
  // visible; landscape stills fill the card instead.
  const fit = src?.endsWith(".gif")
    ? "object-contain p-3 sm:p-4"
    : "object-cover";

  return (
    <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br from-primary/15 via-muted to-card">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        aria-hidden
        className="absolute -right-12 -top-12 size-40 rounded-full bg-primary/10 blur-3xl transition-transform duration-500 group-hover:scale-125"
      />
      {showMedia ? (
        <img
          src={src}
          alt={`${name} demonstration`}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className={`relative size-full ${fit}`}
        />
      ) : (
        <CardPlaceholder label={name} />
      )}
    </div>
  );
}

function LoopingVideo({
  media,
  name,
  onError,
}: {
  media: ExerciseMediaRecord;
  name: string;
  onError: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <img
        src={media.cardSrc}
        alt={`${name} demonstration`}
        decoding="async"
        className="absolute inset-0 size-full object-cover"
      />
    );
  }

  return (
    <video
      src={media.src}
      poster={media.cardSrc}
      aria-label={`${name} demonstration`}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      onError={onError}
      className="absolute inset-0 size-full object-cover"
    />
  );
}

function PhotoLoop({
  media,
  name,
  onError,
}: {
  media: ExerciseMediaRecord;
  name: string;
  onError: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [frame, setFrame] = useState(0);
  const frames = media.loopFrame ? [media.src, media.loopFrame] : [media.src];

  useEffect(() => {
    if (frames.length < 2 || prefersReducedMotion) {
      return;
    }

    const interval = setInterval(() => {
      setFrame((current) => (current + 1) % frames.length);
    }, LOOP_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [frames.length, prefersReducedMotion]);

  const fit = media.fit === "contain" ? "object-contain" : "object-cover";

  return (
    <>
      {frames.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={index === 0 ? `${name} demonstration` : ""}
          aria-hidden={index === 0 ? undefined : true}
          decoding="async"
          onError={onError}
          className={`absolute inset-0 size-full ${fit} transition-opacity duration-500 ${
            index === frame ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </>
  );
}

/**
 * Details page media: the exercise's own 720p demonstration clip, or its
 * high-resolution photograph cross-faded between the start and end position.
 */
export function ExerciseDetailMedia({
  slug,
  name,
  fallback,
}: {
  slug: string;
  name: string;
  fallback: ReactNode;
}) {
  const media = getExerciseMedia(slug);
  const [failed, setFailed] = useState(false);

  if (!media || failed) {
    return <>{fallback}</>;
  }

  return (
    <>
      {media.kind === "video" ? (
        <LoopingVideo
          media={media}
          name={name}
          onError={() => setFailed(true)}
        />
      ) : (
        <PhotoLoop media={media} name={name} onError={() => setFailed(true)} />
      )}
    </>
  );
}
