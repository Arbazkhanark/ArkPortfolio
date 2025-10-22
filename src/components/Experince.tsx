'use client';

import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, ArrowRight, Building2, Rocket } from "lucide-react";
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

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
    icon: Rocket,
    gradient: "from-blue-500 to-cyan-500",
    delay: 0.1
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
    icon: Building2,
    gradient: "from-purple-500 to-pink-500",
    delay: 0.2
  },
];

export const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const experienceCardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      x: 0
    },
    visible: { 
      opacity: 1, 
      y: 0,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hidden: { 
      scale: 0,
      rotate: -180 
    },
    visible: { 
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "backOut"
      }
    }
  };

  const tagVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 20
    },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "backOut"
      }
    })
  };

  const achievementVariants = {
    hidden: { 
      opacity: 0, 
      x: -20 
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.5 + i * 0.1,
        duration: 0.5
      }
    })
  };

  const floatingVariants = {
    floating: {
      y: [0, -8, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const timelineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="experience" className="py-20 px-4 bg-secondary/20 relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <motion.div
        className="absolute top-1/4 left-5 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-5 w-28 h-28 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2 
            // variants={titleVariants}
            className="text-4xl sm:text-5xl font-bold mb-4"
          >
            Professional Experience
          </motion.h2>
          <motion.p 
            // variants={titleVariants}
            className="text-lg text-muted-foreground"
          >
            My journey through the world of software development and innovation
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <motion.div 
          className="relative"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Vertical Timeline Line */}
          <motion.div
            // variants={timelineVariants}
            className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-purple-500 to-pink-500 transform origin-top"
            style={{ scaleY: 0 }}
          />
          
          <div className="space-y-12 relative">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                // variants={experienceCardVariants}
                custom={index}
                whileHover={{ 
                  y: -5,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="relative group"
              >
                {/* Timeline Dot */}
                <motion.div
                  // variants={iconVariants}
                  className="absolute left-0 top-6 w-12 h-12 rounded-full bg-background border-4 border-primary flex items-center justify-center z-10 shadow-lg"
                  whileHover={{ scale: 1.2 }}
                >
                  <motion.div
                    // variants={floatingVariants}
                    animate="floating"
                    className={`p-2 rounded-full bg-gradient-to-br ${exp.gradient} text-white`}
                  >
                    <exp.icon className="w-4 h-4" />
                  </motion.div>
                  
                  {/* Pulsing Ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary/30"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  />
                </motion.div>

                <div className="ml-20">
                  <div className="grid md:grid-cols-3 gap-6 p-8 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/10 relative overflow-hidden">
                    
                    {/* Shimmer Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.8 }}
                    />

                    {/* Left Column - Basic Info */}
                    <div className="space-y-4">
                      <motion.h3 
                        className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground bg-clip-text group-hover:from-primary group-hover:to-purple-600 transition-all duration-500"
                        whileHover={{ scale: 1.05 }}
                      >
                        {exp.title}
                      </motion.h3>
                      
                      <motion.div 
                        className="text-primary font-semibold text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        {exp.company}
                      </motion.div>

                      <div className="space-y-3">
                        <motion.div 
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                        >
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </motion.div>
                        <motion.div 
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          <Calendar className="w-4 h-4" />
                          <span>{exp.period}</span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Right Column - Details */}
                    <div className="md:col-span-2 space-y-6">
                      {/* Tags */}
                      <motion.div 
                        className="flex flex-wrap gap-2"
                        variants={containerVariants}
                      >
                        {exp.tags.map((tag, tagIndex) => (
                          <motion.div
                            key={tag}
                            custom={tagIndex}
                            // variants={tagVariants}
                          >
                            <Badge 
                              variant="outline" 
                              className="group-hover:border-primary/50 group-hover:bg-primary/5 transition-colors duration-300 backdrop-blur-sm"
                            >
                              {tag}
                            </Badge>
                          </motion.div>
                        ))}
                      </motion.div>

                      {/* Achievements */}
                      <div>
                        <motion.p 
                          className="font-semibold mb-4 text-lg flex items-center gap-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                        >
                          <span>Key Achievements</span>
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </motion.div>
                        </motion.p>
                        
                        <motion.ul 
                          className="space-y-3"
                          variants={containerVariants}
                        >
                          {exp.achievements.map((achievement, achievementIndex) => (
                            <motion.li 
                              key={achievementIndex}
                              custom={achievementIndex}
                              variants={achievementVariants}
                              className="flex items-start gap-3 text-sm text-muted-foreground group/achievement"
                              whileHover={{ x: 5 }}
                            >
                              <motion.span 
                                className="text-primary mt-1 flex-shrink-0"
                                whileHover={{ scale: 1.2 }}
                                transition={{ type: "spring", stiffness: 400 }}
                              >
                                ✓
                              </motion.span>
                              <motion.span
                                className="group-hover/achievement:text-foreground transition-colors duration-300"
                              >
                                {achievement}
                              </motion.span>
                            </motion.li>
                          ))}
                        </motion.ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Floating Call-to-Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all duration-300 group cursor-pointer"
          >
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🚀
            </motion.span>
            <span className="text-sm text-muted-foreground group-hover:text-foreground">
              Ready for the next challenge
            </span>
            <motion.div
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};