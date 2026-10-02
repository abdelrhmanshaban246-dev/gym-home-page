import { ArrowLeft, Dumbbell } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { WorkoutProgramGrid } from "@/components/workout-programs/WorkoutProgramGrid";
import { WORKOUT_PROGRAMS } from "@/data/workout-programs";

export default function WorkoutPrograms() {
  return (
    <main className="min-h-screen bg-background text-foreground">
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
            Workout Programs
          </p>
          <h1 className="mt-3 font-display text-4xl uppercase leading-tight sm:text-5xl">
            Pick your program
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Every program is a complete session: warm-up, working sets, rest
            and a progression rule. Open one to see the full exercise order and
            the technique cues behind each movement.
          </p>

          <div className="mt-12">
            <WorkoutProgramGrid programs={WORKOUT_PROGRAMS} />
          </div>
        </div>
      </section>
    </main>
  );
}