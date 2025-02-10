"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClassTable } from "../_components/classes/class-table";
import { CreateClassDialog } from "../_components/classes/create-class-dialog";


export default function ClassesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Classes</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Class
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <Input placeholder="Search classes..." className="max-w-sm" />
        <Button variant="outline">Search</Button>
      </div>
      <ClassTable />
      <CreateClassDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
}
