import { useMemo, useState } from "react";
import {
  CheckCircle2,
  AlertCircle,
  Utensils,
  Youtube,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import HealthyEmoji from "./healthyEmoji.png";

interface ResultsSectionProps {
  result: {
    class: string;
    confidence: number;
    suggestions?: {
      diet: string[];
      exercise: string[];
      video_topics: string[];
      disclaimer: string;
    };
  };
  // lets Analysis.tsx know whether "View More" is opened (to show doctor image)
  onViewMoreToggle?: (open: boolean) => void;
}

export function ResultsSection({ result, onViewMoreToggle }: ResultsSectionProps) {
  const [showMore, setShowMore] = useState(false);

  // Normalize label from backend
  const normalizedClass = useMemo(() => {
    return (result.class || "")
      .trim()
      .replace(/^im[_\s-]*/i, "")
      .replace(/[–—]/g, "-")
      .toLowerCase();
  }, [result.class]);

  // Superficial-Intermediate = No cancer, remaining 4 = Abnormal (Cancer)
  const isNoCancer = normalizedClass === "superficial-intermediate";
  const isCancer = !isNoCancer;

  const suggestions = result.suggestions;
  const videoTopics = suggestions?.video_topics || [];

  // Stage + class + description mapping
  const cancerInfoMap: Record<
    string,
    { stage: string; displayClass: string; description: string }
  > = {
    parabasal: {
      stage: "Stage 1",
      displayClass: "Parabasal",
      description:
        "Parabasal cells may indicate early abnormal changes in cervical cells. It is recommended to confirm with clinical tests advised by a specialist.",
    },
    metaplastic: {
      stage: "Stage 2",
      displayClass: "Metaplastic",
      description:
        "Metaplastic changes mean the cervical cells are transforming in pattern. If persistent, further screening is advised for proper evaluation.",
    },
    koilocytotic: {
      stage: "Stage 3",
      displayClass: "Koilocytotic",
      description:
        "Koilocytotic cells are often linked with HPV-related changes. Medical follow-up is important to understand the risk level and next steps.",
    },
    dyskeratotic: {
      stage: "Stage 4",
      displayClass: "Dyskeratotic",
      description:
        "Dyskeratotic cells show strong abnormal patterns. Please consult a gynecologist for confirmation and appropriate next actions.",
    },
  };

  const cancerInfo = cancerInfoMap[normalizedClass];

  // Guidance rules:
  // - For superficial (no cancer): NEVER show guidance
  // - For cancer classes: show guidance ONLY when "View More" is open
  const shouldShowGuidance = !!suggestions && isCancer && showMore;

  // After Analyze:
  // - DO NOT show class name immediately
  // - show class name only when View More is open
  const displayTitle = showMore ? result.class : isNoCancer ? "Normal Cells" : "Abnormal Cells";

  // Professional (less alarming) summary message shown only BEFORE view more
  const summaryText = isNoCancer
    ? "Normal findings detected. Click “View More” to see the identified class."
    : "Abnormal findings detected. Click “View More” to see the detected class, stage, and details.";

  return (
    <div
      id="results"
      className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700"
    >
      {/* Top Analysis Summary Card */}
      <Card className="p-6 sm:p-7 overflow-hidden relative border-border/50 shadow-lg bg-card/50 backdrop-blur-sm">
        <div className="flex flex-col gap-6">
          {/* Header Row */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-full ${
                  isNoCancer ? "bg-medical-green/10" : "bg-medical-pink/10"
                } flex items-center justify-center`}
              >
                {isNoCancer ? (
                  <CheckCircle2 className="w-5 h-5 text-medical-green" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-medical-pink" />
                )}
              </div>
              <div className="leading-tight">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Analysis Complete
                </div>
                {/* <div className="text-[11px] text-muted-foreground">
                  Results shown for clinical support (screening)
                </div> */}
              </div>
            </div>

            {/* Hospital-style status badge (bolder + clean) */}
            <Badge
              variant="outline"
              className={`rounded-full px-5 py-2 text-[15px] font-extrabold border-[3px] shadow-sm ${
                isNoCancer
                  ? "bg-medical-green/10 text-medical-green border-medical-green/35"
                  : "bg-medical-pink/10 text-medical-pink border-medical-pink/35"
              }`}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`w-3 h-3 rounded-full ${
                    isNoCancer ? "bg-medical-green" : "bg-medical-pink"
                  } animate-pulse`}
                />
                {isNoCancer ? "No Cancer Detected" : "Cancer Detected"}
              </span>
            </Badge>
          </div>

          {/* Main Title + Summary + View More */}
          <div className="space-y-4">
            {/* Visual hierarchy: big headline */}
            <h3 className="text-4xl sm:text-4xl font-bold tracking-tight text-foreground">
              {displayTitle}
            </h3>

            {/* Instruction only before View More */}
            {!showMore && (
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                {summaryText}
              </p>
            )}

            {/* Actions */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => {
                  setShowMore((v) => {
                    const next = !v;
                    onViewMoreToggle?.(next);
                    return next;
                  });
                }}
                className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 font-semibold border hover:bg-muted transition"
              >
                {showMore ? "Hide" : "View More"}
              </button>

              {/* Details Panel (View More) */}
              {showMore && (
                <div className="mt-5 rounded-2xl border border-border/60 bg-muted/15 p-5 sm:p-6 space-y-4">
                 {isNoCancer ? (
                        <>
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="text-sm font-semibold text-foreground/80">
                              Identified Class
                            </span>
                            <span className="px-3 py-1 rounded-full text-sm font-bold bg-medical-green/10 text-medical-green border border-medical-green/20">
                              Superficial-Intermediate
                            </span>
                          </div>

                          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                            Superficial-Intermediate cells are normal cells commonly found in the cervix.
                            This means your cervical cells look healthy and no abnormal changes were detected.
                          </p>

                          <div className="rounded-2xl border border-medical-green/20 bg-medical-green/5 p-5 text-center">
                            <div className="flex flex-col items-center justify-center gap-3">
                              <img
                                src={HealthyEmoji}
                                alt="Healthy result emoji"
                                className="w-16 h-16 object-contain"
                              />
                              <h4 className="text-lg font-bold text-medical-green">
                                You’re doing well!
                              </h4>
                              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
                                Your result indicates normal cervical cells. Keep maintaining a healthy
                                lifestyle and continue regular medical checkups for preventive care.
                              </p>
                            </div>
                          </div>
                        </>
                      ) : (
                    <>
                      {/* Priority 1: Stage */}
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-sm font-semibold text-foreground/80">
                          Estimated Stage
                        </span>
                        <span className="px-3 py-1 rounded-full text-sm font-bold bg-medical-pink/10 text-medical-pink border border-medical-pink/20">
                          {cancerInfo?.stage ?? "Stage not mapped"}
                        </span>
                      </div>

                      {/* Priority 2: Detected class (chip) */}
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-sm font-semibold text-foreground/80">
                          Detected Class
                        </span>
                        <span className="px-3 py-1 rounded-full text-sm font-bold bg-medical-pink/10 text-medical-pink border border-medical-pink/20">
                          {cancerInfo?.displayClass ?? result.class}
                        </span>
                      </div>

                      {/* Priority 3: Description */}
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {cancerInfo?.description ??
                          "Description not available for this class. Please consult a specialist for clinical interpretation."}
                      </p>

                      {/* Recommendation (Suggestion #1) */}
                      <div className="rounded-xl border border-border/60 bg-background/60 p-4">
                        <p className="text-sm sm:text-base font-semibold text-foreground">
                          Recommendation
                        </p>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-1">
                          Please consult a gynecologist for confirmation and further evaluation.
                        </p>
                      </div>

                      
                      {/* <p className="text-[11px] sm:text-xs text-muted-foreground italic">
                        This is an AI-based screening result and not a final diagnosis.
                      </p> */}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Background Accent */}
        <div
          className={`absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-10 ${
            isNoCancer ? "bg-medical-teal" : "bg-medical-pink"
          }`}
        />
      </Card>

      {/* ✅ AI Guidance Card (FULL - unchanged content) */}
      {shouldShowGuidance && (
        <Card className="border-border/50 shadow-lg overflow-hidden bg-white/50 dark:bg-card/50">
          <div className="p-0">
            <Tabs defaultValue="diet" className="w-full">
              <div className="px-6 pt-6 border-b border-border/40">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-medical-teal" />
                  <div>
                    <h4 className="font-bold text-lg leading-tight text-foreground">
                      AI-Powered Guidance
                    </h4>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                      Tailored to {result.class} findings
                    </p>
                  </div>
                </div>

                <TabsList className="bg-muted/30 p-1 rounded-xl w-full justify-start gap-1 overflow-x-auto h-auto">
                  <TabsTrigger
                    value="diet"
                    className="rounded-lg py-2.5 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-medical-teal"
                  >
                    Dietary Guidance
                  </TabsTrigger>

                  <TabsTrigger
                    value="videos"
                    className="rounded-lg py-2.5 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-red-500"
                  >
                    Exercise Videos
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
                <TabsContent value="diet" className="p-6 mt-0">
                  <div className="space-y-4">
                    <ul className="grid gap-3">
                      {suggestions!.diet.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex gap-4 p-3 rounded-2xl bg-medical-green/5 border border-medical-green/10"
                        >
                          <div className="w-6 h-6 rounded-full bg-medical-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Utensils className="w-3.5 h-3.5 text-medical-green" />
                          </div>
                          <span className="text-sm text-foreground/80 leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="videos" className="p-6 mt-0">
                  {videoTopics.length > 0 ? (
                    <>
                      <div className="space-y-3">
                        {videoTopics.map((topic, idx) => (
                          <a
                            key={idx}
                            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                              topic
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between p-4 rounded-xl border border-border/50 bg-card/50 hover:border-red-500/50 hover:shadow-md transition-all"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                                <Youtube className="w-5 h-5" />
                              </div>
                              <span className="font-bold text-sm tracking-tight">
                                {topic}
                              </span>
                            </div>
                            <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        ))}
                      </div>
                      <p className="mt-6 text-[11px] text-muted-foreground text-center font-medium italic">
                        Click a topic above to explore expert videos and visual guides on YouTube.
                      </p>
                    </>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No specific video topics available at the moment.</p>
                      <a
                        href="https://www.youtube.com/results?search_query=cervical+health"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-medical-teal hover:underline mt-2 inline-block text-sm"
                      >
                        Search YouTube for Cervical Health
                      </a>
                    </div>
                  )}
                </TabsContent>
              </div>

              {/* Disclaimer */}
              <div className="px-6 py-4 border-t border-border/40 bg-muted/5">
                <p className="text-[10px] text-muted-foreground leading-relaxed italic text-center max-w-lg mx-auto">
                  {suggestions!.disclaimer ||
                    "Medical Disclaimer: This AI analysis and health guidance are for informational purposes only. Always consult a certified healthcare professional for diagnosis and treatment plans."}
                </p>
              </div>
            </Tabs>
          </div>
        </Card>
      )}
    </div>
  );
}