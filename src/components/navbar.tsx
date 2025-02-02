"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar({ url }: { url?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed w-full bg-cream/80 backdrop-blur-md z-50 border-b border-golden/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-brown rounded-full flex items-center justify-center">
              <span className="text-cream font-bold text-xl">L</span>
            </div>
            <span className="text-brown font-bold text-xl">LearnStar.AI</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-brown hover:text-golden transition-colors"
            >
              Features
            </Link>
            <Link
              href="/teacher"
              className="text-brown hover:text-golden transition-colors"
            >
              For Teachers
            </Link>
            <Link
              href="#pricing"
              className="text-brown hover:text-golden transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="text-brown hover:text-golden transition-colors"
            >
              Testimonials
            </Link>
            <Link
              href="#contact"
              className="text-brown hover:text-golden transition-colors"
            >
              Contact
            </Link>
            <Button asChild className="bg-golden hover:bg-golden/90 text-cream">
              <Link href={`${url as string}/get-started`}>Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-brown"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-4"
          >
            <div className="flex flex-col space-y-4">
              <Link
                href="#features"
                className="text-brown hover:text-golden transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/teacher"
                className="text-brown hover:text-golden transition-colors"
                onClick={() => setIsOpen(false)}
              >
                For Teachers
              </Link>
              <Link
                href="#pricing"
                className="text-brown hover:text-golden transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="#testimonials"
                className="text-brown hover:text-golden transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Testimonials
              </Link>
              <Link
                href="#contact"
                className="text-brown hover:text-golden transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Button
                asChild
                className="w-full bg-golden hover:bg-golden/90 text-cream"
                onClick={() => setIsOpen(false)}
              >
                <Link href={`${url as string}/get-started`}>Get Started</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
