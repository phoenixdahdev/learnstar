"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  Brain,
  BotIcon as Robot,
  BarChartIcon as ChartBar,
  Users,
  MessageSquare,
  Zap,
} from "lucide-react";
import { cn } from "@/utils";
import Link from "next/link";

const MotionCard = motion(Card);

export default function DashboardPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const cardVariants = {
    hover: {
      scale: 1.03,
      transition: { duration: 0.2 },
    },
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: { duration: 0.5 },
    },
  };

  const cards = [
    {
      title: "AI Lesson Planner",
      link: "/lesson-planner",
      availabee: true,
      description:
        "Create engaging lesson plans tailored to your curriculum and teaching style.",
      icon: Brain,
      gradient: "from-purple-500 to-indigo-600",
      buttonText: "Plan Lessons",
      features: [
        "Customizable templates",
        "Subject-specific suggestions",
        "Learning objective alignment",
      ],
    },
    {
      title: "Smart Auto-Grader",
      link: "/grader",
      availabee: true,
      description:
        "Save time by automatically grading assignments and providing detailed feedback.",
      icon: Robot,
      gradient: "from-green-500 to-emerald-600",
      buttonText: "Start Grading",
      features: [
        "Multiple question types",
        "Rubric integration",
        "Plagiarism detection",
      ],
    },
    {
      title: "Interactive Progress Tracker",
      link: "/progress-tracker",
      availabee: false,
      description:
        "Visualize student progress and identify areas for improvement at a glance.",
      icon: ChartBar,
      gradient: "from-yellow-500 to-orange-600",
      buttonText: "Track Progress",
      features: [
        "Customizable dashboards",
        "Individual and class views",
        "Data-driven insights",
      ],
    },
    {
      title: "Efficient Class Management",
      link: "/class-management",
      availabee: false,
      description:
        "Streamline administrative tasks and organize your classes effortlessly.",
      icon: Users,
      gradient: "from-blue-500 to-cyan-600",
      buttonText: "Manage Classes",
      features: [
        "Attendance tracking",
        "Behavior management",
        "Resource allocation",
      ],
    },
    {
      title: "Parent Communication Hub",
      link: "/communication",
      availabee: false,
      description:
        "Enhance parent engagement with easy-to-use communication tools.",
      icon: MessageSquare,
      gradient: "from-pink-500 to-rose-600",
      buttonText: "Connect with Parents",
      features: [
        "Automated updates",
        "Scheduling assistant",
        "Two-way messaging",
      ],
    },
    {
      title: "Dynamic Quiz Generator",
      link: "/quiz-generator",
      availabee: true,
      description:
        "Create diverse quizzes in seconds to assess student understanding effectively.",
      icon: Zap,
      gradient: "from-teal-500 to-green-600",
      buttonText: "Generate Quizzes",
      features: [
        "Question bank integration",
        "Difficulty adjustment",
        "Real-time results",
      ],
    },
  ];

  return (
    <div className="flex-1 space-y-6 p-8 pt-6 ">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0"
      >
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Teacher&apos;s Toolkit
          </h2>
          <p className="text-xl text-muted-foreground mt-2">
            Empower your teaching with our smart tools
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm">
          <CalendarDays className="h-5 w-5 text-blue-500" />
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {cards.map((card, index) => (
          <MotionCard
            key={index}
            className="bg-white dark:bg-gray-800 overflow-hidden"
            variants={cardVariants}
            whileHover="hover"
            onHoverStart={() => setHoveredCard(index)}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <div className={cn("h-2 bg-gradient-to-r", card.gradient)} />
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <motion.div
                  variants={iconVariants}
                  animate={hoveredCard === index ? "hover" : ""}
                  className={cn(
                    "mr-3 p-2 rounded-full bg-gradient-to-r",
                    card.gradient
                  )}
                >
                  <card.icon className="h-6 w-6 text-white" />
                </motion.div>
                {card.title}
              </CardTitle>
              <CardDescription className="text-base mt-2">
                {card.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="mt-4 space-y-2">
                {card.features.map((feature, fIndex) => (
                  <li
                    key={fIndex}
                    className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                  >
                    <Zap className="h-4 w-4 mr-2 text-yellow-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className={cn(
                  "w-full mt-6 text-white bg-gradient-to-r hover:opacity-90 transition-opacity",
                  card.gradient
                )}
                asChild={card.availabee}
              >
                {card.availabee ? (
                  <Link href={`/teacher${card.link}`}>{card.buttonText}</Link>
                ) : (
                  card.buttonText + " (Coming Soon)"
                )}
              </Button>
            </CardContent>
          </MotionCard>
        ))}
      </motion.div>
    </div>
  );
}
