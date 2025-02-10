import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const students = [
  {
    id: 1,
    name: "Sofia Davis",
    email: "sofia.davis@example.com",
    class: "10A",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Ethan Wilson",
    email: "ethan.wilson@example.com",
    class: "11B",
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Olivia Martinez",
    email: "olivia.martinez@example.com",
    class: "9C",
    avatar: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Liam Johnson",
    email: "liam.johnson@example.com",
    class: "12A",
    avatar: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Ava Brown",
    email: "ava.brown@example.com",
    class: "10B",
    avatar: "/placeholder.svg",
  },
];

export function StudentTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Student</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Class</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.id}>
            <TableCell className="font-medium">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={student.avatar} alt={student.name} />
                  <AvatarFallback>
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span>{student.name}</span>
              </div>
            </TableCell>
            <TableCell>{student.email}</TableCell>
            <TableCell>{student.class}</TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm">
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
