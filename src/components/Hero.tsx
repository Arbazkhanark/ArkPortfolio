// components/Hero.tsx
'use client';

import { Mail, Download, Eye, MapPin, Briefcase, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { ParticleBackground } from "./ParticleBackground";

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleDownload = () => {
    // Add your resume download logic here
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // Update with your resume path
    link.download = 'Arbaaz_Khan_Resume.pdf';
    link.click();
  };

  const handleViewResume = () => {
    // Add your resume view logic here
    window.open('/resume.pdf', '_blank');
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 px-4 overflow-hidden bg-background">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Main Content */}
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-foreground"
          >
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg"
            >
              Hello, I&apos;m
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold"
            >
              Arbaaz Khan
            </motion.h1>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl sm:text-4xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-bold"
            >
              Software Engineer | Full Stack Developer
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-muted-foreground max-w-xl leading-relaxed"
            >
              1+ years of experience as a Full-Stack Developer with expertise in building scalable and high-performance web applications.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="gap-2" onClick={handleDownload}>
                <Download className="w-5 h-5" />
                Download Resume
              </Button>
              <Button size="lg" variant="outline" className="gap-2" onClick={handleViewResume}>
                <Eye className="w-5 h-5" />
                View Resume Online
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-6 pt-4 text-sm text-muted-foreground"
            >
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
            </motion.div>
          </motion.div>

          {/* Right Content - JSON Viewer */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="bg-card border border-border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <div className="bg-secondary px-4 py-2 flex items-center gap-2 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-sm text-muted-foreground ml-2">ArbaazKhan.json</span>
              </div>
              <div className="p-6 font-mono text-sm">
                <pre className="text-foreground">
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

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-muted-foreground">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-border rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-primary rounded-full mt-2"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};