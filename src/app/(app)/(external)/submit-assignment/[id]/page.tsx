/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock assignment data (in a real app, this would be fetched from an API)
const mockAssignment = {
  id: "1",
  title: "Understanding React Hooks",
  description: "Complete the following questions about React Hooks.",
  submissionType: "multiple_choice",
  questions: [
    {
      type: "multiple_choice",
      question: "Which hook is used for side effects in React?",
      options: ["useState", "useEffect", "useContext", "useReducer"],
    },
    {
      type: "text",
      question: "Explain the purpose of the useCallback hook.",
    },
  ],
};

// {
//   params,
// }: {
//   params: { id: string };
// })
export default function SubmitAssignmentPage() {
  const router = useRouter();
  const [studentName, setStudentName] = useState("");
  const [answers, setAnswers] = useState<Array<string | File>>([]);
  const [file, setFile] = useState<File | null>(null);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log("Assignment submitted:", { studentName, answers, file });
    // Navigate to a confirmation page
    router.push("/submit-assignment/confirmation");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Submit Assignment: {mockAssignment.title}
      </h1>
      <p className="mb-4">{mockAssignment.description}</p>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="studentName">Your Name</Label>
            <Input
              id="studentName"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              required
            />
          </div>
          {mockAssignment.submissionType === "file" ? (
            <div>
              <Label htmlFor="file">Upload File</Label>
              <Input
                id="file"
                type="file"
                onChange={handleFileChange}
                required
              />
            </div>
          ) : (
            mockAssignment.questions.map((question, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{question.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  {question.type === "multiple_choice" ? (
                    <RadioGroup
                      onValueChange={(value) =>
                        handleAnswerChange(index, value)
                      }
                    >
                      {question.options?.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={option}
                            id={`q${index}-option${optionIndex}`}
                          />
                          <Label htmlFor={`q${index}-option${optionIndex}`}>
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  ) : (
                    <Textarea
                      value={(answers[index] as string) || ""}
                      onChange={(e) =>
                        handleAnswerChange(index, e.target.value)
                      }
                      placeholder="Enter your answer"
                    />
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
        <Button type="submit" className="mt-6">
          Submit Assignment
        </Button>
      </form>
    </div>
  );
}
