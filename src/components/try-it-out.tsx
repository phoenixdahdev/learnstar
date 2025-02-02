"use client";

import { motion } from "framer-motion";
import { BookOpen, HelpCircle, FileCheck, GraduationCap } from "lucide-react";
import Link from "next/link";

const tools = [
  {
    icon: <BookOpen className="h-8 w-8" />,
    title: "Lesson Note Assistant",
    description: "Create comprehensive lesson notes with AI assistance",
    link: "/assistants/lesson-note",
    color: "from-golden to-amber-600",
  },
  {
    icon: <HelpCircle className="h-8 w-8" />,
    title: "Assignment Questions",
    description: "Generate engaging assignment questions for any subject",
    link: "/assistants/assessment",
    color: "from-emerald-500 to-emerald-700",
  },
  {
    icon: <GraduationCap className="h-8 w-8" />,
    title: "Exam Questions",
    description:
      "Create standardized exam questions with varying difficulty levels",
    link: "/assistants/exam",
    color: "from-blue-500 to-blue-700",
  },
  {
    icon: <FileCheck className="h-8 w-8" />,
    title: "Assignment Markers",
    description: "AI-powered marking assistance for faster grading",
    link: "/assistants/marking",
    color: "from-purple-500 to-purple-700",
  },
];

export function TryItOut() {
  return (
    <section id="try-it-out" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-brown mb-4">
            Try Our AI Tools
          </h2>
          <p className="text-brown/80 text-lg max-w-2xl mx-auto">
            Experience the power of LearnStar.AI with our suite of educational
            tools
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={tool.link} className="block">
                <div className="relative group">
                  <div
                    className={`absolute inset-0 bg-linear-to-r ${tool.color} rounded-2xl opacity-90 transition-transform group-hover:scale-105`}
                  />
                  <div className="relative p-6 text-white">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
                      {tool.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{tool.title}</h3>
                    <p className="text-white/90">{tool.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
