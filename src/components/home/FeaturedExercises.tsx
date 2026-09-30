import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Dumbbell, Gauge } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExerciseMedia } from "@/components/exercises/ExerciseMedia";
import { SectionHeading } from "@/components/home/SectionHeading";
import {
  EXERCISES,
  MUSCLE_GROUPS,
  type MuscleGroup,
} from "@/data/exercises";

export function FeaturedExercises() {
  const [selectedGroup, setSelectedGroup] = useState<MuscleGroup>("All");

  const visibleExercises =
    selectedGroup === "All"
      ? EXERCISES
      : EXERCISES.filter((exercise) =>
          exercise.groups.includes(
            selectedGroup as Exclude<MuscleGroup, "All">,
          ),
        );

  return (
    <section id="exercises" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Exercise Library"
          title="Build stronger movements"
          description="Explore foundational exercises by target muscle. Each entry pairs the exercise demonstration with step-by-step coaching guidance."
        />

        <div
          role="group"
          aria-label="Filter exercises by muscle group"
          className="mt-10 flex flex-wrap gap-2"
        >
          {MUSCLE_GROUPS.map((group) => {
            const isSelected = selectedGroup === group;

            return (
              <button
                key={group}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedGroup(group)}
                className={`rounded-md border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border/70 bg-card/60 text-muted-foreground hover:border-primary/40 hover:text-primary"
                }`}
              >
                {group}
              </button>
            );
          })}
        </div>

        <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {visibleExercises.map((exercise, index) => (
              <motion.div
                layout
                key={exercise.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{
                  duration: 0.3,
                  delay: Math.min(index, 3) * 0.04,
                  ease: "easeOut",
                }}
              >
                <Card className="group h-full overflow-hidden border-border/70 bg-card/80 py-0 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
                  <CardHeader className="p-0 pb-0">
                    <ExerciseMedia
                      name={exercise.name}
                      fallback={
                        <div className="relative flex flex-col items-center gap-3 px-4 text-center">
                          <span className="flex size-14 items-center justify-center rounded-2xl border border-primary/25 bg-background/60 text-primary shadow-lg shadow-black/20 backdrop-blur-sm">
                            <Dumbbell className="size-6" />
                          </span>
                          <span className="font-display text-sm uppercase tracking-[0.18em] text-muted-foreground/70">
                            {exercise.name}
                          </span>
                        </div>
                      }
                    />
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
                  <CardFooter className="p-5 pt-0">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-border font-semibold uppercase tracking-wide group-hover:border-primary/50 group-hover:text-primary"
                    >
                      <Link to={`/exercises/${exercise.slug}`}>
                        View Exercise
                        <ArrowUpRight className="size-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
