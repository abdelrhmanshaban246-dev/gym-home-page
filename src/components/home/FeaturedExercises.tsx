import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Gauge, Search, X } from "lucide-react";
import { Link, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExerciseCardMedia } from "@/components/exercises/ExerciseMedia";
import { SectionHeading } from "@/components/home/SectionHeading";
import {
  EXERCISES,
  MUSCLE_GROUPS,
  type Exercise,
  type MuscleGroup,
} from "@/data/exercises";

/**
 * Lower-cased haystack of the fields a visitor would reasonably search by.
 * Only existing data is used — nothing is added to the dataset. `groups` is
 * included so the search agrees with the category filters (e.g. "cardio").
 */
function buildSearchHaystack(exercise: Exercise): string {
  return [
    exercise.name,
    exercise.muscle,
    exercise.difficulty,
    ...exercise.equipment,
    ...exercise.groups,
  ]
    .join(" ")
    .toLowerCase();
}

function matchesSearch(exercise: Exercise, term: string): boolean {
  return buildSearchHaystack(exercise).includes(term);
}

export function FeaturedExercises() {
  const [selectedGroup, setSelectedGroup] = useState<MuscleGroup>("All");
  const [query, setQuery] = useState("");
  const { hash } = useLocation();

  // The exercise details page returns to `/#exercises`, but a client-side
  // navigation never triggers the browser's own fragment scroll, so the visitor
  // would land on the hero instead of the library. `scroll-mt-20` on the section
  // keeps the heading clear of the sticky navbar.
  useEffect(() => {
    if (hash !== "#exercises") {
      return;
    }

    document
      .getElementById("exercises")
      ?.scrollIntoView({ block: "start" });
  }, [hash]);

  // Trim + lower-case once so leading/trailing spaces and casing never
  // affect matching. An empty term means "no search constraint".
  const searchTerm = query.trim().toLowerCase();

  // Derived list — the original dataset is never mutated. Category filtering
  // and search are independent constraints applied together, so an empty
  // search preserves the existing per-category results exactly.
  const visibleExercises = EXERCISES.filter((exercise) => {
    const matchesGroup =
      selectedGroup === "All" ||
      exercise.groups.includes(selectedGroup as Exclude<MuscleGroup, "All">);

    if (!matchesGroup) {
      return false;
    }

    return searchTerm === "" || matchesSearch(exercise, searchTerm);
  });

  return (
    <section id="exercises" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Exercise Library"
          title="Build stronger movements"
          description="Explore foundational exercises by target muscle. Each entry pairs the exercise demonstration with step-by-step coaching guidance."
        />

        <div className="relative mt-10 max-w-md">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="exercise-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search exercises..."
            aria-label="Search exercises by name, muscle, equipment, or difficulty"
            className="border-border/70 bg-card/60 pl-9 text-sm focus-visible:border-primary/60 focus-visible:ring-primary/30 [&::-webkit-search-cancel-button]:hidden"
          />
          {query.length > 0 && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear exercise search"
              className="absolute right-2.5 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>

        <div
          role="group"
          aria-label="Filter exercises by muscle group"
          className="mt-6 flex flex-wrap gap-2"
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

        {/* Screen-reader result count, so typing announces feedback without
            changing the visual design. */}
        <p className="sr-only" role="status">
          {visibleExercises.length} exercise
          {visibleExercises.length === 1 ? "" : "s"} found
        </p>

        {visibleExercises.length === 0 && (
          <div className="mt-8 rounded-lg border border-border/70 bg-card/60 px-4 py-16 text-center">
            <p className="font-display text-xl uppercase tracking-wide text-foreground">
              No exercises found.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a different search or filter.
            </p>
          </div>
        )}

        <motion.div
          layout
          className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {visibleExercises.map((exercise, index) => (
              <motion.div
                layout
                key={exercise.slug}
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
                    <ExerciseCardMedia
                      slug={exercise.slug}
                      name={exercise.name}
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
