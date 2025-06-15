"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SiDailydotdev } from "react-icons/si";
import { motion } from "motion/react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <motion.header
      initial={{
        y: "-100%",
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.7,
          ease: "easeOut",
        },
      }}
      className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex flex-shrink-0 items-center">
            <Link href={"/"}>
              <h1 className="flex gap-2 text-xl font-bold text-emerald-600">
                <SiDailydotdev className="size-7 text-emerald-700" />
                <span>DevSage</span>
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden space-x-8 md:flex">
            <a
              href="#features"
              className="hover:text-primary text-sm font-medium text-slate-600"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="hover:text-primary text-sm font-medium text-slate-600"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="hover:text-primary text-sm font-medium text-slate-600"
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="hover:text-primary text-sm font-medium text-slate-600"
            >
              FAQ
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden items-center space-x-4 md:flex">
            <Link href={"/sign-in"}>
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href={"/sign-up"}>
              <Button className="rounded-full !px-4 !py-2 font-semibold">
                Get started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:text-indigo-600"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out md:hidden",
          mobileMenuOpen ? "max-h-screen" : "max-h-0",
        )}
      >
        <div className="space-y-2 border-t border-gray-100 bg-white px-4 pt-2 pb-4">
          <a
            href="#features"
            className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-indigo-600"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-indigo-600"
          >
            How It Works
          </a>
          <a
            href="#testimonials"
            className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-indigo-600"
          >
            Testimonials
          </a>
          <a
            href="#pricing"
            className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-indigo-600"
          >
            Pricing
          </a>
          <a
            href="#faq"
            className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-indigo-600"
          >
            FAQ
          </a>
          <div className="flex flex-col gap-2 pt-2">
            <Link href={"/sign-in"}>
              <Button variant={"outline"} className="w-full">
                Log in
              </Button>
            </Link>
            <Link href={"/sign-up"}>
              <Button className="w-full">Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
