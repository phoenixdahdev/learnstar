"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/utils";

const plans = [
  {
    name: "Starter",
    price: "₦35,000",
    description: "Perfect for small schools just getting started",
    features: [
      "Basic AI lesson planning",
      "Student game vouchers",
      "Digital assessments",
      "Basic analytics",
      "Email support",
    ],
  },
  {
    name: "Professional",
    price: "₦60,000",
    description: "Ideal for growing schools seeking more features",
    features: [
      "Advanced AI lesson planning",
      "Premium game vouchers",
      "Automated grading",
      "Advanced analytics",
      "Priority support",
      "Parent portal access",
      "Custom branding",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large institutions with specific needs",
    features: [
      "Full AI suite access",
      "White-label solution",
      "API access",
      "Dedicated support",
      "Custom integrations",
      "Training sessions",
      "Success manager",
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-brown mb-4">
            Choose Your Plan
          </h2>
          <p className="text-brown/80 text-lg max-w-2xl mx-auto">
            Select the perfect plan for your school&apos;s needs and start your
            transformation today.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "relative bg-cream rounded-2xl p-8",
                plan.popular ? "ring-2 ring-golden" : ""
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 right-8 transform -translate-y-1/2">
                  <div className="bg-golden text-cream text-sm font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-brown mb-2">
                  {plan.name}
                </h3>
                {/* <div className="mb-4">
                  <span className="text-4xl font-bold text-brown">
                    {plan.price}
                  </span>
                  {plan.price !== "Custom" && (
                    <span className="text-brown/70">/term</span>
                  )}
                </div> */}
                <p className="text-brown/70">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center text-brown/80"
                  >
                    <Check className="h-5 w-5 text-golden mr-2 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/chat">
                <Button
                  className={cn(
                    "w-full",
                    plan.popular
                      ? "bg-golden hover:bg-golden/90 text-cream"
                      : "bg-brown/5 hover:bg-brown/10 text-brown"
                  )}
                >
                  Get Started
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
