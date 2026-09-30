import {
  AlertTriangle,
  ArrowLeft,
  Dumbbell,
  Gauge,
  Lightbulb,
  ListChecks,
} from "lucide-react";
import { Link, Navigate, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExercisePhotoLoop } from "@/components/exercises/ExercisePhotoLoop";
import { getExerciseBySlug } from "@/data/exercises";
import { getExercisePhotoLoop } from "@/data/exercise-photos";

function DetailList({
  items,
  numbered = false,
}: {
  items: string[];
  numbered?: boolean;
}) {
  return (
    <ol className="space-y-4">
      {items.map((item, index) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-xs font-bold text-primary">
            {numbered ? index + 1 : "•"}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

export default function ExerciseDetails() {
  const { exerciseSlug } = useParams<{ exerciseSlug: string }>();
  const exercise = exerciseSlug ? getExerciseBySlug(exerciseSlug) : undefined;

  if (!exercise) {
    return <Navigate to="/#exercises" replace />;
  }

  const hasPhotoLoop = Boolean(getExercisePhotoLoop(exercise.name));

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border/60 bg-card/30">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/#exercises" className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Dumbbell className="size-4.5" />
            </span>
            <span className="font-display text-xl tracking-wide">ELBODY</span>
          </Link>
          <Button asChild variant="outline" size="sm">
            <Link to="/#exercises">
              <ArrowLeft className="size-4" />
              Back to Exercises
            </Link>
          </Button>
        </div>
      </div>

      <section className="relative overflow-hidden py-16 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-primary/10 blur-[100px]"
        />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
            Exercise Details
          </p>
          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h1 className="font-display text-4xl uppercase leading-tight sm:text-5xl">
              {exercise.name}
            </h1>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Gauge className="size-4 text-primary" />
              Target muscle:{" "}
              <span className="font-semibold text-foreground">
                {exercise.muscle}
              </span>
            </p>
          </div>

          <div className="relative mt-10 flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-primary/15 via-muted to-card shadow-2xl shadow-black/20">
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <div
              aria-hidden
              className="absolute -bottom-24 -left-20 size-72 rounded-full bg-primary/10 blur-3xl"
            />
            <ExercisePhotoLoop name={exercise.name} />
            {!hasPhotoLoop && (
              <div className="relative flex flex-col items-center gap-4 px-6 text-center">
                <span className="flex size-16 items-center justify-center rounded-2xl border border-primary/25 bg-background/70 text-primary backdrop-blur-sm">
                  <Dumbbell className="size-7" />
                </span>
                <div>
                  <p className="font-display text-lg uppercase tracking-[0.2em]">
                    Media Placeholder
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Exercise video and image content will appear here.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:px-6 lg:grid-cols-3">
          <Card className="border-border/70 bg-card/80 lg:col-span-2">
            <CardHeader>
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <ListChecks className="size-5" />
                </span>
                <CardTitle className="font-display text-2xl uppercase tracking-wide">
                  How to Perform
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <DetailList items={exercise.howToPerform} numbered />
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/80">
            <CardHeader>
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Dumbbell className="size-5" />
                </span>
                <CardTitle className="font-display text-2xl uppercase tracking-wide">
                  Equipment
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <DetailList items={exercise.equipment} />
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/80">
            <CardHeader>
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <AlertTriangle className="size-5" />
                </span>
                <CardTitle className="font-display text-2xl uppercase tracking-wide">
                  Common Mistakes
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <DetailList items={exercise.commonMistakes} />
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/80 lg:col-span-2">
            <CardHeader>
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Lightbulb className="size-5" />
                </span>
                <CardTitle className="font-display text-2xl uppercase tracking-wide">
                  Coach Tips
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <DetailList items={exercise.coachTips} />
            </CardContent>
          </Card>
        </div>

        <div className="mx-auto mt-10 max-w-5xl px-4 sm:px-6">
          <Button asChild size="lg" className="h-12 px-8 font-bold uppercase tracking-wider">
            <Link to="/#exercises">
              <ArrowLeft className="size-4" />
              Back to Exercises
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
