"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowLeft } from "lucide-react";

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
];

interface PageNavbarProps {
  /** The currently active route to highlight in nav */
  activeRoute?: string;
}

export function PageNavbar({ activeRoute }: PageNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="border-border/50 bg-background/70 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <Image
              src="/getgains-logo.png"
              alt="Get Gains"
              width={160}
              height={40}
              className="h-10 w-auto transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks
              .filter((link) => link.href !== activeRoute)
              .map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="bg-primary hover:bg-primary-hover text-primary-foreground hover:shadow-primary/30 hidden items-center gap-2 rounded-full px-6 py-2.5 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg sm:inline-flex"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="text-foreground md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-border/50 mt-4 flex flex-col gap-4 border-t pt-4 md:hidden">
            {navLinks
              .filter((link) => link.href !== activeRoute)
              .map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            <Link
              href="/"
              className="bg-primary text-primary-foreground inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-center font-semibold transition-all duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
