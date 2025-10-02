'use client';

import { Mail, Download, Eye, MapPin, Briefcase, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";

// ------------------ Meteor Component -------------------
const Meteor = ({ delay, left }: { delay: number; left: number }) => {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: "100vh", opacity: [0, 1, 0] }}
      transition={{
        duration: 3,
        delay,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: Math.random() * 4,
      }}
      className="absolute w-1 h-16 bg-gradient-to-b from-gray-400/80 to-transparent rounded-full blur-[1px]"
      style={{ left: `${left}%` }}
    />
  );
};

// ------------------ Hero Section -------------------
export const Hero = () => {
  const [meteors, setMeteors] = useState<number[]>([]);

  useEffect(() => {
    // Generate 15 meteors randomly
    setMeteors(Array.from({ length: 15 }, (_, i) => i));
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 px-4 overflow-hidden bg-white">
      {/* Meteors Background */}
      <div className="absolute inset-0 pointer-events-none">
        {meteors.map((m) => (
          <Meteor key={m} delay={Math.random() * 5} left={Math.random() * 100} />
        ))}
      </div>

      {/* Main Content */}
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-gray-900"
          >
            <p className="text-muted-foreground text-lg">Hello, I&apos;m</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
              Arbaaz Khan
            </h1>
            <h2 className="text-3xl sm:text-4xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-bold">
              Software Engineer | Full Stack Developer
            </h2>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              1+ years of experience as a Full-Stack Developer with expertise in building scalable and high-performance web applications.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2">
                <Download className="w-5 h-5" />
                Download Resume
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Eye className="w-5 h-5" />
                View Resume Online
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>New Delhi, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>1+ years experience</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>Software Engineer at Earnest Data Analytics</span>
              </div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="bg-card border border-border rounded-lg overflow-hidden shadow-lg">
              <div className="bg-secondary px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-sm text-muted-foreground ml-2">ArbaazKhan.json</span>
              </div>
              <div className="p-6 font-mono text-sm text-gray-900">
                <pre>
{`{
  "name": "Arbaaz Khan",
  "title": "Software Engineer | Full Stack Developer",
  "location": "New Delhi, India",
  "experience": "1+ years",
  "skills": [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "MongoDB"
  ],
  "currentStatus": "Software Engineer at Earnest Data Analytics"
}`}
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};