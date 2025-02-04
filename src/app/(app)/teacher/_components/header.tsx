import { Bell, LogOut, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header() {
  const notificationCount = 5;
  return (
    <header className="border-black flex h-16 items-center justify-between border-b px-6">
      <div className="relative w-full max-w-md">
        <Search className="text-muted-foreground absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 transform" />
        <Input
          type="search"
          placeholder="Search..."
          className="bg-muted/50 pl-8"
        />
      </div>
      <div className="flex items-center gap-4 text-black">
        <Button variant="ghost" size="icon" className="relative ">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
              {notificationCount}
            </span>
          )}
        </Button>
        <Button variant="ghost" size="icon">
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
