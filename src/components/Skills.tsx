'use client';

import { Progress } from "@/components/ui/progress";
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const skillCategories = [
  {
    title: "Languages",
    skills: [
      { name: "JavaScript", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "Core Java", level: 75 },
      { name: "HTML/CSS", level: 90 },
    ],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "React", level: 85 },
      { name: "Next.js", level: 80 },
      { name: "Node.js", level: 82 },
      { name: "Express", level: 78 },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "MongoDB", level: 80 },
      { name: "PostgreSQL", level: 75 },
      { name: "Redis", level: 70 },
    ],
  },
  {
    title: "Tools & Technologies",
    skills: [
      { name: "Git", level: 85 },
      { name: "Docker", level: 65 },
      { name: "RabbitMQ", level: 70 },
      { name: "Postman", level: 88 },
    ],
  },
];

// Animated Progress Bar Component
const AnimatedProgress = ({ value, className }: { value: number; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: `${value}%` } : { width: 0 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        className="h-full bg-primary rounded-full relative overflow-hidden"
      >
        {/* Shimmer Effect */}
        <motion.div
          animate={{ x: ["0%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
      </motion.div>
    </div>
  );
};

export const Skills = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const categoryVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const skillItemVariants = {
    hidden: { 
      opacity: 0, 
      x: -20 
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: -20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="skills" className="py-20 px-4 bg-secondary/20" ref={containerRef}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Skills & Technologies
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Technologies I work with to build robust and scalable applications
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div 
              key={category.title}
              // variants={categoryVariants}
              className="space-y-4 p-6 rounded-lg bg-card/50 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <motion.h3 
                className="text-xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
                // variants={titleVariants}
              >
                {category.title}
              </motion.h3>
              
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div 
                    key={skill.name}
                    custom={skillIndex}
                    variants={skillItemVariants}
                    className="space-y-3 group"
                  >
                    <div className="flex justify-between items-center">
                      <motion.span 
                        className="text-sm font-medium group-hover:text-primary transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        {skill.name}
                      </motion.span>
                      <motion.span 
                        className="text-xs text-muted-foreground font-bold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 + skillIndex * 0.1 }}
                      >
                        {skill.level}%
                      </motion.span>
                    </div>
                    
                    <div className="relative">
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <AnimatedProgress value={skill.level} className="h-2" />
                      </div>
                      
                      {/* Pulse animation on complete */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={isInView ? { 
                          scale: [1, 1.2, 1], 
                          opacity: [0, 0.3, 0] 
                        } : {}}
                        transition={{ 
                          delay: 1.5 + skillIndex * 0.1,
                          duration: 0.8,
                          repeat: 0
                        }}
                        className="absolute inset-0 bg-primary rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating elements for visual interest */}
        <motion.div
          className="absolute top-1/4 left-10 w-4 h-4 bg-primary/20 rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-10 w-6 h-6 bg-purple-500/20 rounded-full"
          animate={{
            y: [0, 20, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>
    </section>
  );
};