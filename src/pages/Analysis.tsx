import { useState, useRef, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ResultsSection } from "@/components/ResultsSection";
import { GynecologistFinderDialog } from "@/components/GynecologistFinderDialog";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, Lightbulb, MousePointerClick, Maximize2, Activity, Sparkles ,MapPin} from "lucide-react";
import { toast } from "sonner";

import gynImage from "./doc2.png";

const Analysis = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isFinderOpen, setIsFinderOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // ✅ NEW: track view-more opened from ResultsSection
  const [isViewMoreOpen, setIsViewMoreOpen] = useState(false);

  const [prediction, setPrediction] = useState<{
    class: string;
    confidence: number;
    suggestions?: {
      diet: string[];
      exercise: string[];
      video_topics: string[];
      disclaimer: string;
    };
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ✅ NEW: Detect "Superficial-Intermediate" reliably (handles dash variations)
  const isNoCancer = useMemo(() => {
    if (!prediction?.class) return false;
    const cls = prediction.class
      .trim()
      .replace(/^im[_\s-]*/i, "")
      .replace(/[–—]/g, "-")
      .toLowerCase();
    return cls === "superficial-intermediate";
  }, [prediction?.class]);

  const handleFileChange = (selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Please upload an image file.");
      return;
    }
    setFile(selectedFile);
    setPrediction(null);

    // ✅ reset view more when new file selected
    setIsViewMoreOpen(false);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFileChange(droppedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to analyze image");

      setPrediction(data);
      toast.success("Analysis complete!");

      // ✅ reset view more on new prediction
      setIsViewMoreOpen(false);

      setTimeout(() => {
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error: any) {
      console.error("Prediction failed:", error);
      toast.error(error.message || "Prediction failed. Please make sure the backend is running.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              CerviScan <span className="text-gradient">Analysis Center</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Upload a high-quality cervical cell image. Our AI will analyze the cellular structure
              to provide an accurate classification help in early detection.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div
              className={`relative bg-card rounded-[2rem] transition-all duration-500 shadow-2xl border border-border/40 overflow-hidden ${
                !preview ? "p-12 border-2 border-dashed" : "p-4 sm:p-6"
              } ${isDragging ? "border-medical-teal bg-medical-teal/5" : ""}`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onDrop}
            >
              {!preview ? (
                <div className="flex flex-col items-center justify-center text-center py-10">
                  <div className="w-20 h-20 rounded-3xl bg-medical-teal/10 flex items-center justify-center mb-6 animate-pulse-soft">
                    <Upload className="w-10 h-10 text-medical-teal" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 tracking-tight">Ready for Prediction</h3>
                  <p className="text-muted-foreground text-base mb-8 max-w-sm">
                    Drag your medical microscopy image here or browse your device.
                  </p>
                  <Button
                    variant="hero"
                    size="xl"
                    className="h-16 px-10 rounded-2xl shadow-xl shadow-medical-teal/20"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Browse Files
                  </Button>
                  <p className="mt-6 text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                    DICOM, PNG, JPG supported up to 10MB
                  </p>
                </div>
              ) : (
                <div className="grid lg:grid-cols-[0.4fr_0.6fr] gap-8 xl:gap-12 items-start">
                  {/* Left Panel */}
                  <div className="space-y-6">
                    <div className="relative group rounded-[1.5rem] overflow-hidden shadow-2xl bg-black/5 ring-1 ring-border/20 aspect-square lg:aspect-auto">
                      <img
                        src={preview}
                        alt="Medical Microscopy Preview"
                        className="w-full h-full object-contain max-h-[450px] transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px]">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="rounded-xl shadow-lg border-white/20 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Change Image
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <Button
                        variant="hero"
                        size="xl"
                        className="w-full h-14 text-base font-bold rounded-xl shadow-xl shadow-medical-teal/10 hover:shadow-medical-teal/20 transition-all bg-gradient-to-r from-medical-teal to-medical-blue border-none"
                        onClick={handleUpload}
                        disabled={isAnalyzing}
                      >
                        {isAnalyzing ? (
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        ) : (
                          <Activity className="mr-2 h-5 w-5" />
                        )}
                        {isAnalyzing ? "Analyzing Cells..." : "Analyze Image"}
                      </Button>

                      <Button
                        variant="outline"
                        size="xl"
                        className="w-full h-14 rounded-xl border-2 hover:bg-muted/50 transition-colors"
                        onClick={() => {
                          setFile(null);
                          setPreview(null);
                          setPrediction(null);
                          setIsViewMoreOpen(false);
                        }}
                        disabled={isAnalyzing}
                      >
                        Reset
                      </Button>
                        
                      {/* ✅ UPDATED: Show doctor image ONLY when:
                          1) prediction exists
                          2) NOT superficial-intermediate (no cancer)
                          3) user clicked View More (isViewMoreOpen) */}
                      {prediction && !isNoCancer && isViewMoreOpen && (
                        <GynecologistFinderDialog
                          trigger={
                            <div>
                              <img
                                src={gynImage}
                                alt="Find Gynecologists"
                                className="max-h-40 object-contain rounded-xl mx-auto cursor-pointer
                                           border-2 border-border shadow-md 
                                           hover:border-medical-teal hover:shadow-lg 
                                           transition-all duration-300"
                              />
                            </div>
                          }
                          isOpen={isFinderOpen}
                          onOpenChange={setIsFinderOpen}
                        />
                      )}

                     {prediction && !isNoCancer && isViewMoreOpen && (
                            <GynecologistFinderDialog
                                trigger={
                                <Button
                                    variant="default"
                                    size="lg"
                                    className="px-6 py-3 rounded-xl shadow-lg shadow-medical-teal/20 bg-medical-teal hover:bg-medical-teal/90 text-white"
                                >
                                    <MapPin className="mr-2 h-5 w-5" />
                                    Find Gynecologists
                                </Button>
                                }
                                isOpen={isFinderOpen}
                                onOpenChange={setIsFinderOpen}
                            />
                            )}
                    </div>
                  </div>

                  {/* Right Panel */}
                  <div className="min-h-full">
                    {prediction ? (
                      <ResultsSection
                        result={prediction}
                        onViewMoreToggle={(open) => setIsViewMoreOpen(open)} // ✅ NEW
                      />
                    ) : (
                      <div className="h-full min-h-[500px] border-2 border-dashed border-border/40 rounded-[1.5rem] flex flex-col items-center justify-center text-center p-12 bg-muted/20 backdrop-blur-sm">
                        <div className="w-20 h-20 rounded-3xl bg-background flex items-center justify-center border border-border/40 shadow-sm mb-6">
                          <Sparkles className="w-10 h-10 text-muted-foreground/30" />
                        </div>
                        <h4 className="text-xl font-bold text-muted-foreground/80 mb-2 tracking-tight">System Ready</h4>
                        <p className="text-sm text-muted-foreground max-w-[280px] leading-relaxed">
                          Upload an image and click "Analyze Image" to generate scientific findings and guidance.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0];
                  if (selectedFile) handleFileChange(selectedFile);
                  e.target.value = "";
                }}
                className="hidden"
                accept="image/*"
              />
            </div>

            {/* Tips Section */}
            <div className="grid sm:grid-cols-3 gap-6 mt-16 mb-16">
              {[
                { icon: Lightbulb, label: "Use High Contrast", text: "Ensure the cell is clearly visible against the background." },
                { icon: Maximize2, label: "Center the Image", text: "Keep the main cell of interest in the center of the frame." },
                { icon: MousePointerClick, label: "High Resolution", text: "Upload images with at least 224x224 pixels for best results." },
              ].map((tip, idx) => (
                <div key={idx} className="bg-card/50 rounded-2xl p-6 border border-border/50 text-center">
                  <tip.icon className="w-8 h-8 text-medical-teal mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">{tip.label}</h4>
                  <p className="text-xs text-muted-foreground">{tip.text}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Analysis;