import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="relative max-w-4xl mx-auto">
          {/* Background Card */}
          <div className="relative bg-gradient-hero rounded-3xl p-12 md:p-16 overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl" />

            {/* Content */}
            <div className="relative text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
                <span className="text-sm font-medium text-primary-foreground">
                  Free to Use
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
                Ready to Analyze Cervical Cell Images?
              </h2>

              <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto mb-10">
                Start using our AI-powered analysis system today. Upload your
                first image and experience the future of medical diagnostics.
              </p>

              <Button
                variant="secondary"
                size="xl"
                className="group shadow-xl hover:shadow-2xl bg-white text-medical-teal hover:bg-white/90"
              >
                Start Analysis — It's Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
