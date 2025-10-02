import { Target, Lightbulb, Rocket } from "lucide-react";

export const About = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I&apos;m all about creating digital experiences that make a difference
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="text-center space-y-4 p-6 rounded-lg bg-card/50 border border-border hover:border-primary transition-all">
            <div className="inline-flex p-4 rounded-full bg-primary/10">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">Mission</h3>
            <p className="text-muted-foreground">
              Code is poetry written for machines but read by humans.
            </p>
          </div>

          <div className="text-center space-y-4 p-6 rounded-lg bg-card/50 border border-border hover:border-primary transition-all">
            <div className="inline-flex p-4 rounded-full bg-primary/10">
              <Lightbulb className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">Approach</h3>
            <p className="text-muted-foreground">
              I believe in writing clean, maintainable code and creating user-centric experiences that solve real problems.
            </p>
          </div>

          <div className="text-center space-y-4 p-6 rounded-lg bg-card/50 border border-border hover:border-primary transition-all">
            <div className="inline-flex p-4 rounded-full bg-primary/10">
              <Rocket className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">Goals</h3>
            <p className="text-muted-foreground">
              Continuously learning and exploring new technologies while mentoring others and contributing to the developer community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};