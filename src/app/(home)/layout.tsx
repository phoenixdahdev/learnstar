import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { cn, ROOT_DOMAIN, inDevEnvironment } from "@/utils";
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
      <Navbar
        url={
          inDevEnvironment
            ? `http://app.${ROOT_DOMAIN}`
            : `https://app.${ROOT_DOMAIN}`
        }
      />
      {children}
      <Footer />
    </main>
  );
}
