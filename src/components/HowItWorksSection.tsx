import { Upload, Cpu, FileCheck } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Image",
    description:
      "Upload a microscopic cervical cell image in standard formats (PNG, JPG, TIFF).",
    color: "medical-teal",
  },
  {
    icon: Cpu,
    step: "02",
    title: "AI Analysis",
    description:
      "Our deep learning models analyze cellular features using advanced CNN architecture.",
    color: "medical-blue",
  },
  {
    icon: FileCheck,
    step: "03",
    title: "Get Results",
    description:
      "View predicted cell type classification and receive personalized health guidance.",
    color: "medical-green",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-medical-teal-light text-medical-teal text-sm font-medium mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg">
            Our streamlined workflow makes cervical cell analysis quick and
            accessible.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((item, index) => (
            <div
              key={index}
              className="relative group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-border to-transparent" />
              )}

              <div className="relative bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 group-hover:-translate-y-1">
                {/* Step Number */}
                <span className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground text-sm font-bold shadow-lg">
                  {item.step}
                </span>

                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-${item.color}-light flex items-center justify-center mb-6`}
                  style={{
                    backgroundColor:
                      item.color === "medical-teal"
                        ? "hsl(175 50% 95%)"
                        : item.color === "medical-blue"
                          ? "hsl(200 60% 95%)"
                          : "hsl(160 50% 95%)",
                  }}
                >
                  <item.icon
                    className="w-8 h-8"
                    style={{
                      color:
                        item.color === "medical-teal"
                          ? "hsl(175 60% 40%)"
                          : item.color === "medical-blue"
                            ? "hsl(200 70% 50%)"
                            : "hsl(160 60% 45%)",
                    }}
                  />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
