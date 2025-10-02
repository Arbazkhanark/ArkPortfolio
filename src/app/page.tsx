import { About } from "@/components/About";
import { Blog } from "@/components/Blog";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experince";
import { GitHubActivity } from "@/components/GithubActivity";
import { Hero } from "@/components/Hero";
import { LeetCodeActivity } from "@/components/LeetCodeActivity";
import { Navigation } from "@/components/Navigation";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Blog />
      <LeetCodeActivity />
      <GitHubActivity />
      <Contact />
      
      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Arbaaz Khan. Built with ❤️ using Next.js, Tailwind CSS, and Framer Motion.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <a 
              href="https://github.com/Arbazkhanark" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              GitHub
            </a>
            <a 
              href="https://linkedin.com/in/arbaz-khan-0bb1aa1a0" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              LinkedIn
            </a>
            <a 
              href="mailto:arbaazkhanark23@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}