"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Search,
  Download,
  Loader2,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface StudentReport {
  id: string;
  name: string;
  class: string;
  term: string;
  session: string;
  overallGrade: string;
  position: string;
  attendance: {
    present: number;
    total: number;
  };
  subjects: {
    name: string;
    score: number;
    grade: string;
    teacherComment: string;
  }[];
  classTeacherComment: string;
  principalComment: string;
  nextTerm: string;
  recommendations: string[];
}

export default function DigitalResults() {
  const [studentId, setStudentId] = useState("");
  const [report, setReport] = useState<StudentReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/digital-results`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentId }),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        setReport(null);
      } else {
        setReport(data.result);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while fetching the report.");
    } finally {
      setIsLoading(false);
    }
  };

  const generatePDF = () => {
    if (!report) return;

    const doc = new jsPDF();

    // School Header
    doc.setFontSize(20);
    doc.text("LearnStar Academy", 105, 15, { align: "center" });
    doc.setFontSize(12);
    doc.text("Terminal Report Sheet", 105, 25, { align: "center" });

    // Student Information
    doc.setFontSize(10);
    doc.text(`Name: ${report.name}`, 20, 40);
    doc.text(`Class: ${report.class}`, 20, 45);
    doc.text(`Term: ${report.term}`, 20, 50);
    doc.text(`Session: ${report.session}`, 20, 55);
    doc.text(`Position: ${report.position}`, 120, 40);
    doc.text(
      `Attendance: ${report.attendance.present}/${report.attendance.total}`,
      120,
      45
    );
    doc.text(`Overall Grade: ${report.overallGrade}`, 120, 50);

    // Subjects Table
    autoTable(doc, {
      startY: 65,
      head: [["Subject", "Score", "Grade", "Teacher's Comment"]],
      body: report.subjects.map((subject) => [
        subject.name,
        subject.score,
        subject.grade,
        subject.teacherComment,
      ]),
      styles: { fontSize: 8 },
    });

    // Comments Section
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.text("Class Teacher's Comment:", 20, finalY);
    doc.text(report.classTeacherComment, 20, finalY + 5);

    doc.text("Principal's Comment:", 20, finalY + 15);
    doc.text(report.principalComment, 20, finalY + 20);

    doc.text("Next Term Begins:", 20, finalY + 30);
    doc.text(report.nextTerm, 20, finalY + 35);

    // Save the PDF
    doc.save(`${report.name}_${report.term}_Report.pdf`);
  };

  return (
    <>
      <Link href="/#digital-results">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Digital Results
        </Button>
      </Link>

      <Card className="max-w-5xl mx-auto bg-white/50 backdrop-blur-xs shadow-xl">
        <div className="border-b border-golden/20 p-4">
          <h1 className="text-2xl font-semibold text-brown mb-2">
            Digital Student Results
          </h1>
          <p className="text-brown/60">
            Enter a student ID to view and download their report
          </p>
        </div>

        <div className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <Input
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="Enter Student ID (Try: STU001, STU002, STU003, STU004, or STU005)"
              className="flex-1"
            />
            <Button
              type="submit"
              className="bg-golden hover:bg-golden/90 text-cream"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </form>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-sm"
            >
              {error}
            </motion.div>
          )}

          {report && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Header Information */}
              <div className="bg-white rounded-lg p-6 border border-golden/20">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-brown">
                      {report.name}
                    </h2>
                    <p className="text-brown/60">Class: {report.class}</p>
                    <p className="text-brown/60">Term: {report.term}</p>
                    <p className="text-brown/60">Session: {report.session}</p>
                    <p className="text-brown/60">Position: {report.position}</p>
                    <p className="text-brown/60">
                      Attendance: {report.attendance.present}/
                      {report.attendance.total} days
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="inline-block bg-golden/10 rounded-lg p-4">
                      <p className="text-lg font-semibold text-brown">
                        Overall Grade
                      </p>
                      <p className="text-5xl font-bold text-golden">
                        {report.overallGrade}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Academic Performance */}
              <div className="bg-white rounded-lg p-6 border border-golden/20">
                <h3 className="text-xl font-semibold text-brown mb-4">
                  Academic Performance
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-brown">
                    <thead className="text-xs uppercase bg-golden/10">
                      <tr>
                        <th className="px-6 py-3">Subject</th>
                        <th className="px-6 py-3">Score</th>
                        <th className="px-6 py-3">Grade</th>
                        <th className="px-6 py-3">Teacher&apos;s Comment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {report.subjects.map((subject, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-6 py-4 font-medium">
                            {subject.name}
                          </td>
                          <td className="px-6 py-4">{subject.score}</td>
                          <td className="px-6 py-4">{subject.grade}</td>
                          <td className="px-6 py-4">
                            {subject.teacherComment}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Comments Section */}
              <div className="bg-white rounded-lg p-6 border border-golden/20">
                <h3 className="text-xl font-semibold text-brown mb-4">
                  Comments
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-brown">
                      Class Teacher&apos;s Comment:
                    </p>
                    <p className="text-brown/80">
                      {report.classTeacherComment}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-brown">
                      Principal&apos;s Comment:
                    </p>
                    <p className="text-brown/80">{report.principalComment}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-brown">
                      Next Term Begins:
                    </p>
                    <p className="text-brown/80">{report.nextTerm}</p>
                  </div>
                </div>
              </div>

              {/* AI Recommendations */}
              <div className="bg-white rounded-lg p-6 border border-golden/20">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-6 w-6 text-golden" />
                  <h3 className="text-xl font-semibold text-brown">
                    AI Learning Recommendations
                  </h3>
                </div>
                <div className="space-y-4">
                  {report.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-1">
                        <BookOpen className="h-5 w-5 text-golden" />
                      </div>
                      <p className="text-brown/80">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={generatePDF}
                  className="bg-golden hover:bg-golden/90 text-cream"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF Report
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </Card>
    </>
  );
}
