import { useEffect, useState } from "react";
import {
  getBundledExerciseMedia,
  resolveExerciseMedia,
  type ExerciseMedia,
} from "@/data/exercise-media";

/**
 * Resolves ExerciseDB media for an exercise name. The bundled match is
 * returned synchronously, otherwise the ExerciseDB API is queried by name.
 */
export function useExerciseMedia(name: string | undefined) {
  const [media, setMedia] = useState<ExerciseMedia | undefined>(() =>
    name ? getBundledExerciseMedia(name) : undefined,
  );

  useEffect(() => {
    if (!name) {
      setMedia(undefined);
      return;
    }

    const bundled = getBundledExerciseMedia(name);
    if (bundled) {
      setMedia(bundled);
      return;
    }

    let active = true;
    resolveExerciseMedia(name).then((result) => {
      if (active) {
        setMedia(result);
      }
    });

    return () => {
      active = false;
    };
  }, [name]);

  return media;
}
