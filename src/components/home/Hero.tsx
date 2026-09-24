import { motion } from "framer-motion";
import { ArrowRight, Flame, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const STATS = [
  { value: "12+", label: "Years coaching" },
  { value: "850+", label: "Clients transformed" },
  { value: "40+", label: "Programs built" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: 0.08 * i, ease: "easeOut" as const },
  }),
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col overflow-hidden pt-16"
    >
      {/* Backdrop: charcoal gradient + subtle grid, no external images */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-muted via-background to-background"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-15%] size-[36rem] rounded-full bg-primary/15 blur-[120px]"
      />

      <div className="relative mx-auto grid w-full max-w-6xl flex-1 items-center gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pt-0">
        {/* Copy */}
        <motion.div
          initial="hidden"
          animate="show"
          className="flex flex-col items-start"
        >
          <motion.div
            variants={fadeUp}
            custom={0}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5"
          >
            <Flame className="size-3.5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Personal Coaching
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="font-display text-5xl leading-[0.95] uppercase sm:text-6xl lg:text-7xl"
          >
            Build Your{" "}
            <span className="text-outline">Strongest</span>
            <br />
            Self
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            One-on-one strength coaching built around your body, your schedule,
            and your goals. Train with a proven system — not guesswork — and
            see real progress every single week.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          >
            <Button size="lg" className="h-12 px-8 font-bold uppercase tracking-wider">
              Start Training
              <ArrowRight className="size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 border-border px-8 font-bold uppercase tracking-wider hover:bg-accent"
            >
              <Play className="size-4" />
              View Workouts
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.dl
            variants={fadeUp}
            custom={4}
            className="mt-12 grid w-full grid-cols-3 gap-6 border-t border-border/60 pt-8"
          >
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-3xl text-primary sm:text-4xl">
                  {stat.value}
                </dd>
                <dd className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Photo placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card shadow-2xl shadow-black/40">
            {/* Local placeholder — replace with your personal photo */}
            <div className="flex aspect-[4/5] items-center justify-center bg-gradient-to-br from-muted to-card">
              <div className="flex flex-col items-center gap-3 text-muted-foreground">
                <svg
                  className="size-12 opacity-50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A1.5 1.5 0 0 0 21.75 19.5V4.5A1.5 1.5 0 0 0 20.25 3H3.75A1.5 1.5 0 0 0 2.25 4.5v15A1.5 1.5 0 0 0 3.75 21Z"
                  />
                </svg>
                <span className="font-display text-sm uppercase tracking-[0.2em]">
                  Your Photo
                </span>
                <span className="max-w-[16rem] text-center text-xs text-muted-foreground/70">
                  Drop your personal photo here later
                </span>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-border/60 bg-background/80 px-4 py-3 backdrop-blur-md">
              <div>
                <p className="text-sm font-bold">Alex Carter</p>
                <p className="text-xs text-muted-foreground">
                  Certified Strength Coach
                </p>
              </div>
              <span className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Flame className="size-4" />
              </span>
            </div>
          </div>
          <div
            aria-hidden
            className="absolute -right-6 -top-6 -z-10 size-full rounded-2xl border border-primary/25"
          />
        </motion.div>
      </div>
    </section>
  );
}
