import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Upload, PlayCircle, Shield, Target, Clock } from "lucide-react";

const trustIndicators = [
  { icon: Shield, label: "Medical AI Powered" },
  { icon: Target, label: "High Accuracy" },
  { icon: Clock, label: "Early Detection" },
];

export function HeroSection() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHowItWorksClick = () => {
    const sectionId = "how-it-works";

    // If already on home page, scroll directly
    if (location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", "/#how-it-works");
      }
    } else {
      // If on another page, navigate to home page with hash
      navigate("/#how-it-works");
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-medical-teal/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-medical-pink/10 rounded-full blur-3xl animate-pulse-soft delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-medical-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-medical-teal-light border border-medical-teal/20 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-medical-teal animate-pulse" />
            <span className="text-sm font-medium text-medical-teal">
              Advanced AI-Powered Analysis
            </span>
          </div>

          {/* Heading */}
          <h1
            className="text-4xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Deep Learning Framework for{" "}
            <span className="text-gradient">Cervical Cancer Prediction</span> and
            Personalized Health Recommendations using GenAI
          </h1>

          {/* Description */}
          <p
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            An AI-powered system that analyzes cervical cell images using
            advanced deep learning techniques to support early cancer detection
            and provide personalized health guidance.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Button
              variant="hero-outline"
              size="xl"
              onClick={handleHowItWorksClick}
            >
              <PlayCircle className="w-5 h-5" />
              How It Works
            </Button>

            <Button
              variant="hero"
              size="xl"
              onClick={() => navigate("/analysis")}
            >
              <Upload className="w-5 h-5" />
              Predict
            </Button>
          </div>

          {/* Trust Indicators */}
          <div
            className="flex flex-wrap items-center justify-center gap-6 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            {trustIndicators.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card shadow-card"
              >
                <item.icon className="w-4 h-4 text-medical-teal" />
                <span className="text-sm font-medium text-muted-foreground">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Medical Elements */}
        <div className="absolute bottom-10 left-1/4 animate-float opacity-20">
          <div className="w-20 h-20 rounded-2xl border-2 border-medical-teal/30 rotate-12" />
        </div>
        <div
          className="absolute top-1/3 right-1/6 animate-float opacity-20"
          style={{ animationDelay: "1s" }}
        >
          <div className="w-16 h-16 rounded-full border-2 border-medical-pink/30" />
        </div>
      </div>
    </section>
  );
}