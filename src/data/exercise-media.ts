/**
 * Exercise media registry, keyed by exercise slug — the same key the router and
 * the Exercise Details page use, so a card, its route and its media can never
 * drift apart.
 *
 * Media lives in `public/exercises` and is normalised by
 * `bun run fetch:media` so the whole library shares one look:
 *  - every photo is EXIF-oriented, centre-cropped to 16:9, capped at 1400px
 *    wide (never upscaled) and levelled toward a common luminance so no
 *    exercise is dramatically darker or brighter than the rest;
 *  - `video` entries loop a 1280x720 demonstration clip and use a 16:9 poster
 *    frame on the card;
 *  - `youtube` entries embed the official YouTube demonstration on the details
 *    page and reuse that video's own 16:9 thumbnail as the card still, so the
 *    card grid stays a grid of stills and nothing has to be re-hosted.
 *
 * The only exception is an asset explicitly marked `fit: "contain"`, which is
 * letterboxed rather than cropped or upscaled.
 *
 * Sources and licences are recorded per asset so credits stay accurate:
 *  - Wikimedia Commons demonstration clips and photographs (CC BY 3.0,
 *    CC BY 2.0, CC BY-SA 3.0 / 4.0, public domain).
 *  - free-exercise-db photographs (Unlicense / public domain).
 *  - Mixkit demonstration clips (Mixkit Stock Video Free License), downloaded
 *    from `assetUrl` rather than Commons.
 *  - YouTube demonstrations (kind: "youtube"), credited to the channel.
 */

export type ExerciseMediaKind = "video" | "photo" | "youtube";

export interface ExerciseMediaRecord {
  kind: ExerciseMediaKind;
  /** Detail page media: looping clip for videos, single frame for photos. */
  src: string;
  /** Card still: poster frame for videos, the photograph for photos. */
  cardSrc: string;
  /** Second photo frame used to build the detail cross-fade loop. */
  loopFrame?: string;
  /** Commons source for `loopFrame`, so the second frame stays auditable. */
  loopSourceTitle?: string;
  loopSourceUrl?: string;
  /**
   * Set to "contain" when the source is narrower than the media area, so it is
   * letterboxed inside the existing surface instead of being upscaled.
   */
  fit?: "cover" | "contain";
  /**
   * Direct download URL for the clip, for sources that are not Wikimedia
   * Commons (Mixkit). Commons entries derive their download from `sourceUrl`.
   */
  assetUrl?: string;
  /** Poster frame download URL, paired with `assetUrl`. */
  posterUrl?: string;
  /**
   * YouTube video id for `kind: "youtube"` records. `src` holds the canonical
   * embed URL; this is what the player component actually needs.
   */
  youtubeId?: string;
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
    kind: "video",
    src: "/exercises/push-up.mp4",
    cardSrc: "/exercises/push-up-poster.jpg",
    assetUrl: "https://assets.mixkit.co/videos/731/731-720.mp4",
    posterUrl: "https://assets.mixkit.co/videos/731/731-thumb-720-0.jpg",
    sourceTitle: "Man doing push ups",
    sourceUrl: "https://mixkit.co/free-stock-video/man-doing-push-ups-731/",
    license: "Mixkit Stock Video Free License",
    licenseUrl: "https://mixkit.co/license/",
    author: "Mixkit",
  },
  "chest-fly": {
    kind: "video",
    src: "/exercises/chest-fly.mp4",
    cardSrc: "/exercises/chest-fly-poster.jpg",
    assetUrl:
      "https://assets.mixkit.co/active_storage/video_items/100546/1725385655/100546-video-720.mp4",
    posterUrl:
      "https://assets.mixkit.co/active_storage/video_items/100546/1725385655/100546-video-thumb-720-0.jpg",
    sourceTitle: "Man performing cable fly exercise in gym",
    sourceUrl: "https://mixkit.co/free-stock-video/man-performing-cable-fly-exercise-in-gym-100546/",
    license: "Mixkit Stock Video Free License",
    licenseUrl: "https://mixkit.co/license/",
    author: "Mixkit",
  },
  "handstand-push-up": {
    kind: "youtube",
    src: "https://www.youtube.com/embed/APQhH9LwmuU",
    cardSrc: "/exercises/handstand-push-up.jpg",
    youtubeId: "APQhH9LwmuU",
    sourceTitle: "Kipping Handstand Push-Up by Wodstar",
    sourceUrl: "https://www.youtube.com/watch?v=APQhH9LwmuU",
    license: "YouTube (embedded by permission)",
    licenseUrl: "https://www.youtube.com/watch?v=APQhH9LwmuU",
    author: "Wodstar",
  },
  "lat-pulldown": {
    kind: "youtube",
    src: "https://www.youtube.com/embed/trZQjegcRx0",
    cardSrc: "/exercises/lat-pulldown.jpg",
    youtubeId: "trZQjegcRx0",
    sourceTitle: "How to Do a Lat Pulldown + Common Mistake",
    sourceUrl: "https://www.youtube.com/watch?v=trZQjegcRx0",
    license: "YouTube (embedded by permission)",
    licenseUrl: "https://www.youtube.com/watch?v=trZQjegcRx0",
    author: "Muscle & Motion",
  },
  "lateral-raise": {
    kind: "youtube",
    src: "https://www.youtube.com/embed/pOmbQuGeHf8",
    cardSrc: "/exercises/lateral-raise.jpg",
    youtubeId: "pOmbQuGeHf8",
    sourceTitle: "Standing Dumbbell Lateral Raise",
    sourceUrl: "https://www.youtube.com/watch?v=pOmbQuGeHf8",
    license: "YouTube (embedded by permission)",
    licenseUrl: "https://www.youtube.com/watch?v=pOmbQuGeHf8",
    author: "ChadMollickDotCom",
  },
  "ez-bar-military-press": {
    kind: "youtube",
    src: "https://www.youtube.com/embed/OCv7SAQe_Os",
    cardSrc: "/exercises/ez-bar-military-press.jpg",
    youtubeId: "OCv7SAQe_Os",
    sourceTitle: "EZ Bar Standing Shoulder Press",
    sourceUrl: "https://www.youtube.com/watch?v=OCv7SAQe_Os",
    license: "YouTube (embedded by permission)",
    licenseUrl: "https://www.youtube.com/watch?v=OCv7SAQe_Os",
    author: "Corey Grenz",
  },
  "biceps-curl": {
    kind: "youtube",
    src: "https://www.youtube.com/embed/6DeLZ6cbgWQ",
    cardSrc: "/exercises/biceps-curl.jpg",
    youtubeId: "6DeLZ6cbgWQ",
    sourceTitle: "How to Perform Standing Dumbbell Bicep Curls",
    sourceUrl: "https://www.youtube.com/watch?v=6DeLZ6cbgWQ",
    license: "YouTube (embedded by permission)",
    licenseUrl: "https://www.youtube.com/watch?v=6DeLZ6cbgWQ",
    author: "Chris McCarthy",
  },
  "trx-biceps-curl": {
    kind: "youtube",
    src: "https://www.youtube.com/embed/xG57S0fgXAk",
    cardSrc: "/exercises/trx-biceps-curl.jpg",
    youtubeId: "xG57S0fgXAk",
    sourceTitle: "TRX Bicep Curl",
    sourceUrl: "https://www.youtube.com/watch?v=xG57S0fgXAk",
    license: "YouTube (embedded by permission)",
    licenseUrl: "https://www.youtube.com/watch?v=xG57S0fgXAk",
    author: "Kyle Arsenault",
  },
  "triceps-dip": {
    kind: "youtube",
    src: "https://www.youtube.com/embed/LlH-NDypZa4",
    cardSrc: "/exercises/triceps-dip.jpg",
    youtubeId: "LlH-NDypZa4",
    sourceTitle: "How to do Tricep Dips // Modified",
    sourceUrl: "https://www.youtube.com/watch?v=LlH-NDypZa4",
    license: "YouTube (embedded by permission)",
    licenseUrl: "https://www.youtube.com/watch?v=LlH-NDypZa4",
    author: "Denvyr | Tall Girl Nutritionist",
  },
  "triceps-pushdown": {
    kind: "youtube",
    src: "https://www.youtube.com/embed/9euK-0PL358",
    cardSrc: "/exercises/triceps-pushdown-poster.jpg",
    youtubeId: "9euK-0PL358",
    sourceTitle: "How To Do Triceps Rope Pushdown Correctly | Build Bigger Arms",
    sourceUrl: "https://www.youtube.com/watch?v=9euK-0PL358",
    license: "YouTube (embedded by permission)",
    licenseUrl: "https://www.youtube.com/watch?v=9euK-0PL358",
    author: "Herasna",
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
    kind: "youtube",
    src: "https://www.youtube.com/embed/e7y8jEUbQiQ",
    cardSrc: "/exercises/kettlebell-front-squat.jpg",
    youtubeId: "e7y8jEUbQiQ",
    sourceTitle: "Double kettlebell front rack squats",
    sourceUrl: "https://www.youtube.com/watch?v=e7y8jEUbQiQ",
    license: "YouTube (embedded by permission)",
    licenseUrl: "https://www.youtube.com/watch?v=e7y8jEUbQiQ",
    author: "The Gym Hong Kong",
  },
  "leg-press": {
    kind: "video",
    src: "/exercises/leg-press.mp4",
    cardSrc: "/exercises/leg-press-poster.jpg",
    assetUrl:
      "https://assets.mixkit.co/active_storage/video_items/100520/1725382896/100520-video-720.mp4",
    posterUrl:
      "https://assets.mixkit.co/active_storage/video_items/100520/1725382896/100520-video-thumb-720-0.jpg",
    sourceTitle: "Woman using a leg press machine in the gym",
    sourceUrl: "https://mixkit.co/free-stock-video/woman-using-a-leg-press-machine-in-the-gym-100520/",
    license: "Mixkit Stock Video Free License",
    licenseUrl: "https://mixkit.co/license/",
    author: "Mixkit",
  },
  "leg-extension": {
    kind: "youtube",
    src: "https://www.youtube.com/embed/uM86QE59Tgc",
    cardSrc: "/exercises/leg-extension.jpg",
    youtubeId: "uM86QE59Tgc",
    sourceTitle: "The PERFECT Leg Extension",
    sourceUrl: "https://www.youtube.com/watch?v=uM86QE59Tgc",
    license: "YouTube (embedded by permission)",
    licenseUrl: "https://www.youtube.com/watch?v=uM86QE59Tgc",
    author: "Andrew Kwong (DeltaBolic)",
  },
  "walking-lunge": {
    kind: "youtube",
    src: "https://www.youtube.com/embed/P5W2mvm1aGE",
    cardSrc: "/exercises/walking-lunge.jpg",
    youtubeId: "P5W2mvm1aGE",
    sourceTitle:
      "Walking lunges foot placement for glutes and quads. #glutes #motivation #fitness",
    sourceUrl: "https://www.youtube.com/watch?v=P5W2mvm1aGE",
    license: "YouTube (embedded by permission)",
    licenseUrl: "https://www.youtube.com/watch?v=P5W2mvm1aGE",
    author: "Rauve Suave Booty Building",
  },
  plank: {
    kind: "youtube",
    src: "https://www.youtube.com/embed/ASdvN_XEl_c",
    cardSrc: "/exercises/plank.jpg",
    youtubeId: "ASdvN_XEl_c",
    sourceTitle: "Planks for Beginners | Bowflex®",
    sourceUrl: "https://www.youtube.com/watch?v=ASdvN_XEl_c",
    license: "YouTube (embedded by permission)",
    licenseUrl: "https://www.youtube.com/watch?v=ASdvN_XEl_c",
    author: "BowFlex",
  },
  burpee: {
    kind: "youtube",
    src: "https://www.youtube.com/embed/xQdyIrSSFnE",
    cardSrc: "/exercises/burpee.jpg",
    youtubeId: "xQdyIrSSFnE",
    sourceTitle:
      "How To Do Burpees Correctly by Cult Fit | Burpees For Beginners| Burpees Workout | Cult Fit|Cure Fit",
    sourceUrl: "https://www.youtube.com/watch?v=xQdyIrSSFnE",
    license: "YouTube (embedded by permission)",
    licenseUrl: "https://www.youtube.com/watch?v=xQdyIrSSFnE",
    author: "wearecult",
  },
  "jumping-jack": {
    kind: "youtube",
    src: "https://www.youtube.com/embed/2W4ZNSwoW_4",
    cardSrc: "/exercises/jumping-jack.jpg",
    youtubeId: "2W4ZNSwoW_4",
    sourceTitle: "How to Do: JUMPING JACKS",
    sourceUrl: "https://www.youtube.com/watch?v=2W4ZNSwoW_4",
    license: "YouTube (embedded by permission)",
    licenseUrl: "https://www.youtube.com/watch?v=2W4ZNSwoW_4",
    author: "Leap Fitness",
  },
  "rowing-machine": {
    kind: "video",
    src: "/exercises/rowing-machine.mp4",
    cardSrc: "/exercises/rowing-machine-poster.jpg",
    assetUrl:
      "https://assets.mixkit.co/active_storage/video_items/100550/1725385839/100550-video-720.mp4",
    posterUrl:
      "https://assets.mixkit.co/active_storage/video_items/100550/1725385839/100550-video-thumb-720-0.jpg",
    sourceTitle: "Man exercising on a rowing machine in the gym",
    sourceUrl: "https://mixkit.co/free-stock-video/man-exercising-on-a-rowing-machine-in-the-gym-100550/",
    license: "Mixkit Stock Video Free License",
    licenseUrl: "https://mixkit.co/license/",
    author: "Mixkit",
  },
};

/**
 * Exercises deliberately left without media.
 *
 * Each entry was audited for a reliable, correctly licensed, full-resolution
 * free asset showing that exact movement. None exists at a resolution that can
 * fill the media area without upscaling, so these render the ELBODY
 * placeholder rather than a low-resolution or approximate image.
 */
export const EXERCISES_WITHOUT_MEDIA = new Set<string>([]);

export function getExerciseMedia(slug: string | undefined) {
  return slug ? EXERCISE_MEDIA[slug] : undefined;
}

/**
 * Card media always comes from the same asset as the detail page (a poster
 * frame for videos, the graded 16:9 still for photos), so the grid and the
 * detail view read as one library.
 */
export function getExerciseCardMedia(slug: string) {
  return EXERCISE_MEDIA[slug]?.cardSrc;
}
