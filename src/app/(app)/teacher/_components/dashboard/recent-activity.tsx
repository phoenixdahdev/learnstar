import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const activities = [
  {
    id: 1,
    user: "Sarah Chen",
    action: "submitted assignment",
    subject: "Advanced Mathematics",
    time: "2 minutes ago",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    user: "James Wilson",
    action: "asked a question",
    subject: "Physics Lab",
    time: "10 minutes ago",
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    user: "Emma Davis",
    action: "turned in project",
    subject: "Chemistry",
    time: "25 minutes ago",
    avatar: "/placeholder.svg",
  },
  {
    id: 4,
    user: "Michael Brown",
    action: "joined class",
    subject: "Biology",
    time: "1 hour ago",
    avatar: "/placeholder.svg",
  },
];

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.avatar} alt={activity.user} />
            <AvatarFallback>{activity.user[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.user}</p>
            <p className="text-sm text-muted-foreground">
              {activity.action} in {activity.subject}
            </p>
          </div>
          <div className="ml-auto font-medium text-sm text-muted-foreground">
            {activity.time}
          </div>
        </div>
      ))}
    </div>
  );
}
