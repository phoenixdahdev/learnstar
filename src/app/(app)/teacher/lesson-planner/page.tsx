"use client";

import { useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Loader2,
  ThumbsUp,
  Brain,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { marked } from "marked";
import parse from "html-react-parser";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/utils";
import { useLessonStore } from "@/hooks/lesson-store";

export default function LessonPlanner() {
  const router = useRouter();
  const setContent = useLessonStore((state) => state.setContent);
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/protected/teacher/planner",
    });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleAcceptResponse = (index: number) => {
    const html = marked.parse(messages[index].content);
    setContent(html as string);
    router.push("/teacher/lesson-editor");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesEndRef]);

  return (
    <div className="flex h-full flex-col bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900">
      <header className="p-6 bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              AI Lesson Planner
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Collaborate with AI to create engaging lesson plans
            </p>
          </div>
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder-teacher.jpg" alt="Teacher" />
            <AvatarFallback>TP</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <AnimatePresence>
            {messages.map((message, index) => {
              const html = marked.parse(message.content);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card
                    className={`${
                      message.role === "user"
                        ? "bg-indigo-200 dark:bg-indigo-800 ml-12"
                        : "bg-white dark:bg-gray-700 mr-12"
                    }`}
                  >
                    <CardContent className="p-4 flex items-start space-x-4">
                      {message.role === "assistant" && (
                        <Avatar className="h-10 w-10 mt-1">
                          <AvatarImage
                            src="/ai-avatar.png"
                            alt="AI Assistant"
                          />
                          <AvatarFallback>
                            <Brain />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className="flex-1">
                        <div
                          className={cn(
                            message.role === "user"
                              ? "text-indigo-800 dark:text-indigo-200"
                              : "text-gray-800 dark:text-gray-200"
                          )}
                        >
                          {parse(html as string)}
                        </div>
                        {message.role === "assistant" && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  onClick={() => handleAcceptResponse(index)}
                                  className="mt-2 bg-green-500 hover:bg-green-600 text-white transition-all duration-200 ease-in-out transform hover:scale-105"
                                >
                                  <ThumbsUp className="w-4 h-4 mr-2" />
                                  Accept Response
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Use this response in the lesson editor</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-6 bg-white dark:bg-gray-800 shadow-lg">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex gap-4">
          <div className="relative flex-1">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Describe your lesson plan needs..."
              className="pr-10"
            />
            <Sparkles className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-400" />
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-200 ease-in-out transform hover:scale-105"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Send your message to the AI</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </form>
      </div>

      <motion.div
        className="fixed bottom-20 right-6 bg-white dark:bg-gray-800 rounded-full shadow-lg p-2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <ChevronDown className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Scroll to bottom</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </motion.div>
    </div>
  );
}
