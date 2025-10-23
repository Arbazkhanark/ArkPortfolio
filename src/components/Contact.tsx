// 'use client';

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Github, Linkedin, Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";
// import { motion, useInView } from 'framer-motion';
// import { useRef, useState } from 'react';

// export const Contact = () => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });
  
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     // Simulate form submission
//     await new Promise(resolve => setTimeout(resolve, 2000));
    
//     // Reset form
//     setFormData({ name: '', email: '', message: '' });
//     setIsSubmitting(false);
//   };

//   const contactItems = [
//     {
//       icon: Mail,
//       label: "Email",
//       value: "arbaazkhanark23@gmail.com",
//       href: "mailto:arbaazkhanark23@gmail.com",
//       color: "text-blue-500 dark:text-blue-400"
//     },
//     {
//       icon: Phone,
//       label: "Phone",
//       value: "+91 8287817916",
//       href: "tel:+918287817916",
//       color: "text-green-500 dark:text-green-400"
//     },
//     {
//       icon: MapPin,
//       label: "Location",
//       value: "New Delhi, India",
//       href: "#",
//       color: "text-red-500 dark:text-red-400"
//     }
//   ];

//   const socialLinks = [
//     {
//       icon: Github,
//       href: "https://github.com/Arbazkhanark",
//       label: "GitHub",
//       color: "hover:bg-gray-900 hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-900"
//     },
//     {
//       icon: Linkedin,
//       href: "https://linkedin.com/in/arbaz-khan-0bb1aa1a0",
//       label: "LinkedIn",
//       color: "hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400"
//     }
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 12
//       }
//     }
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 15
//       }
//     }
//   };

//   const floatingAnimation = {
//     y: [0, -10, 0],
//     transition: {
//       duration: 3,
//       repeat: Infinity,
//       ease: "easeInOut"
//     }
//   };

//   return (
//     <section id="contact" className="py-20 px-4 bg-background" ref={ref}>
//       <div className="container mx-auto max-w-6xl">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
//           transition={{ duration: 0.8, type: "spring" }}
//           className="text-center mb-16"
//         >
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={isInView ? { scale: 1 } : { scale: 0 }}
//             transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
//             className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center"
//           >
//             <Mail className="w-10 h-10 text-white" />
//           </motion.div>
//           <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//             Get In Touch
//           </h2>
//           <motion.p 
//             className="text-lg text-muted-foreground max-w-2xl mx-auto"
//             initial={{ opacity: 0 }}
//             animate={isInView ? { opacity: 1 } : { opacity: 0 }}
//             transition={{ delay: 0.4 }}
//           >
//             Have a project in mind? Let&apos;s work together to build something amazing
//           </motion.p>
//         </motion.div>

//         <div className="grid lg:grid-cols-2 gap-12 items-start">
//           {/* Left Content - Contact Info */}
//           <motion.div 
//             variants={containerVariants}
//             initial="hidden"
//             animate={isInView ? "visible" : "hidden"}
//             className="space-y-8"
//           >
//             <motion.div 
//             // variants={itemVariants}
//             >
//               <h3 className="text-2xl font-bold mb-4 text-foreground">Let&apos;s Connect</h3>
//               <motion.p 
//                 className="text-muted-foreground mb-6 leading-relaxed"
//                 initial={{ opacity: 0 }}
//                 animate={isInView ? { opacity: 1 } : { opacity: 0 }}
//                 transition={{ delay: 0.6 }}
//               >
//                 I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions. 
//                 Send me a message and let&apos;s create something extraordinary together!
//               </motion.p>
//             </motion.div>

//             {/* Contact Items */}
//             <motion.div variants={containerVariants} className="space-y-6">
//               {contactItems.map((item, index) => (
//                 <motion.div
//                   key={item.label}
//                   // variants={itemVariants}
//                   custom={index}
//                   whileHover={{ 
//                     x: 10,
//                     scale: 1.02,
//                     transition: { type: "spring", stiffness: 300 }
//                   }}
//                   className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300 group cursor-pointer"
//                 >
//                   <motion.div
//                     // animate={floatingAnimation}
//                     className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform ${item.color}`}
//                   >
//                     <item.icon className="w-6 h-6" />
//                   </motion.div>
//                   <div className="flex-1">
//                     <p className="text-sm text-muted-foreground">{item.label}</p>
//                     <a 
//                       href={item.href} 
//                       className="text-foreground font-medium hover:text-primary transition-colors"
//                     >
//                       {item.value}
//                     </a>
//                   </div>
//                   <motion.div
//                     initial={{ opacity: 0, x: -10 }}
//                     whileHover={{ opacity: 1, x: 0 }}
//                     className="text-primary"
//                   >
//                     <ArrowRight className="w-4 h-4" />
//                   </motion.div>
//                 </motion.div>
//               ))}
//             </motion.div>

//             {/* Social Links */}
//             <motion.div 
//               // variants={itemVariants}
//               className="pt-6"
//             >
//               <p className="text-sm text-muted-foreground mb-4">Follow me on</p>
//               <div className="flex gap-3">
//                 {socialLinks.map((social, index) => (
//                   <motion.div
//                     key={social.label}
//                     initial={{ opacity: 0, scale: 0 }}
//                     animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
//                     transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
//                     whileHover={{ 
//                       scale: 1.1,
//                       y: -5
//                     }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <Button 
//                       size="icon" 
//                       variant="outline" 
//                       className={`rounded-xl w-12 h-12 transition-all duration-300 border-2 ${social.color}`}
//                       asChild
//                     >
//                       <a href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer">
//                         <social.icon className="w-5 h-5" />
//                       </a>
//                     </Button>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           </motion.div>

//           {/* Right Content - Contact Form */}
//           <motion.div 
//             // variants={cardVariants}
//             initial="hidden"
//             animate={isInView ? "visible" : "hidden"}
//             className="relative"
//           >
//             {/* Background Decoration */}
//             <motion.div
//               animate={{
//                 rotate: [0, 360],
//                 scale: [1, 1.1, 1]
//               }}
//               transition={{
//                 duration: 20,
//                 repeat: Infinity,
//                 ease: "linear"
//               }}
//               className="absolute -top-4 -right-4 -bottom-4 -left-4 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl blur-xl -z-10"
//             />
            
//             <motion.div
//               whileHover={{ 
//                 y: -5,
//                 boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.15)"
//               }}
//               transition={{ type: "spring", stiffness: 300 }}
//               className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-8 relative overflow-hidden"
//             >
//               {/* Animated Background Pattern */}
//               <motion.div
//                 animate={{
//                   x: [0, 100, 0],
//                   opacity: [0.03, 0.08, 0.03]
//                 }}
//                 transition={{
//                   duration: 10,
//                   repeat: Infinity,
//                   ease: "easeInOut"
//                 }}
//                 className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -z-10"
//               />
              
//               <h3 className="text-2xl font-bold mb-6 text-foreground">Send me a message</h3>
              
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <motion.div
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
//                   transition={{ delay: 0.3 }}
//                 >
//                   <label className="text-sm font-medium mb-2 block text-foreground">Name</label>
//                   <Input 
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     placeholder="Your name" 
//                     className="rounded-xl border-2 border-border focus:border-primary transition-colors h-12 bg-background"
//                     required
//                   />
//                 </motion.div>
                
//                 <motion.div
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
//                   transition={{ delay: 0.4 }}
//                 >
//                   <label className="text-sm font-medium mb-2 block text-foreground">Email</label>
//                   <Input 
//                     type="email" 
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     placeholder="your.email@example.com" 
//                     className="rounded-xl border-2 border-border focus:border-primary transition-colors h-12 bg-background"
//                     required
//                   />
//                 </motion.div>
                
//                 <motion.div
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
//                   transition={{ delay: 0.5 }}
//                 >
//                   <label className="text-sm font-medium mb-2 block text-foreground">Message</label>
//                   <Textarea 
//                     name="message"
//                     value={formData.message}
//                     onChange={handleInputChange}
//                     placeholder="Tell me about your project..." 
//                     rows={5} 
//                     className="rounded-xl border-2 border-border focus:border-primary transition-colors resize-none bg-background"
//                     required
//                   />
//                 </motion.div>
                
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
//                   transition={{ delay: 0.6 }}
//                 >
//                   <Button 
//                     type="submit" 
//                     className="w-full rounded-xl h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? (
//                       <motion.div
//                         animate={{ rotate: 360 }}
//                         transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                         className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
//                       />
//                     ) : (
//                       <>
//                         <span>Send Message</span>
//                         <motion.div
//                           initial={{ x: 0 }}
//                           whileHover={{ x: 5 }}
//                           transition={{ type: "spring", stiffness: 400 }}
//                         >
//                           <Send className="w-4 h-4 ml-2" />
//                         </motion.div>
//                       </>
//                     )}
//                   </Button>
//                 </motion.div>
//               </form>
              
//               {/* Success Message */}
//               {!formData.name && !formData.email && !formData.message && (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: 1 }}
//                   className="text-center mt-6"
//                 >
//                   <p className="text-sm text-muted-foreground">
//                     I typically respond within 24 hours
//                   </p>
//                 </motion.div>
//               )}
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };















'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const contactItems = [
    {
      icon: Mail,
      label: "Email",
      value: "arbaazkhanark23@gmail.com",
      href: "mailto:arbaazkhanark23@gmail.com",
      color: "text-blue-500 dark:text-blue-400"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 8287817916",
      href: "tel:+918287817916",
      color: "text-green-500 dark:text-green-400"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "New Delhi, India",
      href: "#",
      color: "text-red-500 dark:text-red-400"
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/Arbazkhanark",
      label: "GitHub",
      color: "hover:bg-gray-900 hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-900"
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/arbaz-khan-0bb1aa1a0",
      label: "LinkedIn",
      color: "hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section id="contact" className="py-20 px-4 bg-background" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center"
          >
            <Mail className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4 }}
          >
            Have a project in mind? Let&apos;s work together to build something amazing
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content - Contact Info */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.div 
            // variants={itemVariants}
            >
              <h3 className="text-2xl font-bold mb-4 text-foreground">Let&apos;s Connect</h3>
              <motion.p 
                className="text-muted-foreground mb-6 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.6 }}
              >
                I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions. 
                Send me a message and let&apos;s create something extraordinary together!
              </motion.p>
            </motion.div>

            {/* Contact Items */}
            <motion.div variants={containerVariants} className="space-y-6">
              {contactItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  // variants={itemVariants}
                  custom={index}
                  whileHover={{ 
                    x: 10,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300 group cursor-pointer"
                >
                  <motion.div
                    // animate={floatingAnimation}
                    className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform ${item.color}`}
                  >
                    <item.icon className="w-6 h-6" />
                  </motion.div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <a 
                      href={item.href} 
                      className="text-foreground font-medium hover:text-primary transition-colors"
                    >
                      {item.value}
                    </a>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="text-primary"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div 
              // variants={itemVariants}
              className="pt-6"
            >
              <p className="text-sm text-muted-foreground mb-4">Follow me on</p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={social.label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                    whileHover={{ 
                      scale: 1.1,
                      y: -5
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className={`rounded-xl w-12 h-12 transition-all duration-300 border-2 ${social.color}`}
                      asChild
                    >
                      <a href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer">
                        <social.icon className="w-5 h-5" />
                      </a>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Contact Form */}
          <motion.div 
            // variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            {/* Background Decoration */}
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -top-4 -right-4 -bottom-4 -left-4 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl blur-xl -z-10"
            />
            
            <motion.div
              whileHover={{ 
                y: -5,
                boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.15)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-8 relative overflow-hidden"
            >
              {/* Animated Background Pattern */}
              <motion.div
                animate={{
                  x: [0, 100, 0],
                  opacity: [0.03, 0.08, 0.03]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -z-10"
              />
              
              <h3 className="text-2xl font-bold mb-6 text-foreground">Send me a message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="text-sm font-medium mb-2 block text-foreground">Name</label>
                  <Input 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name" 
                    className="rounded-xl border-2 border-border focus:border-primary transition-colors h-12 bg-background"
                    required
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="text-sm font-medium mb-2 block text-foreground">Email</label>
                  <Input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com" 
                    className="rounded-xl border-2 border-border focus:border-primary transition-colors h-12 bg-background"
                    required
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="text-sm font-medium mb-2 block text-foreground">Message</label>
                  <Textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project..." 
                    rows={5} 
                    className="rounded-xl border-2 border-border focus:border-primary transition-colors resize-none bg-background"
                    required
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button 
                    type="submit" 
                    className="w-full rounded-xl h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <span>Send Message</span>
                        <motion.div
                          initial={{ x: 0 }}
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <Send className="w-4 h-4 ml-2" />
                        </motion.div>
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
              
              {/* Success Message */}
              {!formData.name && !formData.email && !formData.message && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 }}
                  className="text-center mt-6"
                >
                  <p className="text-sm text-muted-foreground">
                    I typically respond within 24 hours
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};











