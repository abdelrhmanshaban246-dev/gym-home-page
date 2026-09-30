import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { getExercisePhotoLoop } from "@/data/exercise-photos";

const FRAME_DURATION_MS = 1600;

/**
 * Fills its parent media area with a looping demonstration built from the
 * exercise start and end position photos. Renders nothing when the exercise has
 * no photo pair, so callers can fall back to their placeholder.
 */
export function ExercisePhotoLoop({ name }: { name: string }) {
  const photos = getExercisePhotoLoop(name);
  const prefersReducedMotion = useReducedMotion();
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!photos || prefersReducedMotion) {
      return;
    }

    const interval = setInterval(() => {
      setFrame((current) => (current === 0 ? 1 : 0));
    }, FRAME_DURATION_MS);

    return () => clearInterval(interval);
  }, [photos, prefersReducedMotion]);

  if (!photos) {
    return null;
  }

  const frames = [photos.startFrame, photos.endFrame];

  return (
    <div className="absolute inset-0">
      {frames.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={index === 0 ? `${name} demonstration` : ""}
          aria-hidden={index === 1 ? true : undefined}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${
            index === frame ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
