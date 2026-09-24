export type MuscleGroup = "All" | "Chest" | "Back" | "Shoulders" | "Arms" | "Legs";

export interface Exercise {
  slug: string;
  name: string;
  muscle: string;
  groups: Exclude<MuscleGroup, "All">[];
  equipment: string[];
  howToPerform: string[];
  commonMistakes: string[];
  coachTips: string[];
}

export const MUSCLE_GROUPS: MuscleGroup[] = [
  "All",
  "Chest",
  "Back",
  "Shoulders",
  "Arms",
  "Legs",
];

export const EXERCISES: Exercise[] = [
  {
    slug: "bench-press",
    name: "Bench Press",
    muscle: "Chest",
    groups: ["Chest"],
    equipment: ["Flat bench", "Barbell and weight plates"],
    howToPerform: [
      "Lie flat with your eyes beneath the bar and your feet planted firmly on the floor.",
      "Set your shoulder blades against the bench and grasp the bar just outside shoulder width.",
      "Unrack the bar, hold it above the chest, and lower it under control toward the mid-chest.",
      "Keep the wrists stacked over the elbows, then press the bar upward until the elbows are extended.",
    ],
    commonMistakes: [
      "Letting the shoulders roll forward during the setup or bottom position.",
      "Bouncing the bar off the lower chest.",
      "Flaring the elbows excessively or losing shoulder-blade support.",
    ],
    coachTips: [
      "Keep the upper back tight throughout the set.",
      "Use a controlled tempo rather than chasing weight.",
      "Stop the descent around the mid-chest for a consistent range of motion.",
    ],
  },
  {
    slug: "squat",
    name: "Squat",
    muscle: "Legs",
    groups: ["Legs"],
    equipment: ["Squat rack", "Barbell and weight plates"],
    howToPerform: [
      "Set the bar across your upper back and brace your core before unracking it.",
      "Place the feet at a comfortable stance with the toes turned slightly outward.",
      "Bend the knees and hips together until the thighs reach at least parallel.",
      "Drive through the whole foot to stand and keep the hips level.",
    ],
    commonMistakes: [
      "Letting the knees collapse inward.",
      "Rising onto the toes or losing the hip crease at the bottom.",
      "Arching the lower back instead of keeping the torso braced.",
    ],
    coachTips: [
      "Create the tripod foot position before every rep.",
      "Spread the floor with the hips and knees moving together.",
      "Use a depth and stance you can control with consistent form.",
    ],
  },
  {
    slug: "deadlift",
    name: "Deadlift",
    muscle: "Back / Legs",
    groups: ["Back", "Legs"],
    equipment: ["Barbell and weight plates"],
    howToPerform: [
      "Stand with the bar over the middle of the foot and position the shins close to it.",
      "Hinge at the hips, bend the knees, and hold the bar with straight arms.",
      "Brace the trunk, pull the bar against the legs, and stand without extending the lower back.",
      "Lock out at the top, then push the hips back and lower the bar under control.",
    ],
    commonMistakes: [
      "Starting with the hips too high and turning the lift into a back-dominant pull.",
      "Moving the bar away from the legs during the pull.",
      "Dropping the bar before the hips and shoulders return to their starting position.",
    ],
    coachTips: [
      "Think of the bar as a resistance that must stay close.",
      "Keep the lats engaged before initiating the pull from the floor.",
      "Finish every rep with the same hip and shoulder position.",
    ],
  },
  {
    slug: "lat-pulldown",
    name: "Lat Pulldown",
    muscle: "Back",
    groups: ["Back"],
    equipment: ["Lat pulldown machine", "Cable attachment"],
    howToPerform: [
      "Adjust the thigh pad and take a secure grip just outside shoulder width.",
      "Lean back slightly while keeping the chest tall and shoulders down.",
      "Drive the elbows toward the ribs until the bar reaches the upper chest.",
      "Allow the shoulders and elbows to rise fully under control before repeating.",
    ],
    commonMistakes: [
      "Pulling the attachment behind the neck.",
      "Leaning far back to turn the exercise into a front raise.",
      "Using momentum instead of pulling with the elbows.",
    ],
    coachTips: [
      "Initiate each rep by moving the shoulders down first.",
      "Keep the ribs stacked over the pelvis.",
      "Use a controlled return to preserve tension through the full range.",
    ],
  },
  {
    slug: "shoulder-press",
    name: "Shoulder Press",
    muscle: "Shoulders",
    groups: ["Shoulders"],
    equipment: ["Dumbbells or barbell", "Flat or slightly inclined bench"],
    howToPerform: [
      "Support the upper back on the bench and hold the weights at shoulder height.",
      "Brace the ribs down and keep the forearms vertical.",
      "Press upward until the arms are extended without losing torso support.",
      "Lower the weights under control to the starting position.",
    ],
    commonMistakes: [
      "Flaring the lower back away from the bench.",
      "Pressing the weights too far behind the head.",
      "Letting the wrists collapse behind the elbows at lockout.",
    ],
    coachTips: [
      "Keep the ribs down throughout the set.",
      "Press up and slightly inward without forcing the shoulder joint.",
      "Use a range of motion that keeps the upper back supported.",
    ],
  },
  {
    slug: "biceps-curl",
    name: "Biceps Curl",
    muscle: "Biceps",
    groups: ["Arms"],
    equipment: ["Dumbbells or barbell"],
    howToPerform: [
      "Stand tall with the upper arms supported beside the torso.",
      "Hold the weights with the palms facing forward and the elbows near the ribs.",
      "Bend the elbows to lift the weights toward the shoulders.",
      "Lower the weights slowly until the elbows are fully extended.",
    ],
    commonMistakes: [
      "Swinging the hips or torso to move the weight.",
      "Letting the elbows drift forward away from the ribs.",
      "Using a partial range of motion.",
    ],
    coachTips: [
      "Keep the shoulders still and isolate elbow flexion.",
      "Control the lowering phase for three seconds.",
      "Avoid gripping the handles harder as the biceps fatigue.",
    ],
  },
  {
    slug: "triceps-pushdown",
    name: "Triceps Pushdown",
    muscle: "Triceps",
    groups: ["Arms"],
    equipment: ["Cable machine", "Straight bar or rope attachment"],
    howToPerform: [
      "Set the cable around chest height and take a secure grip.",
      "Step into position with the upper arms pinned beside the torso.",
      "Extend the elbows to press the attachment toward the thighs.",
      "Bend the elbows slowly back toward the starting position.",
    ],
    commonMistakes: [
      "Letting the upper arms travel away from the body.",
      "Leaning forward to move more weight.",
      "Rushing the return with no elbow flexion.",
    ],
    coachTips: [
      "Keep the upper arms fixed and move only at the elbow.",
      "Squeeze the triceps briefly at full extension.",
      "Use a slow return to keep the muscle under tension.",
    ],
  },
  {
    slug: "leg-press",
    name: "Leg Press",
    muscle: "Legs",
    groups: ["Legs"],
    equipment: ["Leg press machine"],
    howToPerform: [
      "Sit fully back against the seat with the feet placed around hip width on the platform.",
      "Release the safety handles and brace the core.",
      "Bend the knees and hips to lower the platform under control.",
      "Press through the feet until the knees extend without locking them hard.",
    ],
    commonMistakes: [
      "Letting the lower back round away from the seat pad.",
      "Placing the feet too low and compressing the hips.",
      "Locking the knees forcefully at the top.",
    ],
    coachTips: [
      "Keep the pelvis and lower back in contact with the pad.",
      "Lower only as far as you can maintain a neutral spine.",
      "Drive evenly through both feet and avoid locking the knees.",
    ],
  },
];

export function getExerciseBySlug(slug: string) {
  return EXERCISES.find((exercise) => exercise.slug === slug);
}
