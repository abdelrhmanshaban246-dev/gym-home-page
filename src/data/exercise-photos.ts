/**
 * High-resolution exercise photos used on the Exercise Details media area.
 *
 * Frames come from the free-exercise-db dataset (Unlicense / public domain,
 * https://github.com/yuhonas/free-exercise-db). Each entry stores the start and
 * end position frame of the movement, and the files live in `public/exercises`.
 *
 * Keys are normalized exercise names so new exercises only need an entry here
 * (or a lookup) to get media on the details page.
 */

import { normalizeExerciseName } from "@/data/exercise-media";

export interface ExercisePhotoLoop {
  /** Exercise name in the source dataset, for traceability. */
  sourceName: string;
  startFrame: string;
  endFrame: string;
}

export const EXERCISE_PHOTO_LOOPS: Record<string, ExercisePhotoLoop> = {
  "bench press": {
    sourceName: "Barbell Bench Press - Medium Grip",
    startFrame: "/exercises/bench-press-0.jpg",
    endFrame: "/exercises/bench-press-1.jpg",
  },
  squat: {
    sourceName: "Barbell Squat",
    startFrame: "/exercises/squat-0.jpg",
    endFrame: "/exercises/squat-1.jpg",
  },
  deadlift: {
    sourceName: "Barbell Deadlift",
    startFrame: "/exercises/deadlift-0.jpg",
    endFrame: "/exercises/deadlift-1.jpg",
  },
  "lat pulldown": {
    sourceName: "Wide-Grip Lat Pulldown",
    startFrame: "/exercises/lat-pulldown-0.jpg",
    endFrame: "/exercises/lat-pulldown-1.jpg",
  },
  "shoulder press": {
    sourceName: "Dumbbell Shoulder Press",
    startFrame: "/exercises/shoulder-press-0.jpg",
    endFrame: "/exercises/shoulder-press-1.jpg",
  },
  "biceps curl": {
    sourceName: "Dumbbell Bicep Curl",
    startFrame: "/exercises/biceps-curl-0.jpg",
    endFrame: "/exercises/biceps-curl-1.jpg",
  },
  "triceps pushdown": {
    sourceName: "Triceps Pushdown",
    startFrame: "/exercises/triceps-pushdown-0.jpg",
    endFrame: "/exercises/triceps-pushdown-1.jpg",
  },
  "leg press": {
    sourceName: "Leg Press",
    startFrame: "/exercises/leg-press-0.jpg",
    endFrame: "/exercises/leg-press-1.jpg",
  },
};

export function getExercisePhotoLoop(
  exerciseName: string,
): ExercisePhotoLoop | undefined {
  return EXERCISE_PHOTO_LOOPS[normalizeExerciseName(exerciseName)];
}
