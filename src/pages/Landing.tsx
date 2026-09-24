import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/home/Navbar";
import { Hero } from "@/components/home/Hero";
import { FeaturedExercises } from "@/components/home/FeaturedExercises";
import { WorkoutPrograms } from "@/components/home/WorkoutPrograms";
import { Footer } from "@/components/home/Footer";

export default function Landing() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background text-foreground"
    >
      <Navbar />

      <main>
        <Hero />
        <FeaturedExercises />
        <WorkoutPrograms />

        {/* Final CTA band */}
        <section className="border-t border-border/60 bg-card/40 py-16 sm:py-20">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center sm:px-6">
            <h2 className="font-display text-3xl uppercase leading-tight sm:text-4xl">
              Ready to put in <span className="text-primary">the work?</span>
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              Spots for one-on-one coaching are limited each month. Start today
              and get your personalized training plan within 48 hours.
            </p>
            <Button size="lg" className="h-12 px-8 font-bold uppercase tracking-wider">
              Start Training
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </motion.div>
  );
}
