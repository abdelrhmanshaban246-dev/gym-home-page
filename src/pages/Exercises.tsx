import { ArrowLeft, Dumbbell } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ExerciseLibrary } from "@/components/exercises/ExerciseLibrary";
import { Footer } from "@/components/home/Footer";
import { useSeo } from "@/lib/seo";

export default function Exercises() {
  useSeo({
    title: "Exercise Library",
    description:
      "Browse all 28 ELBODY exercises with a demonstration for each. Filter by target muscle, or search by name, equipment or difficulty.",
  });

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex-1">
        <div className="border-b border-border/60 bg-card/30">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
            <Link to="/" className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Dumbbell className="size-4.5" />
              </span>
              <span className="font-display text-xl tracking-wide">ELBODY</span>
            </Link>
            <Button asChild variant="outline" size="sm">
              <Link to="/">
                <ArrowLeft className="size-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>

        <section className="relative overflow-hidden py-16 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-primary/10 blur-[100px]"
          />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
              Exercise Library
            </p>
            <h1 className="mt-3 font-display text-4xl uppercase leading-tight sm:text-5xl">
              Every exercise, coached
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              All 28 movements in the ELBODY library, each with a demonstration,
              step-by-step instructions and the mistakes to avoid. Filter by
              target muscle or search by name, equipment or difficulty.
            </p>

            <ExerciseLibrary />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}