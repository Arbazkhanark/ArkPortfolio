'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const commands = {
  help: `Available commands:
  - about    : Learn more about me
  - skills   : View my technical skills
  - projects : See my featured projects
  - experience: View my work experience
  - contact  : Get my contact information
  - clear    : Clear the terminal
  - exit     : Return to main site`,
  
  about: `Arbaaz Khan - Software Engineer & Full Stack Developer

With 1+ years of experience building scalable applications,
I specialize in fullstack development, system design, and
seamless API integrations. I focus on performance,
maintainability, and solving real-world problems through code.

Location: New Delhi, India
Current Role: Software Engineer at Earnest Data Analytics`,

  skills: `Technical Skills:

Languages: JavaScript, TypeScript, Core Java, HTML/CSS
Frameworks & Libraries: React, Next.js, Node.js, Express
Databases: MongoDB, PostgreSQL, Redis
Tools & Technologies: Git, Docker, RabbitMQ, Postman
Computer Science: Data Structures, Algorithms, OOP, REST APIs`,

  projects: `Featured Projects:

1. Anime Merch E-Commerce Platform
   Full-stack e-commerce for anime merchandise sales
   Tech: Next.js, Node.js, MongoDB, Vercel

2. MuscleSharks Website
   E-commerce platform with comprehensive features
   Tech: React, Node.js, Express, MongoDB`,

  experience: `Work Experience:

1. Software Engineer - Earnest Data Analytics (April 2024 – Present)
   - Developed B2B products like E-RUPI, HRMS, and Vistaar
   - Built REST APIs with 20% reduction in response time
   - Created React frontends with lazy loading

2. Software Engineer Intern - Ansh Infotech (Oct 2023 – Mar 2024)
   - Built MuscleSharks e-commerce platform from scratch
   - Developed real-time analytics dashboards
   - Created secure REST APIs`,

  contact: `Contact Information:

Email: arbaazkhanark23@gmail.com
Phone: +91 8287817916
GitHub: github.com/Arbazkhanark
LinkedIn: linkedin.com/in/arbaz-khan-0bb1aa1a0
Location: New Delhi, India`,
};

export default function Terminal() {
  const [history, setHistory] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const welcomeMessage = `Arbaaz Khan — PORTFOLIO v2.0
Software Engineer | Full Stack Developer

Welcome to my interactive terminal!
Type 'help' to see available commands or 'about' to learn more about me.`;
    setHistory([welcomeMessage]);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (!trimmedCmd) return;

    // Add to command history for navigation
    if (trimmedCmd !== "clear" && trimmedCmd !== "exit") {
      setCommandHistory(prev => [...prev, cmd]);
    }

    setHistory((prev) => [...prev, `$ ${cmd}`]);

    if (trimmedCmd === "clear") {
      setHistory([]);
      setCurrentCommand("");
      return;
    }

    if (trimmedCmd === "exit") {
      window.location.href = "/";
      return;
    }

    if (trimmedCmd in commands) {
      const response = commands[trimmedCmd as keyof typeof commands];
      setHistory((prev) => [...prev, response]);
    } else {
      setHistory((prev) => [...prev, `Command not found: ${cmd}\nType 'help' for available commands.`]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(currentCommand);
    setCurrentCommand("");
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex] || "");
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Basic autocomplete
      const matchingCommand = Object.keys(commands).find(command => 
        command.startsWith(currentCommand.toLowerCase())
      );
      if (matchingCommand) {
        setCurrentCommand(matchingCommand);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 p-4 font-mono">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-4 flex items-center justify-between border-2 border-green-500 p-2 rounded">
          <span className="text-sm">arbaazkhan.vercel.app/terminal</span>
          <Button 
            size="sm" 
            variant="ghost" 
            asChild
            className="text-green-400 hover:text-red-500 hover:bg-transparent"
          >
            <Link href="/">
              <X className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div 
          ref={terminalRef}
          className="border-2 border-green-500 rounded p-4 h-[70vh] overflow-y-auto mb-4 bg-black/50 backdrop-blur-sm"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((line, index) => (
            <div key={index} className="whitespace-pre-wrap mb-2 leading-relaxed">
              {line}
            </div>
          ))}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
            <span className="text-green-400">$</span>
            <input
              ref={inputRef}
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none border-none text-green-400 caret-green-400 placeholder-green-400/50"
              placeholder="Type a command..."
              autoFocus
            />
          </form>
        </div>

        <div className="mt-4 text-xs text-green-400/60">
          Use ↑↓ for command history • Tab for autocomplete • Type &apos;help&apos; for commands
        </div>
      </div>
    </div>
  );
}