"use client"
import Link from 'next/link';
import { Home, User, Briefcase, BookOpen, Mail, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Navigation = () => {
  const [imgError, setImgError] = useState(false);
  const githubAvatar = "https://avatars.githubusercontent.com/u/79525841?v=4";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm overflow-hidden">
              {!imgError ? (
                <img
                  src={githubAvatar}
                  alt="Arbaaz Khan"
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                "AK"
              )}
            </div>
            <span className="text-lg font-bold hidden sm:block">Arbaaz Khan</span>
          </Link>

          <div className="flex items-center gap-1 sm:gap-2">
            <Button variant="ghost" size="sm" asChild className="gap-2">
              <Link href="#home">
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="gap-2">
              <Link href="#about">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">About</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="gap-2">
              <Link href="#projects">
                <Briefcase className="w-4 h-4" />
                <span className="hidden sm:inline">Projects</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="gap-2">
              <Link href="#blog">
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Blog</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="gap-2">
              <Link href="#contact">
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">Contact</span>
              </Link>
            </Button>
            <Button size="sm" asChild className="gap-2 ml-2">
              <Link href="/terminal">
                <Terminal className="w-4 h-4" />
                <span className="hidden sm:inline">Terminal Mode</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
