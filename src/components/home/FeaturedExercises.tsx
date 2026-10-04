import { useEffect } from "react";
import { useLocation } from "react-router";
import { ExerciseLibrary } from "@/components/exercises/ExerciseLibrary";
import { SectionHeading } from "@/components/home/SectionHeading";

/**
 * Landing-page section wrapper around the shared exercise library. The library
 * itself (search, filters, grid) lives in `@/components/exercises/ExerciseLibrary`
 * so this section and the dedicated `/exercises` page can never drift apart.
 */
export function FeaturedExercises() {
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

  return (
    <section id="exercises" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Exercise Library"
          title="Build stronger movements"
          description="Explore foundational exercises by target muscle. Each entry pairs the exercise demonstration with step-by-step coaching guidance."
        />

        <ExerciseLibrary />
      </div>
    </section>
  );
}