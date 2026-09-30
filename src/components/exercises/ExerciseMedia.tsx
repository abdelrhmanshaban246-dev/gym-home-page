import { useState, type ReactNode } from "react";
import { Dumbbell } from "lucide-react";
import { useExerciseMedia } from "@/hooks/use-exercise-media";

interface ExerciseMediaProps {
  /** Exercise name used to look up the matching ExerciseDB media. */
  name: string;
  /** Rendered when no matching ExerciseDB media is available. */
  fallback?: ReactNode;
}

/**
 * Exercise media surface: shows the matching ExerciseDB GIF when one is
 * resolved by name, otherwise keeps the ELBODY placeholder.
 */
export function ExerciseMedia({ name, fallback }: ExerciseMediaProps) {
  const media = useExerciseMedia(name);
  const [failed, setFailed] = useState(false);
  const showMedia = Boolean(media) && !failed;

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
          src={media?.gifUrl}
          alt={`${name} demonstration`}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="relative size-full object-contain p-3 sm:p-4"
        />
      ) : (
        (fallback ?? <ExerciseMediaPlaceholder />)
      )}
    </div>
  );
}

function ExerciseMediaPlaceholder() {
  return (
    <div className="relative flex flex-col items-center gap-3 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl border border-primary/25 bg-background/60 text-primary shadow-lg shadow-black/20 backdrop-blur-sm">
        <Dumbbell className="size-6" />
      </span>
      <span className="font-display text-sm uppercase tracking-[0.18em] text-muted-foreground/70">
        Exercise media
      </span>
    </div>
  );
}
