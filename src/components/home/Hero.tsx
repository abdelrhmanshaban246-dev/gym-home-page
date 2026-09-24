import { motion } from "framer-motion";
import { ArrowRight, Flame, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImage from "@/assets/profile.png";

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
    <>
      <link
        rel="preload"
        as="image"
        href={profileImage}
        fetchPriority="high"
      />
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

      <div className="relative mx-auto grid w-full max-w-6xl flex-1 items-center gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:pt-0">
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
              Personal Fitness Coach
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
            Helping you build strength, improve your physique, and stay
            consistent with a smarter approach to training.
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

        {/* Official ELBODY coach photo, shown as an unmodified transparent PNG. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative mx-auto flex w-full max-w-sm flex-col items-center sm:max-w-md lg:ml-auto lg:max-w-none lg:justify-self-end"
        >
          <img
            key="elbody-profile-hero"
            src={profileImage}
            alt="ELBODY certified personal fitness coach"
            className="block h-auto w-auto max-h-[62svh] max-w-none select-none object-contain object-bottom drop-shadow-[0_18px_40px_rgba(0,0,0,0.45)] sm:max-h-[74svh]"
            width={1672}
            height={941}
            loading="eager"
            decoding="sync"
            fetchPriority="high"
          />

          {/* Coach identity chip */}
          <div className="mt-6 flex w-full max-w-xs items-center justify-between rounded-xl border border-border/60 bg-card/70 px-4 py-3 shadow-lg shadow-black/30 backdrop-blur-md">
            <div>
              <p className="text-sm font-bold">Abdelrhman</p>
              <p className="text-xs text-muted-foreground">
                Personal Fitness Coach
              </p>
            </div>
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Flame className="size-4" />
            </span>
          </div>
        </motion.div>
      </div>
      </section>
    </>
  );
}
