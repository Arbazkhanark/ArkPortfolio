// 'use client';

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { ExternalLink, Github } from "lucide-react";
// import { motion } from 'framer-motion';

// const projects = [
//   {
//     title: "Anime Merch E-Commerce Platform",
//     description: "A full-stack e-commerce application for anime merchandise sales with advanced features and admin dashboard.",
//     tags: ["Next.js", "Node.js", "MongoDB", "Vercel", "TypeScript"],
//     featured: true,
//     demoLink: "#",
//     githubLink: "#"
//   },
//   {
//     title: "MuscleSharks Website",
//     description: "E-commerce platform with comprehensive product catalog, order tracking, and seamless payment integration.",
//     tags: ["React", "Node.js", "Express", "MongoDB", "REST APIs"],
//     featured: true,
//     demoLink: "#",
//     githubLink: "#"
//   },
// ];

// export const Projects = () => {
//   return (
//     <section id="projects" className="py-20 px-4">
//       <div className="container mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl sm:text-5xl font-bold mb-4">Featured Projects</h2>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             A showcase of my recent work and the technologies I&apos;ve used to bring ideas to life
//           </p>
//         </motion.div>

//         <div className="grid md:grid-cols-2 gap-8 mb-12">
//           {projects.map((project, index) => (
//             <motion.div 
//               key={index}
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.2 }}
//               viewport={{ once: true }}
//               className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-all group"
//             >
//               <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center">
//                 <div className="text-6xl opacity-50">🛒</div>
//               </div>
//               <div className="p-6 space-y-4">
//                 {project.featured && (
//                   <Badge variant="secondary" className="gap-1">
//                     ⭐ Featured
//                   </Badge>
//                 )}
//                 <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
//                   {project.title}
//                 </h3>
//                 <p className="text-muted-foreground">{project.description}</p>
//                 <div className="flex flex-wrap gap-2">
//                   {project.tags.map((tag) => (
//                     <Badge key={tag} variant="outline">{tag}</Badge>
//                   ))}
//                 </div>
//                 <div className="flex gap-2 pt-2">
//                   <Button variant="outline" size="sm" className="gap-2">
//                     <Github className="w-4 h-4" />
//                     Code
//                   </Button>
//                   <Button size="sm" className="gap-2">
//                     <ExternalLink className="w-4 h-4" />
//                     Live Demo
//                   </Button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="text-center mt-12"
//         >
//           <Button variant="outline" size="lg">
//             View All Projects →
//           </Button>
//         </motion.div>
//       </div>
//     </section>
//   );
// };















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
    gradient: "from-blue-500/20 to-purple-600/20",
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
    gradient: "from-green-500/20 to-blue-600/20",
    delay: 0.2
  },
];

export const Projects = () => {
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

  const projectCardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { 
      scale: 1.2,
      opacity: 0 
    },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const tagVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8 
    },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.4
      }
    })
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      x: -20 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    }
  };

  const floatingVariants = {
    floating: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const shimmerVariants = {
    initial: { x: "-100%" },
    hover: {
      x: "100%",
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="projects" className="py-20 px-4 relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <motion.div
        className="absolute top-1/4 left-5 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl"
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
        className="absolute bottom-1/3 right-5 w-20 h-20 bg-purple-500/10 rounded-full blur-3xl"
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
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2 
            // variants={titleVariants}
            className="text-4xl sm:text-5xl font-bold mb-4"
          >
            Featured Projects
          </motion.h2>
          <motion.p 
            // variants={titleVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            A showcase of my recent work and the technologies I&apos;ve used to bring ideas to life
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              // variants={projectCardVariants}
              custom={index}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-lg -z-10"
                // variants={shimmerVariants}
                initial="initial"
                whileHover="hover"
              />
              
              <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/10 relative">
                {/* Animated Border Glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-500"
                />
                
                <div className="relative overflow-hidden">
                  <motion.div
                    // variants={imageVariants}
                    className={`aspect-video bg-gradient-to-br ${project.gradient} flex items-center justify-center relative`}
                  >
                    {/* Animated Background Pattern */}
                    <motion.div
                      className="absolute inset-0 opacity-10"
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      style={{
                        backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 0)`,
                        backgroundSize: '30px 30px',
                      }}
                    />
                    
                    <motion.div
                      // variants={floatingVariants}
                      animate="floating"
                      className="text-6xl opacity-70"
                    >
                      {project.emoji}
                    </motion.div>

                    {/* Hover Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                      whileHover={{ opacity: 1 }}
                    >
                      <motion.div
                        className="flex gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button variant="secondary" size="sm" className="gap-2 backdrop-blur-sm">
                            <ExternalLink className="w-4 h-4" />
                            Preview
                          </Button>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>

                <div className="p-6 space-y-4 relative">
                  {/* Featured Badge Animation */}
                  {project.featured && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                    >
                      <Badge variant="secondary" className="gap-1 group-hover:shadow-lg transition-shadow">
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          ⭐
                        </motion.div>
                        Featured
                      </Badge>
                    </motion.div>
                  )}

                  <motion.h3 
                    className="text-2xl font-bold group-hover:text-primary transition-colors bg-gradient-to-r from-foreground to-foreground bg-clip-text group-hover:from-primary group-hover:to-purple-600"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {project.title}
                  </motion.h3>

                  <motion.p 
                    className="text-muted-foreground leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    {project.description}
                  </motion.p>

                  <motion.div 
                    className="flex flex-wrap gap-2"
                    variants={containerVariants}
                  >
                    {project.tags.map((tag, tagIndex) => (
                      <motion.div
                        key={tag}
                        custom={tagIndex}
                        variants={tagVariants}
                      >
                        <Badge 
                          variant="outline" 
                          className="group-hover:border-primary/50 group-hover:bg-primary/5 transition-colors"
                        >
                          {tag}
                        </Badge>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div 
                    className="flex gap-2 pt-2"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div variants={buttonVariants}>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-2 group/btn"
                        // whileHover="hover"
                      >
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Github className="w-4 h-4" />
                        </motion.div>
                        Code
                      </Button>
                    </motion.div>
                    <motion.div variants={buttonVariants}>
                      <Button 
                        size="sm" 
                        className="gap-2 group/btn bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                        // whileHover="hover"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                        <motion.div
                          initial={{ x: 0 }}
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="outline" 
              size="lg" 
              className="gap-2 group relative overflow-hidden"
            >
              <span className="relative z-10">View All Projects</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="relative z-10"
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
              
              {/* Button Shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};