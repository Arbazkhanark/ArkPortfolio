'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { motion } from 'framer-motion';

const projects = [
  {
    title: "Anime Merch E-Commerce Platform",
    description: "A full-stack e-commerce application for anime merchandise sales with advanced features and admin dashboard.",
    tags: ["Next.js", "Node.js", "MongoDB", "Vercel", "TypeScript"],
    featured: true,
    demoLink: "#",
    githubLink: "#"
  },
  {
    title: "MuscleSharks Website",
    description: "E-commerce platform with comprehensive product catalog, order tracking, and seamless payment integration.",
    tags: ["React", "Node.js", "Express", "MongoDB", "REST APIs"],
    featured: true,
    demoLink: "#",
    githubLink: "#"
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work and the technologies I&apos;ve used to bring ideas to life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-all group"
            >
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center">
                <div className="text-6xl opacity-50">🛒</div>
              </div>
              <div className="p-6 space-y-4">
                {project.featured && (
                  <Badge variant="secondary" className="gap-1">
                    ⭐ Featured
                  </Badge>
                )}
                <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Github className="w-4 h-4" />
                    Code
                  </Button>
                  <Button size="sm" className="gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg">
            View All Projects →
          </Button>
        </motion.div>
      </div>
    </section>
  );
};