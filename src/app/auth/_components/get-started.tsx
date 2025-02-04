import Link from "next/link";
import { ArrowRight, GraduationCap, School, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/utils";

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdf6ec] to-[#f7e8d4] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl text-center mb-12">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
          Welcome to LearnStar.AI
        </h1>
        <p className="text-xl sm:text-2xl text-gray-600 mb-8">
          Empower your educational journey with AI-driven insights and
          collaboration
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        {[
          {
            title: "Teacher",
            icon: GraduationCap,
            color: "blue",
            href: "/auth/sign-up/teacher",
            description: "Join as an independent educator",
          },
          {
            title: "School",
            icon: School,
            color: "green",
            href: "/auth/sign-up/school",
            description: "Register your educational institution",
          },
          {
            title: "Parent",
            icon: Users,
            color: "purple",
            href: "/auth/sign-up/parent",
            description: "Support your child's education",
          },
        ].map((item, index) => (
          <Card
            key={index}
            className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <CardHeader>
              <CardTitle className="flex flex-col items-center justify-center text-2xl">
                <item.icon
                  className={`w-12 h-12 mb-2 text-${item.color}-600`}
                />
                {item.title}
              </CardTitle>
              <CardDescription className="text-center">
                {item.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                asChild={item.title !== "Teacher"}
                className={cn(
                  `hover:bg-${item.color}-700 bg-${item.color}-600 w-full disabled:cursor-not-allowed`
                )}
                disabled={item.title !== "Teacher"}
              >
                <Link href={item.href}>
                  Get Started <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="mt-12 text-gray-600 text-center text-lg">
        Already have an account?{" "}
        <Link
          href="/auth/sign-in"
          className="text-blue-600 hover:underline font-semibold"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
