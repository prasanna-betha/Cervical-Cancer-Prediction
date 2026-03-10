import { Microscope, Brain, Layers, Database, Sparkles } from "lucide-react";

const techStack = [
  { icon: Brain, label: "CNN" },
  { icon: Layers, label: "Transfer Learning" },
  { icon: Database, label: "Deep Learning" },
  { icon: Sparkles, label: "Generative AI" },
];

export function Footer() {
  return (
    <footer id="about" className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Logo & Description */}
          <div className="flex flex-col items-center text-center mb-10">
            <a href="#home" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center">
                <Microscope className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">
                CerviCell<span className="text-medical-teal">AI</span>
              </span>
            </a>
            <p className="text-primary-foreground/70 max-w-md">
              An AI-powered cervical cell classification system designed to
              support early cancer detection through advanced deep learning
              technology.
            </p>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm"
              >
                <tech.icon className="w-4 h-4 text-medical-teal" />
                <span className="text-sm font-medium text-primary-foreground/80">
                  {tech.label}
                </span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-primary-foreground/10 mb-8" />

          {/* Footer Note */}
          <div className="text-center">
            <p className="text-sm text-primary-foreground/50">
              For academic and research purposes only.
            </p>
            <p className="text-sm text-primary-foreground/50 mt-2">
              © 2026 CerviCellAI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
