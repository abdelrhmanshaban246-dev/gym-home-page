import { ArrowUpRight, CalendarDays, Gauge, Target, Timer } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExerciseCardMedia } from "@/components/exercises/ExerciseMedia";
import { getExerciseBySlug } from "@/data/exercises";
import type { WorkoutProgram } from "@/data/workout-programs";

/**
 * Program card. Reuses the exercise library's own card media so a program looks
 * like the rest of ELBODY and needs no new artwork: the still comes from an
 * exercise that is actually in the program.
 */
export function WorkoutProgramCard({ program }: { program: WorkoutProgram }) {
  // The still is the program's hero exercise, so it is labelled with that
  // exercise rather than with the program name.
  const heroName = getExerciseBySlug(program.heroExerciseSlug)?.name;

  return (
    <Card className="group h-full overflow-hidden border-border/70 bg-card/80 py-0 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
      <CardHeader className="p-0 pb-0">
        <ExerciseCardMedia
          slug={program.heroExerciseSlug}
          name={heroName ?? program.name}
        />
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-5 p-5">
        <div>
          <CardTitle className="font-display text-xl uppercase tracking-wide transition-colors group-hover:text-primary">
            {program.name}
          </CardTitle>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {program.description}
          </p>
        </div>

        {/* Program facts, in the same token language as the exercise cards.
            Values wrap rather than truncate: at the 3-column desktop width a
            goal like "Fat Loss & Conditioning" does not fit on one line. */}
        <dl className="grid grid-cols-2 gap-3">
          <div className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
            <Gauge className="size-4 shrink-0 text-primary/70" aria-hidden />
            <dt className="sr-only">Level</dt>
            <dd className="min-w-0">{program.level}</dd>
          </div>
          <div className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
            <Target className="size-4 shrink-0 text-primary/70" aria-hidden />
            <dt className="sr-only">Goal</dt>
            <dd className="min-w-0">{program.goal}</dd>
          </div>
          <div className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
            <Timer className="size-4 shrink-0 text-primary/70" aria-hidden />
            <dt className="sr-only">Duration</dt>
            <dd className="min-w-0">{program.duration}</dd>
          </div>
          <div className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="size-4 shrink-0 text-primary/70" aria-hidden />
            <dt className="sr-only">Frequency</dt>
            <dd className="min-w-0">{program.frequency}</dd>
          </div>
        </dl>

        <ul className="flex flex-wrap gap-2">
          {program.focus.map((focus) => (
            <li
              key={focus}
              className="rounded-md border border-border/70 bg-background/60 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
            >
              {focus}
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="p-5 pt-0">
        <Button
          asChild
          variant="outline"
          className="w-full border-border font-semibold uppercase tracking-wide group-hover:border-primary/50 group-hover:text-primary"
        >
          <Link to={`/workout-programs/${program.slug}`}>
            View Program
            <ArrowUpRight className="size-4" aria-hidden />
            <span className="sr-only">: {program.name}</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}