/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  GraduationCap,
  Users,
  Calendar,
  FileText,
  HelpCircle,
  ChevronDown,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import { cn } from "@/utils";
import { CustomAvatar } from "../ui/custom-avatar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CustomTooltip } from "../ui/custom-tooltip";
import { useSession } from "next-auth/react";

const navigation = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/teacher/dashboard",
  },
  {
    title: "Students",
    icon: Users,
    href: "/teacher/students",
  },
  {
    title: "Classes",
    icon: GraduationCap,
    href: "/teacher/classes",
  },
  {
    title: "Assignments",
    icon: FileText,
    href: "/teacher/assignments",
  },
  {
    title: "Calendar",
    icon: Calendar,
    href: "/teacher/calendar",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/teacher/settings",
  },
];

const organizations = [
  { id: "1", name: "John Doe Org", email: "johndoe@reavsuite.com" },
  { id: "2", name: "Personal Org", email: "personal@reavsuite.com" },
];

const users = [
  { id: "1", name: "John Doe", email: "johndoe@reavsuite.com" },
  { id: "2", name: "Jane Doe", email: "janedoe@reavsuite.com" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const { data } = useSession();

  return (
    <div
      className={cn(
        "bg-card flex h-screen flex-col border-r border-black transition-all duration-300 text-black",
        isCollapsed ? "w-[80px]" : "w-[280px]"
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center gap-2 border-b border-black px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full">
          LA
        </div>
        {!isCollapsed && (
          <span className="text-lg font-semibold">LearnStar.ai</span>
        )}
      </div>

      {/* Organization Select */}
      {/* <div className="p-4">
        {isCollapsed ? (
          <CustomTooltip content={data?.user.name as string}>
            <CustomAvatar
              initials={
                data?.user.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase() || "JD"
              }
              size="md"
            />
          </CustomTooltip>
        ) : (
          <Select defaultValue={organizations[0].id}>
            <SelectTrigger className="w-full">
              <div className="flex items-center gap-2">
                <CustomAvatar initials="JD" size="sm" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Organizations</SelectLabel>
                {organizations.map((org) => (
                  <SelectItem key={org.id} value={org.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{org.name}</span>
                      <span className="text-muted-foreground text-xs">
                        {org.email}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </div> */}

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2 flex flex-col">
        {navigation.map((item) => (
          <CustomTooltip key={item.href} content={item.title} side="right">
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent/50 hover:text-accent-foreground",
                isCollapsed && "justify-center"
              )}
            >
              <item.icon className="h-4 w-4" />
              {!isCollapsed && <span>{item.title}</span>}
            </Link>
          </CustomTooltip>
        ))}
      </nav>

      {/* User Select */}
      <div className="border-border/40 border-t p-4">
        {isCollapsed ? (
          <CustomTooltip content={data?.user.name as string}>
            <CustomAvatar
              initials={
                data?.user.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase() || "JD"
              }
              size="md"
            />
          </CustomTooltip>
        ) : (
          <Select defaultValue={users[0].id}>
            <SelectTrigger className="w-full">
              <div className="flex items-center gap-2">
                <CustomAvatar initials="JD" size="sm" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Users</SelectLabel>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-muted-foreground text-xs">
                        {user.email}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="border-border/40 text-muted-foreground hover:bg-accent hover:text-accent-foreground flex h-10 items-center justify-center border-t"
      >
        <CustomTooltip
          content={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          side="right"
        >
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              isCollapsed ? "rotate-90" : "-rotate-90"
            )}
          />
        </CustomTooltip>
      </button>
    </div>
  );
}
