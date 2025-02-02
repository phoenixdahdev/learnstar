"use client";

import { useChat } from "ai/react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Bot, User } from "lucide-react";
import Link from "next/link";
import { marked } from "marked";
import parse from "html-react-parser";
import { cn } from "@/utils";

const getInitialMessage = (
  type: "lesson-note" | "exam" | "marking" | "assessment"
) => {
  switch (type) {
    case "lesson-note":
      return "Hello! I'm your LearnStar.AI lesson planning assistant. I can help you create detailed lesson notes, customize teaching materials, and develop engaging learning activities. What subject and topic would you like to work on?";
    case "exam":
      return "Welcome! I'm your LearnStar.AI exam creation assistant. I can help you generate questions, structure exam papers, and create marking schemes. What type of exam would you like to create?";
    case "marking":
      return "Hi there! I'm your LearnStar.AI marking assistant. I can help you develop rubrics, standardize grading criteria, and provide feedback templates. How would you like to streamline your marking process?";
    case "assessment":
      return "Hello! I'm your LearnStar.AI Assignment specialist. I can help you create formative assessments, track student progress, and analyze learning outcomes. What type of assessment would you like to develop?";
    default:
      return "Hello! I'm your LearnStar.AI assistant. How can I help transform your school today?";
  }
};

export default function Chat({
  type = "lesson-note",
}: {
  type: "lesson-note" | "exam" | "marking" | "assessment";
}) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      initialMessages: [
        {
          id: "1",
          role: "assistant",
          content: getInitialMessage(type),
        },
      ],
      api:
        type === "lesson-note"
          ? "/api/tools/lesson-note"
          : type === "assessment"
          ? "/api/tools/assessment"
          : type === "exam"
          ? "/api/tools/exam"
          : type === "marking"
          ? "/api/tools/marking"
          : "/api/chat",
    });

  return (
    <div className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 pt-20">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <Card className="max-w-4xl mx-auto bg-white/50 backdrop-blur-xs shadow-xl">
          <div className="border-b border-golden/20 p-4">
            <h2 className="text-xl font-semibold text-brown">
              LearnStar.AI Assistant
            </h2>
            <p className="text-sm text-brown/60">
              Ask me anything about transforming your school
            </p>
          </div>

          <div className="h-[600px] overflow-y-auto p-4 space-y-4 custom_scroll">
            {messages.map((message) => {
              const html = marked.parse(message.content);
              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex items-end gap-3",
                    message.role === "assistant"
                      ? "justify-start"
                      : "justify-end",
                    message.role === "assistant" ? "mr-12" : "ml-12"
                  )}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-golden/20 flex items-center justify-center shrink-0">
                      <Bot className="h-5 w-5 text-golden" />
                    </div>
                  )}

                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl p-4",
                      message.role === "assistant"
                        ? "bg-white text-brown rounded-bl-none"
                        : "bg-golden text-cream rounded-br-none"
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">
                      {parse(html as string)}
                    </p>
                  </div>

                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-golden flex items-center justify-center shrink-0">
                      <User className="h-5 w-5 text-cream" />
                    </div>
                  )}
                </motion.div>
              );
            })}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start items-center gap-2 text-brown/60"
              >
                <div className="w-8 h-8 rounded-full bg-golden/20 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-golden" />
                </div>
                <div className="flex gap-1">
                  <span className="animate-bounce">●</span>
                  <span
                    className="animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  >
                    ●
                  </span>
                  <span
                    className="animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  >
                    ●
                  </span>
                </div>
              </motion.div>
            )}
          </div>

          <div className="border-t border-golden/20 p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask about our AI solutions, revenue strategies, or educational tools..."
                className="flex-1 bg-white border-golden/20"
              />
              <Button
                type="submit"
                className="bg-golden hover:bg-golden/90 text-cream"
                disabled={isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}
