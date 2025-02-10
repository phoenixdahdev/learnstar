import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StudentTable } from "../_components/students/student-table";

export default function StudentsPage() {
  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Students</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <Input placeholder="Search students..." className="max-w-sm" />
        <Button variant="outline">Search</Button>
      </div>
      <StudentTable />
    </div>
  );
}
