import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle } from "lucide-react";

// Mock assignments data (in a real app, this would be fetched from an API)
const mockAssignments = [
  {
    id: "1",
    title: "Understanding React Hooks",
    dueDate: "2023-06-15",
    submissionCount: 10,
  },
  {
    id: "2",
    title: "Building a REST API",
    dueDate: "2023-06-22",
    submissionCount: 8,
  },
  {
    id: "3",
    title: "CSS Grid Layout",
    dueDate: "2023-06-29",
    submissionCount: 12,
  },
];

export default function AssignmentsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Assignments</h1>
        <Link href="/teacher/assignments/create" passHref>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Assignment
          </Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Submissions</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockAssignments.map((assignment) => (
            <TableRow key={assignment.id}>
              <TableCell>{assignment.title}</TableCell>
              <TableCell>{assignment.dueDate}</TableCell>
              <TableCell>{assignment.submissionCount}</TableCell>
              <TableCell>
                <Link
                  href={`/dashboard/assignments/review/${assignment.id}`}
                  passHref
                >
                  <Button variant="outline">Review</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
