'use client';

import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar } from "lucide-react";
import { motion } from 'framer-motion';

const experiences = [
  {
    title: "Software Engineer",
    company: "Earnest Data Analytics",
    location: "New Delhi, India",
    period: "April 2024 – Present",
    tags: ["React", "Node.js", "TypeScript", "MongoDB", "REST APIs", "Docker"],
    achievements: [
      "Developed B2B products like E-RUPI, HRMS, and Vistaar from ground up",
      "Built REST APIs from scratch with 20% reduction in response time",
      "Created React frontends with lazy loading (30% faster page loads)",
      "Integrated Bank APIs with zero downtime deployments",
      "Implemented comprehensive testing and CI/CD pipelines"
    ],
  },
  {
    title: "Software Engineer Intern",
    company: "Ansh Infotech",
    location: "New Delhi, India",
    period: "October 2023 – March 2024",
    tags: ["React", "Express", "MongoDB", "JavaScript", "CSS", "Git"],
    achievements: [
      "Built MuscleSharks e-commerce platform from scratch",
      "Developed real-time analytics dashboards for business intelligence",
      "Created secure REST APIs with authentication and authorization",
      "Implemented responsive designs and cross-browser compatibility",
      "Collaborated with design and product teams for feature development"
    ],
  },
];

export const Experience = () => {
  return (
    <section id="experience" className="py-20 px-4 bg-secondary/20">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Experience</h2>
          <p className="text-lg text-muted-foreground">
            My professional journey and the companies I&apos;ve had the privilege to work with
          </p>
        </motion.div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-6 p-6 bg-card border border-border rounded-lg hover:border-primary transition-all"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{exp.title}</h3>
                <div className="text-primary font-medium">
                  {exp.company}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{exp.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{exp.period}</span>
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.tags.map((tag) => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-semibold mb-2">Key Achievements:</p>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-1">✓</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};