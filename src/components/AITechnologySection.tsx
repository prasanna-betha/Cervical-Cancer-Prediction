import { Brain, Layers, Database, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "CNN-Based Feature Extraction",
    description:
      "Advanced Convolutional Neural Networks automatically extract meaningful features from microscopic cell images for accurate classification.",
    color: "hsl(175 60% 40%)",
    bgColor: "hsl(175 50% 95%)",
  },
  {
    icon: Layers,
    title: "Transfer Learning",
    description:
      "Pre-trained models on large datasets are fine-tuned for cervical cell analysis, enabling high accuracy with optimized training.",
    color: "hsl(200 70% 50%)",
    bgColor: "hsl(200 60% 95%)",
  },
  {
    icon: Database,
    title: "Quality Dataset",
    description:
      "Clean and balanced medical image dataset ensures unbiased training and reliable predictions across all cell types.",
    color: "hsl(160 60% 45%)",
    bgColor: "hsl(160 50% 95%)",
  },
  {
    icon: BarChart3,
    title: "High-Accuracy Models",
    description:
      "State-of-the-art deep learning architectures achieve exceptional accuracy rates in cervical cell classification tasks.",
    color: "hsl(270 50% 55%)",
    bgColor: "hsl(270 50% 95%)",
  },
];

export function AITechnologySection() {
  return (
    <section id="model-info" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-medical-blue-light text-medical-blue text-sm font-medium mb-4">
            Technology
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Powered by AI Technology
          </h2>
          <p className="text-muted-foreground text-lg">
            Cutting-edge deep learning techniques ensure accurate and reliable
            cervical cell analysis.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex gap-5 bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 group"
            >
              {/* Icon */}
              <div
                className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{ backgroundColor: feature.bgColor }}
              >
                <feature.icon
                  className="w-7 h-7"
                  style={{ color: feature.color }}
                />
              </div>

              {/* Content */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
