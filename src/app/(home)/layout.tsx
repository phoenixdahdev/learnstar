import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { cn } from "@/utils";
import { Space_Grotesk } from "next/font/google";

const space = Space_Grotesk({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-space_grotesk",
});

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={cn(space.className)}>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
