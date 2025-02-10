"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle, Trash2 } from "lucide-react";

export default function CreateAssignmentPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [submissionType, setSubmissionType] = useState("file");
  const [questions, setQuestions] = useState<
    Array<{ type: string; question: string; options?: string[] }>
  >([]);

  const addQuestion = (type: string) => {
    setQuestions([
      ...questions,
      {
        type,
        question: "",
        options: type === "multiple_choice" ? [""] : undefined,
      },
    ]);
  };

  const updateQuestion = (index: number, field: string, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setQuestions(updatedQuestions);
  };

  const addOption = (questionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options?.push("");
    setQuestions(updatedQuestions);
  };

  const updateOption = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[questionIndex].options) {
      updatedQuestions[questionIndex].options![optionIndex] = value;
      setQuestions(updatedQuestions);
    }
  };

  const removeQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log("Assignment created:", {
      title,
      description,
      dueDate,
      submissionType,
      questions,
    });
    // Navigate to the assignments list page
    router.push("/dashboard/assignments");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create New Assignment</h1>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Assignment Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="submissionType">Submission Type</Label>
            <Select value={submissionType} onValueChange={setSubmissionType}>
              <SelectTrigger>
                <SelectValue placeholder="Select submission type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="file">File Upload</SelectItem>
                <SelectItem value="text">Text Submission</SelectItem>
                <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {submissionType !== "file" && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Questions</h2>
              {questions.map((question, index) => (
                <Card key={index} className="mb-4">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Question {index + 1}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={question.question}
                      onChange={(e) =>
                        updateQuestion(index, "question", e.target.value)
                      }
                      placeholder="Enter your question"
                      className="mb-2"
                    />
                    {question.type === "multiple_choice" && (
                      <div className="space-y-2">
                        {question.options?.map((option, optionIndex) => (
                          <Input
                            key={optionIndex}
                            value={option}
                            onChange={(e) =>
                              updateOption(index, optionIndex, e.target.value)
                            }
                            placeholder={`Option ${optionIndex + 1}`}
                          />
                        ))}
                        <Button
                          type="button"
                          onClick={() => addOption(index)}
                          size="sm"
                        >
                          Add Option
                        </Button>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="button"
                      onClick={() => removeQuestion(index)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove Question
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              <div className="flex space-x-2">
                <Button
                  type="button"
                  onClick={() => addQuestion("text")}
                  variant="outline"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Text Question
                </Button>
                <Button
                  type="button"
                  onClick={() => addQuestion("multiple_choice")}
                  variant="outline"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Multiple Choice Question
                </Button>
              </div>
            </div>
          )}
        </div>
        <Button type="submit" className="mt-6">
          Create Assignment
        </Button>
      </form>
    </div>
  );
}
