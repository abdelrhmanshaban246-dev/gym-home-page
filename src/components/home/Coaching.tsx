import { motion } from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/home/SectionHeading";
import profileImage from "@/assets/profile.png";

// Only facts that already exist elsewhere in the project are used here.
const COACH = {
  name: "Abdelrhman",
  role: "Personal Fitness Coach",
  bio: "Coaching built around strength, physique, and consistency — a smarter approach to training that you can actually keep doing.",
};

const COACH_POINTS = [
  "Coaching built around the exercise library and programs on this site.",
  "Personalized training plans, matched to your goal and schedule.",
  "Ongoing WhatsApp support between sessions.",
];

export function Coaching() {
  return (
    <section id="coaching" className="scroll-mt-20 py-20 sm:py-24">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-primary/10 blur-[100px]"
        />

        <div className="relative grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* Coach photo — the existing ELBODY profile image, unmodified. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none"
          >
            <img
              src={profileImage}
              alt={`${COACH.name}, ${COACH.role} at ELBODY`}
              className="block h-auto w-full max-w-none select-none object-contain object-bottom drop-shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
              width={1672}
              height={941}
              loading="lazy"
              decoding="async"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
          >
            <SectionHeading
              eyebrow="Coaching"
              title="Meet your coach"
              description={COACH.bio}
            />

            <ul className="mt-8 flex flex-col gap-3">
              {COACH_POINTS.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground sm:text-base"
                >
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Flame className="size-3.5" aria-hidden />
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-3 rounded-xl border border-border/60 bg-card/70 px-4 py-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Flame className="size-4" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold">{COACH.name}</p>
                <p className="text-xs text-muted-foreground">{COACH.role}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 px-8 font-bold uppercase tracking-wider"
              >
                <a href="#contact">
                  Get Coaching
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 border-border px-8 font-bold uppercase tracking-wider hover:bg-accent"
              >
                <a href="#programs">
                  Browse Programs
                  <ArrowRight className="size-4" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}