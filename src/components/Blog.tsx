'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { motion } from 'framer-motion';

const blogPosts = [
  {
    title: "AI Is Your Coding Partner, Not a Competitor",
    excerpt: "How embracing AI tools can make you a faster, smarter, and more creative developer",
    date: "6/20/2025",
    readTime: "4 min read",
    tags: ["AI", "Tech"],
  },
  {
    title: "Building Scalable React Applications: Lessons from...",
    excerpt: "After working on multiple large-scale React applications, I&apos;ve learned valuable lessons about architecture,…",
    date: "1/15/2024",
    readTime: "8 min read",
    tags: ["React", "Architecture", "Performance"],
  },
  {
    title: "The Future of Web3 Development: What to Expect in 2025",
    excerpt: "Exploring emerging web3 trends, new frameworks, and technologies that will shape web3 development in the comin…",
    date: "1/10/2024",
    readTime: "6 min read",
    tags: ["Web3 Dev", "Blockchain", "Ethereum"],
  },
];

export const Blog = () => {
  return (
    <section id="blog" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Latest Blog Posts</h2>
          <p className="text-lg text-muted-foreground">
            Thoughts on web development, programming best practices, and lessons learned
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-all group"
            >
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center">
                <div className="text-5xl opacity-50">
                  {index === 0 ? "🤖" : index === 1 ? "⚛️" : "⛓️"}
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>

                <Button variant="link" className="p-0 h-auto text-primary">
                  Read more →
                </Button>
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
          <Button size="lg">
            View All Posts →
          </Button>
        </motion.div>
      </div>
    </section>
  );
};