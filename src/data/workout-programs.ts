/**
 * Workout programs, keyed by program slug — the same key the
 * `/workout-programs/:programSlug` route uses, so a card, its route and its
 * contents can never drift apart.
 *
 * Every entry in `exercises` references an existing exercise by its slug from
 * `src/data/exercises.ts`. No program defines its own exercise: the name,
 * instructions and media always come from the shared exercise library, so a
 * program can never drift from it or duplicate an exercise record.
 */

export type WorkoutProgramLevel =
  | "Beginner"
  | "Beginner / Intermediate"
  | "Intermediate"
  | "Advanced";

export interface WorkoutProgramExercise {
  /** Slug in `EXERCISES`. Resolved against the library before it is rendered. */
  exerciseSlug: string;
  sets: string;
  reps: string;
  /** Rest in seconds, after the working sets. */
  rest: number;
  /** One short coaching cue for this slot in the program. */
  notes: string;
}

export interface WorkoutProgram {
  slug: string;
  name: string;
  description: string;
  level: WorkoutProgramLevel;
  goal: string;
  /** Session length, e.g. "60 min". */
  duration: string;
  /** How often the program runs, e.g. "3 days/week". */
  frequency: string;
  /** Muscle groups the program develops. */
  focus: string[];
  /** Exercise whose own image is used as the program's card still. */
  heroExerciseSlug: string;
  /** Warm-up performed before the working sets. */
  warmUp: string;
  /** The one cue that matters most for this program. */
  focusPoint: string;
  exercises: WorkoutProgramExercise[];
}

export const WORKOUT_PROGRAMS: WorkoutProgram[] = [
  {
    slug: "push-chest-shoulders-triceps",
    name: "Push / Chest + Shoulders + Triceps",
    description:
      "A complete push day built around heavy horizontal and vertical pressing, then finished with shoulder isolation and straight-arm triceps volume. Enough rest to keep the compounds heavy and the isolation work strict.",
    level: "Intermediate",
    goal: "Muscle Building",
    duration: "60 min",
    frequency: "1 day",
    focus: ["Chest", "Shoulders", "Triceps"],
    heroExerciseSlug: "bench-press",
    warmUp:
      "8 minutes — band pull-aparts, empty-bar press, two light sets of incline press.",
    focusPoint:
      "Add weight only when the last rep stays controlled at the same tempo.",
    exercises: [
      {
        exerciseSlug: "bench-press",
        sets: "4",
        reps: "6–8",
        rest: 120,
        notes: "Pause for a beat at the bottom, then press the bar up.",
      },
      {
        exerciseSlug: "incline-press",
        sets: "3",
        reps: "8–10",
        rest: 90,
        notes: "Keep the incline low so the chest stays the limiting muscle.",
      },
      {
        exerciseSlug: "shoulder-press",
        sets: "3",
        reps: "8–10",
        rest: 90,
        notes: "Ribs down — no lower-back flare to finish the set.",
      },
      {
        exerciseSlug: "lateral-raise",
        sets: "3",
        reps: "12–15",
        rest: 60,
        notes: "Light band tension, lead with the elbows, stop at shoulder height.",
      },
      {
        exerciseSlug: "triceps-pushdown",
        sets: "3",
        reps: "12–15",
        rest: 60,
        notes: "Pin the upper arms to the ribs and move only at the elbow.",
      },
    ],
  },
  {
    slug: "pull-back-biceps",
    name: "Pull / Back + Biceps",
    description:
      "A back-first session that earns its curls. Vertical and horizontal pulling build the lats and upper back, then the arms get a direct set once the back is already warm.",
    level: "Intermediate",
    goal: "Muscle Building",
    duration: "60 min",
    frequency: "1 day",
    focus: ["Back", "Biceps"],
    heroExerciseSlug: "pull-ups",
    warmUp:
      "8 minutes — scapular pull-ups, straight-arm pulldowns, light band work.",
    focusPoint:
      "Every pulling rep starts by moving the shoulder blades, not the elbows.",
    exercises: [
      {
        exerciseSlug: "pull-ups",
        sets: "4",
        reps: "6–8",
        rest: 150,
        notes: "Full hang at the bottom. No kipping to reach the top.",
      },
      {
        exerciseSlug: "lat-pulldown",
        sets: "3",
        reps: "10–12",
        rest: 90,
        notes: "Pull to the upper chest with the elbows driving to the ribs.",
      },
      {
        exerciseSlug: "bent-over-row",
        sets: "3",
        reps: "10–12",
        rest: 90,
        notes: "Hold a flat back and pull toward the lower ribs, not the chest.",
      },
      {
        exerciseSlug: "biceps-curl",
        sets: "3",
        reps: "10–12",
        rest: 60,
        notes: "Three-second lowering phase with the elbows pinned to the ribs.",
      },
      {
        exerciseSlug: "trx-biceps-curl",
        sets: "2",
        reps: "12–15",
        rest: 60,
        notes: "Step closer to the anchor if the body starts leaning back.",
      },
    ],
  },
  {
    slug: "legs-quads-hamstrings-glutes",
    name: "Legs / Quads + Hamstrings + Glutes",
    description:
      "The heaviest session in the ELBODY lineup. Big compounds first while the legs are fresh, then machine and unilateral work to hit the quads, hamstrings and glutes from every angle.",
    level: "Intermediate",
    goal: "Strength & Muscle",
    duration: "70 min",
    frequency: "1 day",
    focus: ["Quads", "Hamstrings", "Glutes"],
    heroExerciseSlug: "barbell-back-squat",
    warmUp:
      "10 minutes — bodyweight squats, leg swings, two light barbell squat sets.",
    focusPoint:
      "Brace before every heavy rep and keep the knees tracking over the toes.",
    exercises: [
      {
        exerciseSlug: "barbell-back-squat",
        sets: "4",
        reps: "5",
        rest: 180,
        notes: "Descend below parallel with the hips level throughout.",
      },
      {
        exerciseSlug: "deadlift",
        sets: "3",
        reps: "5",
        rest: 180,
        notes: "Keep the bar against the legs for the entire rep.",
      },
      {
        exerciseSlug: "leg-press",
        sets: "3",
        reps: "10–12",
        rest: 120,
        notes: "Feet mid-platform. Do not lock the knees at the top.",
      },
      {
        exerciseSlug: "walking-lunge",
        sets: "3",
        reps: "12 each leg",
        rest: 90,
        notes: "Long steps so the hips drop straight down, not backward.",
      },
      {
        exerciseSlug: "leg-extension",
        sets: "3",
        reps: "12–15",
        rest: 60,
        notes: "Lower slowly to keep tension on the quads the whole way down.",
      },
    ],
  },
  {
    slug: "full-body-beginner",
    name: "Full Body Beginner",
    description:
      "The starting point for anyone new to structured training. Five foundational movements, three rounds, simple two-count technique and a pace you can repeat for months without burnout.",
    level: "Beginner",
    goal: "Build Foundation",
    duration: "45 min",
    frequency: "3 days/week",
    focus: ["Full Body"],
    heroExerciseSlug: "squat",
    warmUp:
      "6 minutes — marching, hip hinges, arm circles, two light sets of the first movement.",
    focusPoint:
      "Learn the positions first. Leave two clean reps in reserve every round.",
    exercises: [
      {
        exerciseSlug: "squat",
        sets: "3",
        reps: "12",
        rest: 90,
        notes: "Sit back into the hips and keep the knees tracking over the toes.",
      },
      {
        exerciseSlug: "bench-press",
        sets: "3",
        reps: "10",
        rest: 90,
        notes: "Shoulder blades set on the bench before the bar leaves the rack.",
      },
      {
        exerciseSlug: "bent-over-row",
        sets: "3",
        reps: "10",
        rest: 90,
        notes: "Hinge with a flat back and pull toward the hips.",
      },
      {
        exerciseSlug: "shoulder-press",
        sets: "2",
        reps: "10",
        rest: 75,
        notes: "Seat the hips back so the lower back can support the press.",
      },
      {
        exerciseSlug: "hanging-leg-raise",
        sets: "3",
        reps: "8–12",
        rest: 60,
        notes: "Curl the hips up — bend the knees if the full range is hard.",
      },
    ],
  },
  {
    slug: "upper-body",
    name: "Upper Body",
    description:
      "Push and pull in the same session for the days a full leg session does not fit. Balanced volume across chest, back, shoulders and arms with a strict 60-minute cap.",
    level: "Intermediate",
    goal: "Muscle Building",
    duration: "60 min",
    frequency: "2 days/week",
    focus: ["Chest", "Back", "Shoulders", "Arms"],
    heroExerciseSlug: "incline-press",
    warmUp:
      "8 minutes — band pull-aparts, empty-bar press, light rowing.",
    focusPoint:
      "Alternate push and pull so no pattern gets ahead of the other.",
    exercises: [
      {
        exerciseSlug: "bench-press",
        sets: "4",
        reps: "6–8",
        rest: 120,
        notes: "Pause at the bottom and keep the wrists stacked over the elbows.",
      },
      {
        exerciseSlug: "pull-ups",
        sets: "4",
        reps: "6–8",
        rest: 120,
        notes: "Lower to a full hang before the next repetition.",
      },
      {
        exerciseSlug: "incline-press",
        sets: "3",
        reps: "8–10",
        rest: 90,
        notes: "Low incline, press up and slightly inward.",
      },
      {
        exerciseSlug: "shoulder-press",
        sets: "3",
        reps: "8–10",
        rest: 90,
        notes: "Ribs stacked over the pelvis the entire set.",
      },
      {
        exerciseSlug: "biceps-curl",
        sets: "3",
        reps: "10–12",
        rest: 60,
        notes: "Elbows beside the torso, control the way down.",
      },
      {
        exerciseSlug: "triceps-pushdown",
        sets: "3",
        reps: "12–15",
        rest: 60,
        notes: "Full extension at the bottom with the upper arms pinned.",
      },
    ],
  },
  {
    slug: "fat-loss-conditioning",
    name: "Fat Loss & Conditioning",
    description:
      "Short, dense intervals that raise the heart rate without wrecking tomorrow's training. Mixed cardio and core work keeps the session under 40 minutes and easy to repeat four days a week.",
    level: "Beginner / Intermediate",
    goal: "Fat Loss & Conditioning",
    duration: "40 min",
    frequency: "3–4 days/week",
    focus: ["Full Body", "Cardio", "Core"],
    heroExerciseSlug: "rowing-machine",
    warmUp:
      "5 minutes — easy march, arm swings, two light rowing minutes.",
    focusPoint:
      "Pace is the skill. Hold a repeatable effort and finish each interval strong.",
    exercises: [
      {
        exerciseSlug: "rowing-machine",
        sets: "1",
        reps: "5 min",
        rest: 60,
        notes: "Hold a steady stroke rate around 18–20 strokes per minute.",
      },
      {
        exerciseSlug: "jumping-jack",
        sets: "1",
        reps: "45 s",
        rest: 30,
        notes: "Land softly and keep the full overhead reach on every rep.",
      },
      {
        exerciseSlug: "burpee",
        sets: "3",
        reps: "10",
        rest: 60,
        notes: "Step the feet out until the pace is smooth, then add the jump.",
      },
      {
        exerciseSlug: "walking-lunge",
        sets: "3",
        reps: "20 total",
        rest: 45,
        notes: "Quiet landings with the trunk braced the whole way.",
      },
      {
        exerciseSlug: "plank",
        sets: "3",
        reps: "45 s",
        rest: 45,
        notes: "Squeeze the glutes and keep the hips level with the shoulders.",
      },
      {
        exerciseSlug: "hanging-crunches",
        sets: "3",
        reps: "12",
        rest: 45,
        notes: "Curl the pelvis upward — that is what makes it a crunch.",
      },
    ],
  },
];

export function getWorkoutProgramBySlug(slug: string | undefined) {
  return slug ? WORKOUT_PROGRAMS.find((program) => program.slug === slug) : undefined;
}

/** "150" -> "2:30", used for the rest column. */
export function formatRest(seconds: number) {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return rest ? `${minutes}:${String(rest).padStart(2, "0")}` : `${minutes}:00`;
}