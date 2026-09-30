/**
 * Exercise media registry, keyed by exercise slug — the same key the router and
 * the Exercise Details page use, so a card, its route and its media can never
 * drift apart.
 *
 * Media lives in `public/exercises`:
 *  - `video` entries loop a 1280x720 demonstration clip on the details page and
 *    use a poster frame on the card.
 *  - `photo` entries use a 1400px wide photograph on the details page (never
 *    upscaled — the media area renders at ~976px) and the same image on the card.
 *
 * Sources and licences are recorded per asset so credits stay accurate:
 *  - Wikimedia Commons demonstration clips and photographs (CC BY 3.0,
 *    CC BY 2.0, CC BY-SA 3.0 / 4.0, public domain).
 *  - free-exercise-db photographs (Unlicense / public domain).
 */

export type ExerciseMediaKind = "video" | "photo";

export interface ExerciseMediaRecord {
  kind: ExerciseMediaKind;
  /** Detail page media: looping clip for videos, single frame for photos. */
  src: string;
  /** Card still: poster frame for videos, the photograph for photos. */
  cardSrc: string;
  /** Second photo frame used to build the detail cross-fade loop. */
  loopFrame?: string;
  sourceTitle: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
  author: string;
}

const COMMONS_FILE = "https://commons.wikimedia.org/wiki/File:";

/** Detail media for each exercise, matched by exercise name during curation. */
export const EXERCISE_MEDIA: Record<string, ExerciseMediaRecord> = {
  "bench-press": {
    kind: "video",
    src: "/exercises/bench-press.webm",
    cardSrc: "/exercises/bench-press-poster.jpg",
    sourceTitle: "Bench press - exercise demonstration video.webm",
    sourceUrl: `${COMMONS_FILE}Bench_press_-_exercise_demonstration_video.webm`,
    license: "CC BY 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
    author: "FitnessScape",
  },
  "incline-press": {
    kind: "video",
    src: "/exercises/incline-press.webm",
    cardSrc: "/exercises/incline-press-poster.jpg",
    sourceTitle: "Incline press - exercise demonstration video.webm",
    sourceUrl: `${COMMONS_FILE}Incline_press_-_exercise_demonstration_video.webm`,
    license: "CC BY 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
    author: "FitnessScape",
  },
  squat: {
    kind: "video",
    src: "/exercises/squat.webm",
    cardSrc: "/exercises/squat-poster.jpg",
    sourceTitle: "Squat - exercise demonstration video.webm",
    sourceUrl: `${COMMONS_FILE}Squat_-_exercise_demonstration_video.webm`,
    license: "CC BY 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
    author: "FitnessScape",
  },
  deadlift: {
    kind: "video",
    src: "/exercises/deadlift.webm",
    cardSrc: "/exercises/deadlift-poster.jpg",
    sourceTitle: "Deadlift - exercise demonstration video.webm",
    sourceUrl: `${COMMONS_FILE}Deadlift_-_exercise_demonstration_video.webm`,
    license: "CC BY 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
    author: "FitnessScape",
  },
  "shoulder-press": {
    kind: "video",
    src: "/exercises/shoulder-press.webm",
    cardSrc: "/exercises/shoulder-press-poster.jpg",
    sourceTitle: "Shoulder press - exercise demonstration video.webm",
    sourceUrl: `${COMMONS_FILE}Shoulder_press_-_exercise_demonstration_video.webm`,
    license: "CC BY 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
    author: "FitnessScape",
  },
  "pull-ups": {
    kind: "video",
    src: "/exercises/pull-ups.webm",
    cardSrc: "/exercises/pull-ups-poster.jpg",
    sourceTitle: "Pull-ups - exercise demonstration video.webm",
    sourceUrl: `${COMMONS_FILE}Pull-ups_-_exercise_demonstration_video.webm`,
    license: "CC BY 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
    author: "FitnessScape",
  },
  "bent-over-row": {
    kind: "video",
    src: "/exercises/bent-over-row.webm",
    cardSrc: "/exercises/bent-over-row-poster.jpg",
    sourceTitle: "Bent-over row - exercise demonstration video.webm",
    sourceUrl: `${COMMONS_FILE}Bent-over_row_-_exercise_demonstration_video.webm`,
    license: "CC BY 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
    author: "FitnessScape",
  },
  "hanging-crunches": {
    kind: "video",
    src: "/exercises/hanging-crunches.webm",
    cardSrc: "/exercises/hanging-crunches-poster.jpg",
    sourceTitle: "Hanging crunches - exercise demonstration video.webm",
    sourceUrl: `${COMMONS_FILE}Hanging_crunches_-_exercise_demonstration_video.webm`,
    license: "CC BY 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
    author: "FitnessScape",
  },
  "hanging-leg-raise": {
    kind: "video",
    src: "/exercises/hanging-leg-raise.webm",
    cardSrc: "/exercises/hanging-leg-raise-poster.jpg",
    sourceTitle: "Leg raises - exercise demonstration video.webm",
    sourceUrl: `${COMMONS_FILE}Leg_raises_-_exercise_demonstration_video.webm`,
    license: "CC BY 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
    author: "FitnessScape",
  },
  "push-up": {
    kind: "photo",
    src: "/exercises/push-up.jpg",
    cardSrc: "/exercises/push-up.jpg",
    sourceTitle: "Push-up.jpg",
    sourceUrl: `${COMMONS_FILE}Push-up.jpg`,
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    author: "Uzltt123",
  },
  "chest-fly": {
    kind: "photo",
    src: "/exercises/chest-fly.jpg",
    cardSrc: "/exercises/chest-fly.jpg",
    sourceTitle: "Chest Fly Machine 1.jpg",
    sourceUrl: `${COMMONS_FILE}Chest_Fly_Machine_1.jpg`,
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    author: "SAgbley",
  },
  "handstand-push-up": {
    kind: "photo",
    src: "/exercises/handstand-push-up.jpg",
    cardSrc: "/exercises/handstand-push-up.jpg",
    sourceTitle: "Handstand pushup.jpg",
    sourceUrl: `${COMMONS_FILE}Handstand_pushup.jpg`,
    license: "Public domain",
    licenseUrl: `${COMMONS_FILE}Handstand_pushup.jpg`,
    author: "U.S. Air Force photo by Senior Airman Seni)",
  },
  "lat-pulldown": {
    kind: "photo",
    src: "/exercises/lat-pulldown.jpg",
    cardSrc: "/exercises/lat-pulldown.jpg",
    sourceTitle: "Marian-Lats-Pull-Down.jpg",
    sourceUrl: `${COMMONS_FILE}Marian-Lats-Pull-Down.jpg`,
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    author: "Abooyeah",
  },
  "lateral-raise": {
    kind: "photo",
    src: "/exercises/lateral-raise.jpg",
    cardSrc: "/exercises/lateral-raise.jpg",
    sourceTitle: "Girl doing lateral raises with bands.jpg",
    sourceUrl: `${COMMONS_FILE}Girl_doing_lateral_raises_with_bands.jpg`,
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    author: "Tyler Read",
  },
  "ez-bar-military-press": {
    kind: "photo",
    src: "/exercises/ez-bar-military-press.jpg",
    cardSrc: "/exercises/ez-bar-military-press.jpg",
    sourceTitle: "Military press ez-bar 25022008.jpg",
    sourceUrl: `${COMMONS_FILE}Military_press_ez-bar_25022008.jpg`,
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    author: "Richardkiwi",
  },
  "biceps-curl": {
    kind: "photo",
    src: "/exercises/biceps-curl.jpg",
    cardSrc: "/exercises/biceps-curl.jpg",
    sourceTitle: "Dumbbell bicep curls.jpg",
    sourceUrl: `${COMMONS_FILE}Dumbbell_bicep_curls.jpg`,
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    author: "PTPioneer",
  },
  "trx-biceps-curl": {
    kind: "photo",
    src: "/exercises/trx-biceps-curl.jpg",
    cardSrc: "/exercises/trx-biceps-curl.jpg",
    sourceTitle: "TRX exercise Bicep curl 3.jpg",
    sourceUrl: `${COMMONS_FILE}TRX_exercise_Bicep_curl_3.jpg`,
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    author: "PTPioneer",
  },
  "triceps-dip": {
    kind: "photo",
    src: "/exercises/triceps-dip.jpg",
    cardSrc: "/exercises/triceps-dip.jpg",
    sourceTitle: "Girl doing dips Exercise.jpg",
    sourceUrl: `${COMMONS_FILE}Girl_doing_dips_Exercise.jpg`,
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    author: "PTPioneer",
  },
  "triceps-pushdown": {
    kind: "photo",
    src: "/exercises/triceps-pushdown-0.jpg",
    cardSrc: "/exercises/triceps-pushdown-0.jpg",
    loopFrame: "/exercises/triceps-pushdown-1.jpg",
    sourceTitle: "Triceps Pushdown (free-exercise-db)",
    sourceUrl:
      "https://github.com/yuhonas/free-exercise-db/blob/main/exercises/Triceps_Pushdown/0.jpg",
    license: "Unlicense (public domain)",
    licenseUrl: "https://unlicense.org/",
    author: "free-exercise-db contributors",
  },
  "barbell-back-squat": {
    kind: "photo",
    src: "/exercises/barbell-back-squat.jpg",
    cardSrc: "/exercises/barbell-back-squat.jpg",
    sourceTitle:
      "Woman doing squat workout in gym with barbell, back view.jpg",
    sourceUrl: `${COMMONS_FILE}Woman_doing_squat_workout_in_gym_with_barbell,_back_view.jpg`,
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    author: "Nenad Stojkovic",
  },
  "kettlebell-front-squat": {
    kind: "photo",
    src: "/exercises/kettlebell-front-squat.jpg",
    cardSrc: "/exercises/kettlebell-front-squat.jpg",
    sourceTitle: "Kettlebell Front Squat 1.jpg",
    sourceUrl: `${COMMONS_FILE}Kettlebell_Front_Squat_1.jpg`,
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    author: "Taco fleur",
  },
  "leg-press": {
    kind: "photo",
    src: "/exercises/leg-press.jpg",
    cardSrc: "/exercises/leg-press.jpg",
    sourceTitle: "Leg Press 1.jpg",
    sourceUrl: `${COMMONS_FILE}Leg_Press_1.jpg`,
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    author: "SAgbley",
  },
  "leg-extension": {
    kind: "photo",
    src: "/exercises/leg-extension.jpg",
    cardSrc: "/exercises/leg-extension.jpg",
    sourceTitle: "LegExx Regular Leg Extension2.jpg",
    sourceUrl: `${COMMONS_FILE}LegExx_Regular_Leg_Extension2.jpg`,
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    author: "OriginalFlywheel",
  },
  "walking-lunge": {
    kind: "photo",
    src: "/exercises/walking-lunge.jpg",
    cardSrc: "/exercises/walking-lunge.jpg",
    sourceTitle: "Dumbbell lunges.jpg",
    sourceUrl: `${COMMONS_FILE}Dumbbell_lunges.jpg`,
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    author: "Tyler Read",
  },
  plank: {
    kind: "photo",
    src: "/exercises/plank.jpg",
    cardSrc: "/exercises/plank.jpg",
    sourceTitle: "Plank.jpg",
    sourceUrl: `${COMMONS_FILE}Plank.jpg`,
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    author: "Jaykayfit",
  },
  burpee: {
    kind: "photo",
    src: "/exercises/burpee.jpg",
    cardSrc: "/exercises/burpee.jpg",
    sourceTitle: "Airborne Burpee.jpg",
    sourceUrl: `${COMMONS_FILE}Airborne_Burpee.jpg`,
    license: "Public domain",
    licenseUrl: `${COMMONS_FILE}Airborne_Burpee.jpg`,
    author: "U.S. Marine Corps photo by Sgt. R. L. Petersen",
  },
  "jumping-jack": {
    kind: "photo",
    src: "/exercises/jumping-jack.jpg",
    cardSrc: "/exercises/jumping-jack.jpg",
    sourceTitle:
      "US Navy 060114-N-9866B-017 Marines perform jumping jacks on the flight deck of the USS Peleliu (LHA 5).jpg",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:US_Navy_060114-N-9866B-017_Marines_assigned_to_the_11th_Marine_Expeditionary_Unit_(MEU)_perform_jumping_jacks_on_the_flight_deck_of_the_amphibious_assault_ship_USS_Peleliu_(LHA_5).jpg",
    license: "Public domain",
    licenseUrl:
      "https://commons.wikimedia.org/wiki/File:US_Navy_060114-N-9866B-017_Marines_assigned_to_the_11th_Marine_Expeditionary_Unit_(MEU)_perform_jumping_jacks_on_the_flight_deck_of_the_amphibious_assault_ship_USS_Peleliu_(LHA_5).jpg",
    author: "U.S. Navy photo",
  },
  "rowing-machine": {
    kind: "photo",
    src: "/exercises/rowing-machine.jpg",
    cardSrc: "/exercises/rowing-machine.jpg",
    sourceTitle: "Rowing Machine.jpg",
    sourceUrl: `${COMMONS_FILE}Rowing_Machine.jpg`,
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    author: "Tiia Monto",
  },
};

const EXERCISE_DB_MEDIA = "https://static.exercisedb.dev/media";

/**
 * ExerciseDB demonstration GIFs used on the exercise cards, where a matching
 * clip exists. Cards fall back to the detail media still when it does not.
 */
export const EXERCISE_CARD_GIFS: Record<string, string> = {
  "bench-press": `${EXERCISE_DB_MEDIA}/EIeI8Vf.gif`,
  squat: `${EXERCISE_DB_MEDIA}/Gnfo4FM.gif`,
  deadlift: `${EXERCISE_DB_MEDIA}/ila4NZS.gif`,
  "lat-pulldown": `${EXERCISE_DB_MEDIA}/LEprlgG.gif`,
  "shoulder-press": `${EXERCISE_DB_MEDIA}/q7qkONO.gif`,
  "biceps-curl": `${EXERCISE_DB_MEDIA}/NbVPDMW.gif`,
  "triceps-pushdown": `${EXERCISE_DB_MEDIA}/dU605di.gif`,
  "leg-press": `${EXERCISE_DB_MEDIA}/2Qh2J1e.gif`,
};

export function getExerciseMedia(slug: string | undefined) {
  return slug ? EXERCISE_MEDIA[slug] : undefined;
}

export function getExerciseCardMedia(slug: string) {
  return EXERCISE_CARD_GIFS[slug] ?? EXERCISE_MEDIA[slug]?.cardSrc;
}
