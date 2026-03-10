const cellTypes = [
  {
    name: "Dyskeratotic",
    description:
      "Abnormal keratinized cells showing premature or atypical keratin formation, often indicating cellular dysplasia or precancerous changes.",
    color: "medical-pink",
    bgColor: "hsl(340 70% 96%)",
    textColor: "hsl(340 60% 35%)",
  },
  {
    name: "Koilocytotic",
    description:
      "Cells exhibiting perinuclear halo and nuclear abnormalities, commonly associated with HPV infection and potential cervical lesions.",
    color: "medical-purple",
    bgColor: "hsl(270 50% 95%)",
    textColor: "hsl(270 50% 45%)",
  },
  {
    name: "Metaplastic",
    description:
      "Squamous metaplastic cells representing normal transformation zone activity, showing intermediate characteristics between cell types.",
    color: "medical-blue",
    bgColor: "hsl(200 60% 95%)",
    textColor: "hsl(200 70% 45%)",
  },
  {
    name: "Parabasal",
    description:
      "Small round cells from the deeper epithelial layers, typically seen in atrophic conditions or during tissue regeneration.",
    color: "medical-orange",
    bgColor: "hsl(30 70% 95%)",
    textColor: "hsl(30 80% 40%)",
  },
  {
    name: "Superficial–Intermediate",
    description:
      "Normal mature squamous cells from the upper epithelial layers, representing healthy cervical tissue with proper maturation.",
    color: "medical-green",
    bgColor: "hsl(160 50% 95%)",
    textColor: "hsl(160 60% 35%)",
  },
];

export function CellTypesSection() {
  return (
    <section id="analysis" className="py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-medical-pink-light text-accent-foreground text-sm font-medium mb-4">
            Classification Types
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Cervical Cell Types
          </h2>
          <p className="text-muted-foreground text-lg">
            Our AI system accurately classifies cervical cells into five
            distinct categories for comprehensive analysis.
          </p>
        </div>

        {/* Cell Type Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {cellTypes.map((cell, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-border/50"
            >
              {/* Cell Type Badge */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
                style={{ backgroundColor: cell.bgColor }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: cell.textColor }}
                />
                <span
                  className="text-sm font-semibold"
                  style={{ color: cell.textColor }}
                >
                  {cell.name}
                </span>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                {cell.description}
              </p>

              {/* Decorative Element */}
              <div
                className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-full opacity-5 group-hover:opacity-10 transition-opacity"
                style={{ backgroundColor: cell.textColor }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
