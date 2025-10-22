'use client';

import { Target, Lightbulb, Rocket } from "lucide-react";
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const aboutCards = [
  {
    icon: Target,
    title: "Mission",
    description: "Code is poetry written for machines but read by humans.",
    color: "from-blue-500 to-cyan-500",
    delay: 0.1
  },
  {
    icon: Lightbulb,
    title: "Approach", 
    description: "I believe in writing clean, maintainable code and creating user-centric experiences that solve real problems.",
    color: "from-purple-500 to-pink-500",
    delay: 0.2
  },
  {
    icon: Rocket,
    title: "Goals",
    description: "Continuously learning and exploring new technologies while mentoring others and contributing to the developer community.",
    color: "from-orange-500 to-red-500",
    delay: 0.3
  }
];

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
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

  const floatingVariants = {
    floating: {
      y: [0, -15, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="about" className="py-20 px-4 relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-16 h-16 bg-purple-500/10 rounded-full blur-xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      
      <div className="container mx-auto relative z-10">
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
            About Me
          </motion.h2>
          <motion.p 
            // variants={titleVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            I&apos;m all about creating digital experiences that make a difference
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {aboutCards.map((card, index) => (
            <motion.div
              key={card.title}
              // variants={cardVariants}
              custom={index}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="text-center space-y-6 p-8 rounded-2xl bg-card/50 border border-border hover:border-primary/50 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Background Gradient on Hover */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={false}
              />
              
              {/* Animated Border */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'exclude',
                  WebkitMaskComposite: 'xor',
                  padding: '2px'
                }}
              />

              <motion.div
                // variants={floatingVariants}
                animate="floating"
                className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 relative"
              >
                <motion.div
                  // variants={iconVariants}
                  className={`p-3 rounded-xl bg-gradient-to-br ${card.color} text-white shadow-lg`}
                >
                  <card.icon className="w-6 h-6" />
                </motion.div>
                
                {/* Pulsing Ring */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-primary/30"
                  // variants={pulseVariants}
                  animate="pulse"
                />
              </motion.div>

              <motion.h3 
                className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {card.title}
              </motion.h3>

              <motion.p 
                className="text-muted-foreground leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {card.description}
              </motion.p>

              {/* Floating particles */}
              <motion.div
                className="absolute top-2 right-2 w-2 h-2 bg-primary/40 rounded-full"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
              />
              <motion.div
                className="absolute bottom-2 left-2 w-1 h-1 bg-purple-500/40 rounded-full"
                animate={{
                  y: [0, 8, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: index * 0.7,
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Animated Elements */}
        <motion.div
          className="flex justify-center items-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.div
            className="flex gap-2"
            animate={{
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {[1, 2, 3].map((dot) => (
              <motion.div
                key={dot}
                className="w-2 h-2 bg-primary rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: dot * 0.2,
                }}
              />
            ))}
          </motion.div>
          <motion.span 
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          >
            Always evolving, always learning
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
};