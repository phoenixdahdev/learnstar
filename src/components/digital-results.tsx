"use client";

import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function DigitalResults() {
  return (
    <section id="digital-results" className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-brown mb-4">
            Digital Student Results
          </h2>
          <p className="text-brown/80 text-lg max-w-2xl mx-auto">
            Access and download student reports instantly with our digital
            results system
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold text-brown mb-4">
              Streamline Result Management
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FileText className="h-6 w-6 text-golden mr-2 shrink-0 mt-1" />
                <span>Instant access to student reports</span>
              </li>
              <li className="flex items-start">
                <Download className="h-6 w-6 text-golden mr-2 shrink-0 mt-1" />
                <span>Download reports in PDF format</span>
              </li>
              <li className="flex items-start">
                <FileText className="h-6 w-6 text-golden mr-2 shrink-0 mt-1" />
                <span>Comprehensive term-by-term performance analysis</span>
              </li>
            </ul>
            <Link href="/digital-results" className="mt-8 inline-block">
              <Button className="bg-golden hover:bg-golden/90 text-cream">
                Try Digital Results
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-linear-to-r from-golden to-amber-600 rounded-2xl transform rotate-3" />
            <div className="relative bg-white p-6 rounded-2xl shadow-xl">
              <h4 className="text-xl font-semibold text-brown mb-4">
                Sample Student Report
              </h4>
              <div className="space-y-2">
                <p>
                  <strong>Name:</strong> John Doe
                </p>
                <p>
                  <strong>Class:</strong> JSS 2
                </p>
                <p>
                  <strong>Term:</strong> First Term
                </p>
                <p>
                  <strong>Overall Grade:</strong> A
                </p>
              </div>
              <div className="mt-4 p-2 bg-cream rounded">
                <p className="text-sm text-brown/70">
                  Enter student ID to view full report
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
