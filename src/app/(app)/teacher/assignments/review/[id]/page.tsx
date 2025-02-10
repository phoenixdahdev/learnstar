"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock submitted assignments data (in a real app, this would be fetched from an API)
const mockSubmissions = [
  {
    id: "1",
    studentName: "Alice Johnson",
    submissionDate: "2023-06-01",
    answers: [
      "useEffect",
      "useCallback is used to memoize functions to prevent unnecessary re-renders.",
    ],
    file: null,
  },
  {
    id: "2",
    studentName: "Bob Smith",
    submissionDate: "2023-06-02",
    answers: [
      "useState",
      "useCallback helps in optimizing performance by caching function definitions.",
    ],
    file: null,
  },
];

export default function ReviewAssignmentPage() {
  const [feedback, setFeedback] = useState<{ [key: string]: string }>({});
  const [grades, setGrades] = useState<{ [key: string]: string }>({});

  const handleFeedbackChange = (submissionId: string, value: string) => {
    setFeedback({ ...feedback, [submissionId]: value });
  };

  const handleGradeChange = (submissionId: string, value: string) => {
    setGrades({ ...grades, [submissionId]: value });
  };

  const handleSubmit = (submissionId: string) => {
    // Here you would typically send this data to your backend
    console.log("Feedback submitted:", {
      submissionId,
      feedback: feedback[submissionId],
      grade: grades[submissionId],
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Review Assignments</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student Name</TableHead>
            <TableHead>Submission Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockSubmissions.map((submission) => (
            <TableRow key={submission.id}>
              <TableCell>{submission.studentName}</TableCell>
              <TableCell>{submission.submissionDate}</TableCell>
              <TableCell>
                <Button
                  onClick={() =>
                    document
                      .getElementById(`submission-${submission.id}`)
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Review
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {mockSubmissions.map((submission) => (
        <Card
          key={submission.id}
          id={`submission-${submission.id}`}
          className="mt-8"
        >
          <CardHeader>
            <CardTitle>{submission.studentName}&apos;s Submission</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold mb-2">Answers:</h3>
            {submission.answers.map((answer, index) => (
              <p key={index} className="mb-2">
                <span className="font-medium">Question {index + 1}:</span>{" "}
                {answer}
              </p>
            ))}
            <div className="mt-4">
              <Label htmlFor={`feedback-${submission.id}`}>Feedback</Label>
              <Textarea
                id={`feedback-${submission.id}`}
                value={feedback[submission.id] || ""}
                onChange={(e) =>
                  handleFeedbackChange(submission.id, e.target.value)
                }
                placeholder="Enter your feedback"
              />
            </div>
            <div className="mt-4">
              <Label htmlFor={`grade-${submission.id}`}>Grade</Label>
              <Input
                id={`grade-${submission.id}`}
                value={grades[submission.id] || ""}
                onChange={(e) =>
                  handleGradeChange(submission.id, e.target.value)
                }
                placeholder="Enter grade"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleSubmit(submission.id)}>
              Submit Feedback
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
