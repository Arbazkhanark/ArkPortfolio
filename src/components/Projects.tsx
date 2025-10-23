'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowRight, Sparkles } from "lucide-react";
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const projects = [
  {
    title: "Anime Merch E-Commerce Platform",
    description: "A full-stack e-commerce application for anime merchandise sales with advanced features and admin dashboard.",
    tags: ["Next.js", "Node.js", "MongoDB", "Vercel", "TypeScript"],
    featured: true,
    demoLink: "#",
    githubLink: "#",
    emoji: "🛒",
    gradient: "from-green-500/20 to-blue-500/20",
    delay: 0.1
  },
  {
    title: "MuscleSharks Website",
    description: "E-commerce platform with comprehensive product catalog, order tracking, and seamless payment integration.",
    tags: ["React", "Node.js", "Express", "MongoDB", "REST APIs"],
    featured: true,
    demoLink: "#",
    githubLink: "#",
    emoji: "💪",
    gradient: "from-green-500/20 to-blue-500/20",
    delay: 0.2
  },
];

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="projects" className="py-8 px-4 bg-blue-50 dark:bg-blue-950/20 relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <motion.div
        className="absolute top-1/4 left-5 w-24 h-24 bg-green-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-5 w-20 h-20 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold mb-2">Featured Projects</h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work and the technologies I&apos;ve used to bring ideas to life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ 
                y: -5,
              }}
              className="group relative"
            >
              <div className="bg-white dark:bg-gray-900 border border-green-500/10 rounded-xl overflow-hidden hover:border-green-500/30 transition-all duration-300 group-hover:shadow-md relative">
                <div className="relative overflow-hidden">
                  <motion.div
                    className={`aspect-video bg-gradient-to-br ${project.gradient} flex items-center justify-center relative`}
                  >
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="text-4xl opacity-70"
                    >
                      {project.emoji}
                    </motion.div>

                    {/* Hover Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                      whileHover={{ opacity: 1 }}
                    >
                      <motion.div
                        className="flex gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Button variant="secondary" size="sm" className="gap-1 backdrop-blur-sm text-xs">
                          <ExternalLink className="w-3 h-3" />
                          Preview
                        </Button>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>

                <div className="p-4 space-y-3 relative">
                  {/* Featured Badge */}
                  {project.featured && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <Badge className="gap-1 bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20 text-xs">
                        <motion.div
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          ⭐
                        </motion.div>
                        Featured
                      </Badge>
                    </motion.div>
                  )}

                  <h3 className="text-lg font-bold group-hover:text-green-600 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag, tagIndex) => (
                      <motion.div
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + tagIndex * 0.05 }}
                      >
                        <Badge 
                          className="text-xs bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20 group-hover:border-green-500/40"
                        >
                          {tag}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-1 text-xs h-8"
                    >
                      <Github className="w-3 h-3" />
                      Code
                    </Button>
                    <Button 
                      size="sm" 
                      className="gap-1 text-xs h-8 bg-green-600 hover:bg-green-700"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Live Demo
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Motivation Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-green-500/5 to-blue-500/5 border border-green-500/20 rounded-lg p-4 mb-4">
            <h3 className="text-base font-bold mb-1">Building Real Solutions</h3>
            <p className="text-muted-foreground text-xs mb-2">
              Creating practical applications that solve real-world problems
            </p>
            <div className="flex justify-center gap-4 text-xs">
              <div className="text-center">
                <div className="text-lg font-bold text-green-500">2</div>
                <div className="text-muted-foreground">Featured</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-500">5+</div>
                <div className="text-muted-foreground">Technologies</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-yellow-500">100%</div>
                <div className="text-muted-foreground">Functional</div>
              </div>
            </div>
          </div>

          <Button 
            variant="outline" 
            size="lg" 
            className="gap-2 border-green-500/20 hover:border-green-500/40"
          >
            <span>View All Projects</span>
            <motion.div
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};