import { motion } from "framer-motion";
import { ArrowUpRight, Dumbbell, Flame, HeartPulse } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionHeading } from "@/components/home/SectionHeading";

interface Program {
  title: string;
  description: string;
  icon: typeof Dumbbell;
  /** The program this teaser opens in the full programs experience. */
  programSlug: string;
}

const PROGRAMS: Program[] = [
  {
    title: "Strength",
    description:
      "Progressive heavy lifting focused on the big compound lifts. Build raw, functional power week after week.",
    icon: Dumbbell,
    programSlug: "legs-quads-hamstrings-glutes",
  },
  {
    title: "Muscle Building",
    description:
      "Structured hypertrophy training with smart volume and recovery programming to pack on lean size.",
    icon: Flame,
    programSlug: "push-chest-shoulders-triceps",
  },
  {
    title: "Fat Loss",
    description:
      "Metabolic conditioning combined with strength work to burn fat while keeping every ounce of muscle.",
    icon: HeartPulse,
    programSlug: "fat-loss-conditioning",
  },
];

export function WorkoutPrograms() {
  return (
    <section id="programs" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Workout Programs"
          title="Pick your path"
          description="Each program is a complete system — training split, progression scheme, and weekly coaching check-ins included."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PROGRAMS.map((program, i) => (
            <motion.div
              key={program.programSlug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            >
              <Card className="group relative h-full overflow-hidden border-border/70 bg-card/80 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
                {/* Accent sweep */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100"
                />
                <CardHeader>
                  <div className="mb-3 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <program.icon className="size-5" />
                  </div>
                  <CardTitle className="font-display text-2xl uppercase tracking-wide">
                    {program.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-5">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {program.description}
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-border font-semibold uppercase tracking-wide group-hover:border-primary/50 group-hover:text-primary"
                  >
                    <Link to={`/workout-programs/${program.programSlug}`}>
                      View Program
                      <ArrowUpRight className="size-4" aria-hidden />
                      <span className="sr-only">: {program.title}</span>
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            asChild
            variant="outline"
            className="border-border font-semibold uppercase tracking-wide hover:border-primary/50 hover:text-primary"
          >
            <Link to="/workout-programs">
              View All Programs
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}