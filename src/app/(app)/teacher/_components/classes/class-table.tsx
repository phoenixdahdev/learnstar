import { Video } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const classes = [
  {
    id: 1,
    name: "Advanced Mathematics",
    schedule: "Mon, Wed, Fri 10:00 AM",
    students: 25,
    meetLink: "https://meet.google.com/abc-defg-hij",
  },
  {
    id: 2,
    name: "Physics 101",
    schedule: "Tue, Thu 2:00 PM",
    students: 30,
    meetLink: "https://meet.google.com/klm-nopq-rst",
  },
  {
    id: 3,
    name: "English Literature",
    schedule: "Mon, Wed 1:00 PM",
    students: 22,
    meetLink: "https://meet.google.com/uvw-xyza-bcd",
  },
  {
    id: 4,
    name: "Chemistry Lab",
    schedule: "Fri 3:00 PM",
    students: 18,
    meetLink: "https://meet.google.com/efg-hijk-lmn",
  },
  {
    id: 5,
    name: "World History",
    schedule: "Tue, Thu 11:00 AM",
    students: 28,
    meetLink: "https://meet.google.com/opq-rstu-vwx",
  },
];

export function ClassTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Class Name</TableHead>
          <TableHead>Schedule</TableHead>
          <TableHead>Students</TableHead>
          <TableHead>Google Meet</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {classes.map((class_) => (
          <TableRow key={class_.id}>
            <TableCell className="font-medium">{class_.name}</TableCell>
            <TableCell>{class_.schedule}</TableCell>
            <TableCell>{class_.students}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm" asChild>
                <a
                  href={class_.meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Video className="mr-2 h-4 w-4" />
                  Join Meet
                </a>
              </Button>
            </TableCell>
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
