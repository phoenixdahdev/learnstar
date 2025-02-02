import { Contact } from "@/components/contact";
import { DigitalResults } from "@/components/digital-results";
import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { Pricing } from "@/components/pricing";
import { TryItOut } from "@/components/try-it-out";
import React from "react";

const page = () => {
  return (
    <main className="min-h-screen bg-cream">
      <Hero />
      <Features />
      <TryItOut />
      <DigitalResults />
      <Pricing />
      <Contact />
    </main>
  );
};

export default page;
