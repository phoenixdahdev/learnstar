import { TeacherCTA } from "@/components/teacher/cta";
import { TeacherFeatures } from "@/components/teacher/features";
import { TeacherHero } from "@/components/teacher/hero";
import { TeacherIncome } from "@/components/teacher/income";
import { PersonalizedLearningPlan } from "@/components/teacher/personalized-learning-plan";
import { ProfessionalDevelopment } from "@/components/teacher/professional-development";
import { TeacherTestimonials } from "@/components/teacher/testimonials";
import { VirtualClassroom } from "@/components/teacher/virtual-classroom";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "LearnStar.AI for Teachers - Enhance Your Teaching Career",
  description:
    "Discover how LearnStar.AI can help teachers reduce workload, increase income, and boost professional impact with AI-powered educational tools.",
  openGraph: {
    title: "LearnStar.AI for Teachers - Work Smarter, Earn More",
    description:
      "AI-powered solutions to transform your teaching career. Reduce workload, increase income, and enhance your professional impact.",
  },
};

const page = () => {
  return (
    <>
      <TeacherHero />
      <TeacherFeatures />
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-brown mb-12 text-center">
            Try Our AI-Powered Tools
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <PersonalizedLearningPlan />
            <VirtualClassroom />
            <ProfessionalDevelopment />
          </div>
        </div>
      </section>
      <TeacherIncome />
      <TeacherTestimonials />
      <TeacherCTA />
    </>
  );
};

export default page;
