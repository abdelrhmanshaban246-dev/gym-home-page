import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/home/Footer";

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen flex-col bg-background text-foreground"
    >
      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6">
          <div className="flex min-h-[200px] items-center justify-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                Error 404
              </p>
              <h1 className="mt-3 font-display text-4xl uppercase leading-tight text-foreground sm:text-5xl">
                Page Not Found
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                The page you are looking for doesn&apos;t exist or has moved.
              </p>
              <Button
                asChild
                size="lg"
                className="mt-8 h-12 px-8 font-bold uppercase tracking-wider"
              >
                <Link to="/">
                  <ArrowLeft className="size-4" aria-hidden />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </motion.div>
  );
}