"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type NavigationProps = {
  user?: null | { id: string };
};

import Image from "next/image";

// Arvian Logo Image
const ArvianLogo = () => (
  <Image
    src="/assets/arvion-logo.png"
    alt="Arvian Logo"
    width={40}
    height={40}
    className="rounded-lg object-contain"
    unoptimized
  />
);

const Navigation = ({ user }: NavigationProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "About", href: "#about" },
    { label: "Docs", href: "#" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3"
          : "py-5"
      }`}
    >
      <div
        className={`max-w-6xl mx-auto px-6 flex items-center justify-between rounded-2xl transition-all duration-500 ${
          scrolled
            ? "bg-[#080818]/90 backdrop-blur-xl border border-white/8 shadow-xl shadow-black/30 py-3"
            : "bg-transparent py-0"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <ArvianLogo />
          <span className="text-lg font-bold text-white tracking-tight">
            Arvian<span className="text-indigo-400">.</span>
          </span>
        </Link>

        {/* Center Nav — pill style */}
        <nav className="hidden md:flex items-center gap-1 px-2 py-1 rounded-xl bg-white/5 border border-white/8 backdrop-blur-sm">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-4 py-1.5 text-sm text-zinc-400 hover:text-white hover:bg-white/8 rounded-lg transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link href="/agency" className="text-sm text-zinc-400 hover:text-white transition-colors">
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/agency/sign-in" />
            </>
          ) : (
            <>
              <Link
                href="/agency/sign-in"
                className="hidden md:block text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/agency"
                className="text-sm font-semibold text-white px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 transition-all duration-200 shadow-lg shadow-indigo-500/20"
              >
                Get Started →
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
