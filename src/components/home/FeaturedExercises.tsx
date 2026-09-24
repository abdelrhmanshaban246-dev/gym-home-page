import { motion } from "framer-motion";
import { Gauge } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionHeading } from "@/components/home/SectionHeading";

interface Exercise {
  name: string;
  muscle: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

const EXERCISES: Exercise[] = [
  { name: "Bench Press", muscle: "Chest", difficulty: "Intermediate" },
  { name: "Squat", muscle: "Legs", difficulty: "Advanced" },
  { name: "Lat Pulldown", muscle: "Back", difficulty: "Beginner" },
];

// Simple local SVG placeholder — no external images
function ExercisePlaceholder({ label }: { label: string }) {
  return (
    <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br from-muted to-card">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <span className="font-display text-lg uppercase tracking-[0.25em] text-muted-foreground/70">
        {label}
      </span>
    </div>
  );
}

const DIFFICULTY_STYLES: Record<Exercise["difficulty"], string> = {
  Beginner: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  Intermediate: "border-primary/30 bg-primary/10 text-primary",
  Advanced: "border-red-500/30 bg-red-500/10 text-red-400",
};

export function FeaturedExercises() {
  return (
    <section id="exercises" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Featured Exercises"
          title="Master the fundamentals"
          description="Three proven lifts that build the foundation of every strong, capable body. Technique first — load second."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EXERCISES.map((exercise, i) => (
            <motion.div
              key={exercise.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            >
              <Card className="group h-full overflow-hidden border-border/70 bg-card/80 py-0 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
                <CardHeader className="p-0 pb-0">
                  <div className="relative">
                    <ExercisePlaceholder label={exercise.name} />
                    <Badge
                      className={`absolute left-3 top-3 border ${DIFFICULTY_STYLES[exercise.difficulty]}`}
                    >
                      {exercise.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-5">
                  <CardTitle className="font-display text-xl uppercase tracking-wide transition-colors group-hover:text-primary">
                    {exercise.name}
                  </CardTitle>
                  <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <Gauge className="size-4 text-primary/70" />
                    Target muscle:{" "}
                    <span className="font-semibold text-foreground">
                      {exercise.muscle}
                    </span>
                  </p>
                </CardContent>
                <CardFooter className="p-5 pt-0" />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
