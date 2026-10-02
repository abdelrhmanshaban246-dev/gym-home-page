import { motion } from "framer-motion";
import { WorkoutProgramCard } from "@/components/workout-programs/WorkoutProgramCard";
import type { WorkoutProgram } from "@/data/workout-programs";

/** Program grid. Same grid breakpoints and entrance treatment as the library. */
export function WorkoutProgramGrid({ programs }: { programs: WorkoutProgram[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {programs.map((program, index) => (
        <motion.div
          key={program.slug}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.5,
            delay: Math.min(index, 3) * 0.08,
            ease: "easeOut",
          }}
        >
          <WorkoutProgramCard program={program} />
        </motion.div>
      ))}
    </div>
  );
}