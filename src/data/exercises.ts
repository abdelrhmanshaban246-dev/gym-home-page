export type MuscleGroup =
  | "All"
  | "Chest"
  | "Back"
  | "Shoulders"
  | "Arms"
  | "Legs"
  | "Abs"
  | "Cardio";

export type ExerciseDifficulty = "Beginner" | "Intermediate" | "Advanced";

export interface Exercise {
  slug: string;
  name: string;
  muscle: string;
  groups: Exclude<MuscleGroup, "All">[];
  difficulty: ExerciseDifficulty;
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
  "Abs",
  "Cardio",
];

export const EXERCISES: Exercise[] = [
  {
    slug: "bench-press",
    name: "Bench Press",
    muscle: "Chest",
    groups: ["Chest"],
    difficulty: "Intermediate",
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
    slug: "incline-press",
    name: "Incline Press",
    muscle: "Chest",
    groups: ["Chest", "Shoulders"],
    difficulty: "Intermediate",
    equipment: ["Incline bench", "Barbell or dumbbells"],
    howToPerform: [
      "Set the bench to a low incline and sit back with the pad supporting the upper back.",
      "Hold the weights at shoulder height with the palms facing forward.",
      "Brace the ribs down and press up and slightly inward.",
      "Lower the weights under control until the elbows pass just behind the torso line.",
    ],
    commonMistakes: [
      "Setting the incline too steep and turning the set into shoulder presses.",
      "Flaring the lower back away from the pad at the bottom.",
      "Pressing the weights behind the head.",
    ],
    coachTips: [
      "Keep the bench angle low enough to keep the chest as the limiting muscle.",
      "Drive the feet into the floor to stop the hips from rising.",
      "Use the same tempo as the flat press so progress stays comparable.",
    ],
  },
  {
    slug: "push-up",
    name: "Push-Up",
    muscle: "Chest",
    groups: ["Chest", "Arms"],
    difficulty: "Beginner",
    equipment: ["Bodyweight"],
    howToPerform: [
      "Set the hands slightly wider than the shoulders and extend the legs behind you.",
      "Brace the glutes and abdomen so the body forms one straight line.",
      "Lower the chest toward the floor with the elbows tracking back at roughly 45 degrees.",
      "Press the floor away and fully extend the elbows without letting the hips sag.",
    ],
    commonMistakes: [
      "Letting the hips sag or pike so the load shifts away from the chest.",
      "Flaring the elbows straight out to the sides.",
      "Dropping the head and neck toward the floor.",
    ],
    coachTips: [
      "Squeeze the glutes before every rep to protect the lower back.",
      "If the last few reps break down, finish the set on the knees instead of sagging.",
      "Add difficulty by slowing the lowering phase rather than adding reps blindly.",
    ],
  },
  {
    slug: "chest-fly",
    name: "Chest Fly",
    muscle: "Chest",
    groups: ["Chest"],
    difficulty: "Beginner",
    equipment: ["Cable machine or pec-deck machine"],
    howToPerform: [
      "Set the handles at upper-chest height and step into a staggered stance.",
      "Keep a soft bend in the elbows and the ribs stacked over the pelvis.",
      "Bring the hands together in a hugging arc until the chest is stretched across the midline.",
      "Open the arms back under control until a stretch is felt in the chest.",
    ],
    commonMistakes: [
      "Bending and straightening the elbows like a press instead of holding the arc.",
      "Using too much weight and losing the stretch at the open position.",
      "Letting the shoulders roll forward at the end of the rep.",
    ],
    coachTips: [
      "Think about hugging something heavy in front of you.",
      "Keep the movement slow and feel the chest do the work.",
      "Stop the closed position where the chest is squeezed, not where the arms cross.",
    ],
  },
  {
    slug: "handstand-push-up",
    name: "Handstand Push-Up",
    muscle: "Shoulders",
    groups: ["Shoulders", "Arms"],
    difficulty: "Advanced",
    equipment: ["Wall", "Bodyweight"],
    howToPerform: [
      "Kick or press up into a handstand with the hands close to a wall for support.",
      "Walk the feet up the wall until the body is inverted and the ribs are tucked.",
      "Bend the elbows to lower the crown of the head toward the floor between the hands.",
      "Press back to the inverted position and hold the line before stepping down.",
    ],
    commonMistakes: [
      "Starting with the ribs flared and the lower back deeply arched.",
      "Lowering only halfway and cutting the range of motion.",
      "Kicking up without first stacking the shoulders over the wrists.",
    ],
    coachTips: [
      "Build toward this with pike push-ups first.",
      "Master the headstand balance and the wall version before freestanding work.",
      "Only add reps once the line is stable from start to finish.",
    ],
  },
  {
    slug: "deadlift",
    name: "Deadlift",
    muscle: "Back / Legs",
    groups: ["Back", "Legs"],
    difficulty: "Advanced",
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
    difficulty: "Beginner",
    equipment: ["Lat pulldown machine", "Wide-grip bar"],
    howToPerform: [
      "Adjust the thigh pad and take a grip just outside shoulder width.",
      "Lean back slightly while keeping the chest tall and shoulders down.",
      "Drive the elbows toward the ribs until the bar reaches the upper chest.",
      "Allow the shoulders and elbows to rise fully under control before repeating.",
    ],
    commonMistakes: [
      "Pulling the bar behind the neck.",
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
    slug: "pull-ups",
    name: "Pull-Ups",
    muscle: "Back",
    groups: ["Back", "Arms"],
    difficulty: "Advanced",
    equipment: ["Pull-up bar", "Bodyweight"],
    howToPerform: [
      "Hang from the bar with an overhand grip slightly wider than the shoulders.",
      "Set the shoulders before starting and keep the legs quiet behind you.",
      "Drive the elbows down toward the ribs until the chin clears the bar.",
      "Lower under control to a full hang before the next repetition.",
    ],
    commonMistakes: [
      "Kipping or swinging to reach the top of the rep.",
      "Letting the shoulders shrug at the bottom of each rep.",
      "Dropping from the top instead of lowering under control.",
    ],
    coachTips: [
      "Build with negatives or band-assisted pull-ups before full reps.",
      "Start each rep by pulling the shoulder blades down.",
      "Keep a consistent grip and tempo so progress is measurable.",
    ],
  },
  {
    slug: "bent-over-row",
    name: "Bent-Over Row",
    muscle: "Back",
    groups: ["Back", "Arms"],
    difficulty: "Intermediate",
    equipment: ["Barbell or dumbbells"],
    howToPerform: [
      "Hinge at the hips until the torso is angled forward with a neutral spine.",
      "Support the torso with the hands on the thighs or a bench and brace the trunk.",
      "Row the weight toward the lower ribs while keeping the elbows close.",
      "Lower the weight fully under control before the next repetition.",
    ],
    commonMistakes: [
      "Rounding the upper back under load.",
      "Rowing with the arms instead of pulling with the torso.",
      "Jerking the weight upward with the hips.",
    ],
    coachTips: [
      "Hold a fixed hip angle for every rep of the set.",
      "Think about driving the elbows past the ribs toward the hips.",
      "Stop the pull when the bar reaches the lower ribs, not the chest.",
    ],
  },
  {
    slug: "shoulder-press",
    name: "Shoulder Press",
    muscle: "Shoulders",
    groups: ["Shoulders", "Arms"],
    difficulty: "Intermediate",
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
    slug: "lateral-raise",
    name: "Lateral Raise",
    muscle: "Shoulders",
    groups: ["Shoulders"],
    difficulty: "Beginner",
    equipment: ["Resistance band"],
    howToPerform: [
      "Stand with the feet hip width apart and hold the band with a slight elbow bend.",
      "Keep the ribs down and the shoulders relaxed throughout the set.",
      "Raise the arms out to the sides until they reach shoulder height.",
      "Lower slowly until the arms are fully back under tension.",
    ],
    commonMistakes: [
      "Swinging the torso to lift the arms.",
      "Raising the arms above shoulder height.",
      "Using a band tension heavy enough to break form.",
    ],
    coachTips: [
      "Lead with the elbows rather than the hands.",
      "Keep the pinkies slightly higher than the thumbs.",
      "Use light resistance and strict reps for shoulder health.",
    ],
  },
  {
    slug: "ez-bar-military-press",
    name: "EZ-Bar Military Press",
    muscle: "Shoulders",
    groups: ["Shoulders", "Arms"],
    difficulty: "Intermediate",
    equipment: ["EZ-bar and weight plates"],
    howToPerform: [
      "Sit upright with the back supported and the bar resting at the collarbone.",
      "Set the grip just outside shoulder width and brace the trunk.",
      "Press the bar overhead until the arms are extended.",
      "Lower the bar back to the collarbone under control.",
    ],
    commonMistakes: [
      "Arching the lower back to get the bar overhead.",
      "Pressing around the head instead of straight up.",
      "Dropping the elbows in front of the wrists at the bottom.",
    ],
    coachTips: [
      "Squeeze the glutes and ribs down before each press.",
      "The EZ-bar angle is easier on the wrists than a straight bar.",
      "Use a spotter or a rack when the load gets heavy.",
    ],
  },
  {
    slug: "biceps-curl",
    name: "Biceps Curl",
    muscle: "Biceps",
    groups: ["Arms"],
    difficulty: "Beginner",
    equipment: ["Dumbbells"],
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
    slug: "trx-biceps-curl",
    name: "TRX Biceps Curl",
    muscle: "Biceps",
    groups: ["Arms"],
    difficulty: "Beginner",
    equipment: ["TRX suspension straps"],
    howToPerform: [
      "Hold the handles with the palms facing forward and step back until the straps are taut.",
      "Keep the feet together and the body in a straight line from head to heels.",
      "Bend the elbows to curl the handles toward the shoulders.",
      "Lower the handles slowly while staying braced in the straps.",
    ],
    commonMistakes: [
      "Leaning back to pull the handles down.",
      "Letting the body sag at the hips between reps.",
      "Rushing the return until the arms are fully straight.",
    ],
    coachTips: [
      "Step closer to the anchor for an easier set.",
      "The body tension is what makes this harder than a standing curl.",
      "Keep the shoulders packed away from the ears throughout.",
    ],
  },
  {
    slug: "triceps-dip",
    name: "Triceps Dip",
    muscle: "Triceps",
    groups: ["Arms", "Chest"],
    difficulty: "Intermediate",
    equipment: ["Dip bars or a sturdy bench"],
    howToPerform: [
      "Support the body between the hands and extend the legs behind you.",
      "Keep the torso upright and the shoulders down away from the ears.",
      "Bend the elbows to lower until the upper arms reach parallel to the floor.",
      "Press back up until the elbows are extended without shrugging.",
    ],
    commonMistakes: [
      "Dropping too deep and stressing the shoulder joint.",
      "Flaring the elbows outward and turning the movement into a chest press.",
      "Letting the shoulders rise toward the ears at the top.",
    ],
    coachTips: [
      "Keep the torso as upright as the shoulder allows.",
      "Use bench dips or knee-supported dips to build toward full bodyweight reps.",
      "Stop the set when the shoulders start to feel the load.",
    ],
  },
  {
    slug: "triceps-pushdown",
    name: "Triceps Pushdown",
    muscle: "Triceps",
    groups: ["Arms"],
    difficulty: "Beginner",
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
    slug: "squat",
    name: "Squat",
    muscle: "Legs",
    groups: ["Legs"],
    difficulty: "Intermediate",
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
    slug: "barbell-back-squat",
    name: "Barbell Back Squat",
    muscle: "Legs",
    groups: ["Legs"],
    difficulty: "Intermediate",
    equipment: ["Barbell and weight plates", "Squat rack"],
    howToPerform: [
      "Walk the bar into position and set the feet at shoulder width or slightly wider.",
      "Take a breath, brace the trunk, and squat down between the heels.",
      "Descend until the hips are below the top of the knees or slightly below parallel.",
      "Drive through the mid-foot to stand and keep the hips level.",
    ],
    commonMistakes: [
      "Knees tracking far inside the toes on the way down.",
      "Hips shooting up first so the bar leans forward over the toes.",
      "Rushing the descent and losing the braced position at the bottom.",
    ],
    coachTips: [
      "Film from the side at a set to check hip and knee depth.",
      "Use the same stance and bar placement every session for comparable progress.",
      "Add weight only when the last rep stays controlled.",
    ],
  },
  {
    slug: "kettlebell-front-squat",
    name: "Kettlebell Front Squat",
    muscle: "Legs / Core",
    groups: ["Legs", "Abs"],
    difficulty: "Intermediate",
    equipment: ["Kettlebell"],
    howToPerform: [
      "Hold the kettlebell in the rack position with the elbows forward.",
      "Stand tall with the feet hip width apart and the ribs down.",
      "Squat down between the heels while keeping the elbows inside the knees.",
      "Drive through the whole foot to stand.",
    ],
    commonMistakes: [
      "Letting the elbows drop so the lower back has to hold the weight.",
      "Losing the upright torso and folding forward.",
      "Rounding the lower back at the bottom of the rep.",
    ],
    coachTips: [
      "Squeeze the glutes to keep the hips from opening at the top.",
      "Use a light weight until the rack position is automatic.",
      "Hold a front-rack position between sets to strengthen the position itself.",
    ],
  },
  {
    slug: "leg-press",
    name: "Leg Press",
    muscle: "Legs",
    groups: ["Legs"],
    difficulty: "Beginner",
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
  {
    slug: "leg-extension",
    name: "Leg Extension",
    muscle: "Quads",
    groups: ["Legs"],
    difficulty: "Beginner",
    equipment: ["Leg extension machine"],
    howToPerform: [
      "Set the knee pad just above the knee and align the pivot with the knee joint.",
      "Position the feet against the pad and hold the handles for balance.",
      "Extend the knees to lift the pad until the legs are straight.",
      "Lower the weight slowly until the knees are bent to about 90 degrees.",
    ],
    commonMistakes: [
      "Swinging the weight through the range instead of lifting it.",
      "Locking the knees hard and loading the joint.",
      "Using too much weight and losing control at the bottom.",
    ],
    coachTips: [
      "Match the lower back against the pad at every rep.",
      "Use a slower return to keep tension on the quads.",
      "Change the foot position to shift the emphasis within the set.",
    ],
  },
  {
    slug: "walking-lunge",
    name: "Walking Lunge",
    muscle: "Legs",
    groups: ["Legs"],
    difficulty: "Intermediate",
    equipment: ["Dumbbells", "Bodyweight"],
    howToPerform: [
      "Stand tall with the dumbbells at the sides and the core braced.",
      "Step forward and lower until the front thigh is near parallel.",
      "Push through the front heel to bring the rear leg through into the next step.",
      "Complete all the steps and return to the starting position.",
    ],
    commonMistakes: [
      "Stepping so short that the back knee slams into the floor.",
      "Letting the front knee collapse inward.",
      "Leaning the torso forward over the front leg.",
    ],
    coachTips: [
      "Take a long enough step that the hips drop straight down.",
      "Keep the steps controlled before adding load or speed.",
      "Stop the set when balance starts to break down.",
    ],
  },
  {
    slug: "hanging-leg-raise",
    name: "Hanging Leg Raise",
    muscle: "Abs",
    groups: ["Abs"],
    difficulty: "Advanced",
    equipment: ["Pull-up bar", "Bodyweight"],
    howToPerform: [
      "Hang from the bar with an overhand grip and pull the shoulders down.",
      "Lift the legs together until the hips flex past ninety degrees.",
      "Pause briefly at the top without swinging.",
      "Lower the legs slowly back toward a full hang.",
    ],
    commonMistakes: [
      "Swinging the legs to create momentum.",
      "Raising the legs only partway while curling the hips is not needed here.",
      "Letting the lower back arch at the bottom of the rep.",
    ],
    coachTips: [
      "Bend the knees first if the straight-leg version is too hard.",
      "Keep the movement slow so the abs, not the momentum, do the work.",
      "Build from hanging knee raises before the full range.",
    ],
  },
  {
    slug: "hanging-crunches",
    name: "Hanging Crunches",
    muscle: "Abs",
    groups: ["Abs"],
    difficulty: "Intermediate",
    equipment: ["Pull-up bar", "Bodyweight"],
    howToPerform: [
      "Hang from the bar with the shoulders active and the legs together.",
      "Curl the pelvis upward, lifting the knees toward the chest.",
      "Keep the movement in the hips rather than swinging the whole body.",
      "Lower slowly back toward the starting hang.",
    ],
    commonMistakes: [
      "Turning the rep into a swinging leg raise.",
      "Pulling on the bar with the arms to lift the torso.",
      "Rushing the descent and losing the abdominal tension.",
    ],
    coachTips: [
      "Tuck the pelvis first — that is what makes it a crunch.",
      "Keep the legs together and the movements controlled.",
      "Use a controlled tempo to keep the set hard without swinging.",
    ],
  },
  {
    slug: "plank",
    name: "Plank",
    muscle: "Core",
    groups: ["Abs"],
    difficulty: "Beginner",
    equipment: ["Bodyweight", "Mat"],
    howToPerform: [
      "Set the elbows under the shoulders and extend the legs behind you.",
      "Brace the abdomen and squeeze the glutes before lifting the hips.",
      "Hold the position with a neutral spine and the head in line with the back.",
      "Lower the hips only after the hold is finished, not before.",
    ],
    commonMistakes: [
      "Letting the hips rise or sag so the body is no longer a straight line.",
      "Looking up at the ceiling and stressing the neck.",
      "Holding tension in the shoulders and upper traps.",
    ],
    coachTips: [
      "Push the floor away with the forearms to spread the upper back.",
      "Shorten the hold and keep the quality rather than chasing long durations.",
      "Plank variations work once the basic position is solid.",
    ],
  },
  {
    slug: "burpee",
    name: "Burpee",
    muscle: "Full body",
    groups: ["Cardio", "Legs", "Chest"],
    difficulty: "Intermediate",
    equipment: ["Bodyweight"],
    howToPerform: [
      "From standing, squat down and place the hands on the floor in front of the feet.",
      "Jump or step the feet back into a plank and brace the core.",
      "Lower the chest to the floor and press back up.",
      "Jump the feet back toward the hands and finish with an overhead jump.",
    ],
    commonMistakes: [
      "Letting the hips sag in the plank position.",
      "Landing the jumps with locked knees.",
      "Rushing the chest-to-floor phase until the form collapses.",
    ],
    coachTips: [
      "Step the feet out instead of jumping until the movement is smooth.",
      "Keep the landings quiet and the trunk braced throughout.",
      "Scale the jump to keep every rep repeatable.",
    ],
  },
  {
    slug: "jumping-jack",
    name: "Jumping Jack",
    muscle: "Full body",
    groups: ["Cardio"],
    difficulty: "Beginner",
    equipment: ["Bodyweight"],
    howToPerform: [
      "Stand tall with the feet together and the arms at the sides.",
      "Jump the feet out wide while sweeping the arms overhead.",
      "Jump the feet back together as the arms return to the sides.",
      "Keep a steady rhythm and land softly on the balls of the feet.",
    ],
    commonMistakes: [
      "Half-raising the arms and losing the overhead reach.",
      "Landing hard and flat-footed on every rep.",
      "Letting the knees collapse inward while jumping.",
    ],
    coachTips: [
      "Keep the core engaged so the lower back stays quiet.",
      "Use them as an easy warm-up rather than trying to max them out.",
      "Land softly and breathe rhythmically to keep the pace sustainable.",
    ],
  },
  {
    slug: "rowing-machine",
    name: "Rowing Machine",
    muscle: "Full body",
    groups: ["Cardio", "Back", "Legs"],
    difficulty: "Beginner",
    equipment: ["Rowing machine"],
    howToPerform: [
      "Sit with the shins vertical, the knees slightly bent, and the strap over the feet.",
      "Drive with the legs first, then swing the torso back while pulling the handle.",
      "Finish with the handle at the lower chest and the torso upright.",
      "Reverse the sequence — arms, torso, then legs — to return and recover.",
    ],
    commonMistakes: [
      "Pulling with the arms before the legs are involved.",
      "Rounding the back during the recovery phase.",
      "Slamming the seat back and forth without a controlled finish.",
    ],
    coachTips: [
      "Think legs, body, arms on the pull and the reverse on the return.",
      "Keep the handle path close to the body and the legs compressed at the catch.",
      "Build stroke rate gradually rather than sprinting every interval.",
    ],
  },
];

export function getExerciseBySlug(slug: string) {
  return EXERCISES.find((exercise) => exercise.slug === slug);
}
