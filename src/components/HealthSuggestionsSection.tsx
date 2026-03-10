import { useState } from "react";
import { Dumbbell, UtensilsCrossed, MapPin, AlertCircle } from "lucide-react";
import { GynecologistFinderDialog } from "@/components/GynecologistFinderDialog";

const suggestions = [
  {
    icon: Dumbbell,
    title: "Exercise Plans",
    description:
      "Custom exercise routines with YouTube-based video guidance tailored to support cervical health and overall wellness.",
    color: "hsl(175 60% 40%)",
    bgColor: "hsl(175 50% 95%)",
  },
  {
    icon: UtensilsCrossed,
    title: "Diet Charts",
    description:
      "AI-generated personalized nutrition plans focusing on foods that support immune function and cervical health.",
    color: "hsl(175 60% 40%)",
    bgColor: "hsl(175 50% 95%)",
  },
  {
    icon: MapPin,
    title: "Find Gynecologists",
    description:
      "Location-based recommendations for nearby certified gynecologists for professional consultation and follow-up care.",
    color: "hsl(200 70% 50%)",
    bgColor: "hsl(200 60% 95%)",
    isInteractive: true,
  },
];

export function HealthSuggestionsSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="health-suggestions" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-card text-accent-foreground text-sm font-medium mb-4 shadow-sm">
            Generative AI
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Personalized Health Suggestions
          </h2>
          <p className="text-muted-foreground text-lg">
            After analysis, receive AI-generated personalized recommendations to
            support your health journey.
          </p>
        </div>

        {/* Suggestions Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-10">
          {suggestions.map((item, index) => {
            const CardContent = (
              <div
                className={`bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 text-center h-full ${item.isInteractive
                  ? "cursor-pointer ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  : ""
                  }`}
              >
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: item.bgColor }}
                >
                  <item.icon className="w-8 h-8" style={{ color: item.color }} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );

            if (item.isInteractive) {
              return (
                <GynecologistFinderDialog
                  key={index}
                  trigger={CardContent}
                  isOpen={isOpen}
                  onOpenChange={setIsOpen}
                />
              );
            }

            return <div key={index}>{CardContent}</div>;
          })}
        </div>

        {/* Disclaimer */}
        <div className="max-w-2xl mx-auto">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border/50">
            <AlertCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Disclaimer:</span> The health
              suggestions provided are for informational purposes only and are
              not a substitute for professional medical advice. Please consult a
              healthcare provider for proper diagnosis and treatment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
