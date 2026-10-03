import {
  ArrowLeft,
  CalendarDays,
  Dumbbell,
  Flame,
  Gauge,
  Lightbulb,
  Timer,
} from "lucide-react";
import { Link, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/home/Footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getExerciseBySlug } from "@/data/exercises";
import {
  formatRest,
  getWorkoutProgramBySlug,
} from "@/data/workout-programs";

/** Program not found. Mirrors the exercise details 404 so both feel the same. */
function ProgramNotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex flex-1 flex-col">
      <div className="border-b border-border/60 bg-card/30">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/workout-programs" className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Dumbbell className="size-4.5" />
            </span>
            <span className="font-display text-xl tracking-wide">ELBODY</span>
          </Link>
          <Button asChild variant="outline" size="sm">
            <Link to="/workout-programs">
              <ArrowLeft className="size-4" />
              Back to Programs
            </Link>
          </Button>
        </div>
      </div>

      <section className="flex flex-1 items-center justify-center px-4 py-20 sm:py-24">
        <div className="relative mx-auto max-w-xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
            404
          </p>
          <h1 className="mt-3 font-display text-4xl uppercase leading-tight sm:text-5xl">
            Program Not Found
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            We could not find a workout program with that address. It may have
            been renamed or retired.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="h-12 px-8 font-bold uppercase tracking-wider"
            >
              <Link to="/workout-programs">
                <ArrowLeft className="size-4" />
                Back to Workout Programs
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 px-8 font-bold uppercase tracking-wider"
            >
              <Link to="/">Go to Home</Link>
            </Button>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
}

export default function WorkoutProgramDetails() {
  const { programSlug } = useParams<{ programSlug: string }>();
  const program = getWorkoutProgramBySlug(programSlug);

  if (!program) {
    return <ProgramNotFound />;
  }

  // Exercise names always come from the shared library, so a program can never
  // show a movement that has its own detail page under a different name.
  const movements = program.exercises
    .map((entry) => {
      const exercise = getExerciseBySlug(entry.exerciseSlug);
      return exercise ? { entry, exercise } : null;
    })
    .filter((movement): movement is NonNullable<typeof movement> => Boolean(movement));

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex-1">
      <div className="border-b border-border/60 bg-card/30">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/workout-programs" className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Dumbbell className="size-4.5" />
            </span>
            <span className="font-display text-xl tracking-wide">ELBODY</span>
          </Link>
          <Button asChild variant="outline" size="sm">
            <Link to="/workout-programs">
              <ArrowLeft className="size-4" />
              Back to Programs
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
            Workout Program
          </p>
          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <h1 className="font-display text-4xl uppercase leading-tight sm:text-5xl">
              {program.name}
            </h1>
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Gauge className="size-4 text-primary" aria-hidden />
                Level:{" "}
                <span className="font-semibold text-foreground">
                  {program.level}
                </span>
              </span>
              <span className="flex items-center gap-2">
                <Flame className="size-4 text-primary" aria-hidden />
                Goal:{" "}
                <span className="font-semibold text-foreground">
                  {program.goal}
                </span>
              </span>
              <span className="flex items-center gap-2">
                <Timer className="size-4 text-primary" aria-hidden />
                Duration:{" "}
                <span className="font-semibold text-foreground">
                  {program.duration}
                </span>
              </span>
              <span className="flex items-center gap-2">
                <CalendarDays className="size-4 text-primary" aria-hidden />
                Frequency:{" "}
                <span className="font-semibold text-foreground">
                  {program.frequency}
                </span>
              </span>
            </p>
          </div>

          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {program.description}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {program.focus.map((focus) => (
              <li
                key={focus}
                className="rounded-md border border-border/70 bg-background/60 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >
                {focus}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="border-border/70 bg-card/80 lg:col-span-2">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Dumbbell className="size-5" />
                  </span>
                  <CardTitle className="font-display text-2xl uppercase tracking-wide">
                    Workout Structure
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  {movements.map(({ entry, exercise }, index) => (
                    <li
                      key={`${exercise.slug}-${entry.sets}-${index}`}
                      className="rounded-xl border border-border/70 bg-background/40 p-4 transition-colors hover:border-primary/40"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <p className="font-display text-lg uppercase tracking-wide">
                          {index + 1}.{" "}
                          <Link
                            to={`/exercises/${exercise.slug}`}
                            className="underline decoration-border underline-offset-4 transition-colors hover:text-primary"
                          >
                            {exercise.name}
                          </Link>
                        </p>
                        <p className="text-sm font-semibold text-muted-foreground">
                          {entry.sets} × {entry.reps} · Rest{" "}
                          {formatRest(entry.rest)}
                        </p>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {entry.notes}
                      </p>
                      <p className="mt-2 text-xs uppercase tracking-wide text-muted-foreground/70">
                        Target muscle: {exercise.muscle}
                      </p>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-6">
              <Card className="border-border/70 bg-card/80">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Timer className="size-5" />
                    </span>
                    <CardTitle className="font-display text-2xl uppercase tracking-wide">
                      Warm-Up
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {program.warmUp}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/70 bg-card/80">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Lightbulb className="size-5" />
                    </span>
                    <CardTitle className="font-display text-2xl uppercase tracking-wide">
                      Focus Point
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {program.focusPoint}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="h-12 px-8 font-bold uppercase tracking-wider"
            >
              <Link to="/workout-programs">
                <ArrowLeft className="size-4" />
                Back to Workout Programs
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/#exercises">Browse Exercises</Link>
            </Button>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
}