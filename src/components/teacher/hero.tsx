"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function TeacherHero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-cream to-golden/10 pt-20 pb-12 md:pt-32 md:pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="mb-6 text-4xl font-bold leading-tight text-brown md:text-5xl lg:text-6xl">
            Transform Your Teaching Career with{" "}
            <span className="text-golden">LearnStar.AI</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-brown/80 md:text-xl">
            Reduce workload, increase income, and enhance your professional
            impact with our AI-powered educational tools.
          </p>
          <Button className="bg-golden text-cream hover:bg-golden/90">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-cream to-transparent"></div>
    </section>
  );
}
