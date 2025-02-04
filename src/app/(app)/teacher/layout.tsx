import { Sidebar } from "@/components/teacher/teacher-sidebar";
import { Header } from "./_components/header";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-screen min-h-screen w-full text-white sm:overflow-clip text-black">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <div className="flex-1 pl-2">{children}</div>
      </div>
    </div>
  );
}
