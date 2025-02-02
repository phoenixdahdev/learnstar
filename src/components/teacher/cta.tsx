"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

export function TeacherCTA() {
  return (
    <section className="py-20 bg-golden/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-brown mb-4">
            Ready to Transform Your Teaching Career?
          </h2>
          <p className="text-lg text-brown/80 mb-8">
            Join thousands of teachers who are working smarter, earning more,
            and making a bigger impact with LearnStar.AI.
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="grow"
            />
            <Button className="bg-golden text-cream hover:bg-golden/90">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
          <p className="mt-4 text-sm text-brown/60">
            Contact: Covenant Chukwudi | Email: covenant@learnstar.ai | Phone:
            +234 123 456 7890
          </p>
        </motion.div>
      </div>
    </section>
  );
}
