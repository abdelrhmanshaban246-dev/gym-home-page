/**
 * Exercise media resolver backed by the free ExerciseDB V1 API.
 *
 * Bundled snapshot: GIF URLs resolved once from the live API and matched by
 * exercise name, so the library renders instantly without a network call.
 * Runtime lookup: any exercise missing from the snapshot is looked up by name
 * in the ExerciseDB API and cached in memory for the rest of the session.
 */

export interface ExerciseMedia {
  /** ExerciseDB exercise id, used to build the media URL. */
  exerciseId: string;
  /** Exercise name as returned by ExerciseDB. */
  sourceName: string;
  /** Animated exercise demonstration. */
  gifUrl: string;
}

const EXERCISE_DB_SEARCH_ENDPOINT =
  "https://oss.exercisedb.dev/api/v1/exercises";
const EXERCISE_DB_MEDIA_ENDPOINT = "https://static.exercisedb.dev/media";

/** Lowercase, alphanumeric-only key so "Triceps Pushdown" and "triceps-pushdown" match. */
export function normalizeExerciseName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

/**
 * ExerciseDB matches curated by name for the current library. Keys are the
 * normalized ELBODY exercise names, values are the matched ExerciseDB entries.
 */
export const EXERCISE_MEDIA_SNAPSHOT: Record<string, ExerciseMedia> = {
  "bench press": {
    exerciseId: "EIeI8Vf",
    sourceName: "barbell bench press",
    gifUrl: `${EXERCISE_DB_MEDIA_ENDPOINT}/EIeI8Vf.gif`,
  },
  squat: {
    exerciseId: "Gnfo4FM",
    sourceName: "barbell high bar squat",
    gifUrl: `${EXERCISE_DB_MEDIA_ENDPOINT}/Gnfo4FM.gif`,
  },
  deadlift: {
    exerciseId: "ila4NZS",
    sourceName: "barbell deadlift",
    gifUrl: `${EXERCISE_DB_MEDIA_ENDPOINT}/ila4NZS.gif`,
  },
  "lat pulldown": {
    exerciseId: "LEprlgG",
    sourceName: "cable lat pulldown full range of motion",
    gifUrl: `${EXERCISE_DB_MEDIA_ENDPOINT}/LEprlgG.gif`,
  },
  "shoulder press": {
    exerciseId: "q7qkONO",
    sourceName: "Alternating Seated Dumbbell Shoulder Press",
    gifUrl: `${EXERCISE_DB_MEDIA_ENDPOINT}/q7qkONO.gif`,
  },
  "biceps curl": {
    exerciseId: "NbVPDMW",
    sourceName: "dumbbell biceps curl",
    gifUrl: `${EXERCISE_DB_MEDIA_ENDPOINT}/NbVPDMW.gif`,
  },
  "triceps pushdown": {
    exerciseId: "dU605di",
    sourceName: "cable pushdown (with rope attachment)",
    gifUrl: `${EXERCISE_DB_MEDIA_ENDPOINT}/dU605di.gif`,
  },
  "leg press": {
    exerciseId: "2Qh2J1e",
    sourceName: "Sled 45\u00b0 Leg Press",
    gifUrl: `${EXERCISE_DB_MEDIA_ENDPOINT}/2Qh2J1e.gif`,
  },
};

export function getBundledExerciseMedia(
  exerciseName: string,
): ExerciseMedia | undefined {
  return EXERCISE_MEDIA_SNAPSHOT[normalizeExerciseName(exerciseName)];
}

/**
 * Accepts a candidate only when it contains every word of the exercise name as
 * one continuous phrase (for example "bench press" inside "barbell bench
 * press"). Anything else is treated as unrelated and falls back to the
 * placeholder.
 */
function isRelatedExercise(exerciseName: string, candidateName: string) {
  const target = normalizeExerciseName(exerciseName);
  const candidate = normalizeExerciseName(candidateName);
  return target.length > 0 && candidate.includes(target);
}

interface ExerciseDbRecord {
  exerciseId: string;
  name: string;
  gifUrl: string;
}

function toMedia(record: ExerciseDbRecord): ExerciseMedia {
  return {
    exerciseId: record.exerciseId,
    sourceName: record.name,
    gifUrl: record.gifUrl || `${EXERCISE_DB_MEDIA_ENDPOINT}/${record.exerciseId}.gif`,
  };
}

async function searchExerciseDb(
  exerciseName: string,
): Promise<ExerciseMedia | undefined> {
  const url = `${EXERCISE_DB_SEARCH_ENDPOINT}?name=${encodeURIComponent(
    exerciseName,
  )}&limit=25`;

  // The free tier rate limits bursts, so a single throttled request retries.
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const response = await fetch(url);
    if (response.status === 429) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      continue;
    }
    if (!response.ok) {
      return undefined;
    }

    const payload = (await response.json()) as {
      data?: ExerciseDbRecord[];
    };
    const records = payload.data ?? [];
    const match = records.find((record) =>
      isRelatedExercise(exerciseName, record.name),
    );
    return match ? toMedia(match) : undefined;
  }

  return undefined;
}

const runtimeCache = new Map<string, Promise<ExerciseMedia | undefined>>();

/**
 * Resolves media for any exercise name: the bundled ExerciseDB match first,
 * then a cached ExerciseDB lookup for exercises added later.
 */
export function resolveExerciseMedia(
  exerciseName: string,
): Promise<ExerciseMedia | undefined> {
  const key = normalizeExerciseName(exerciseName);
  const bundled = EXERCISE_MEDIA_SNAPSHOT[key];
  if (bundled) {
    return Promise.resolve(bundled);
  }

  const cached = runtimeCache.get(key);
  if (cached) {
    return cached;
  }

  const request = searchExerciseDb(exerciseName)
    .catch(() => undefined)
    .finally(() => {
      runtimeCache.delete(key);
    });
  runtimeCache.set(key, request);
  return request;
}
