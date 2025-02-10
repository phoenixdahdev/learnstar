import { Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const classes = [
  {
    id: 1,
    subject: "Advanced Mathematics",
    time: "09:00 AM",
    duration: "1h 30m",
    room: "Room 301",
    status: "upcoming",
  },
  {
    id: 2,
    subject: "Physics Lab",
    time: "11:00 AM",
    duration: "2h",
    room: "Lab 2B",
    status: "upcoming",
  },
  {
    id: 3,
    subject: "Chemistry",
    time: "02:00 PM",
    duration: "1h",
    room: "Room 405",
    status: "upcoming",
  },
];

export function UpcomingClasses() {
  return (
    <div className="space-y-4">
      {classes.map((class_) => (
        <Card key={class_.id}>
          <CardContent className="flex items-center p-4">
            <Clock className="h-4 w-4 text-muted-foreground mr-2" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                {class_.subject}
              </p>
              <p className="text-sm text-muted-foreground">
                {class_.time} • {class_.duration} • {class_.room}
              </p>
            </div>
            <Badge variant="secondary">{class_.status}</Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
