import { useState } from "react";
import { Palette, Sparkles, Zap } from "lucide-react";
import { SketchUpload } from "@/components/SketchUpload";
import { ColorizePreview } from "@/components/ColorizePreview";
import { ExampleGallery } from "@/components/ExampleGallery";

const Index = () => {
  const [sketchFile, setSketchFile] = useState<File | null>(null);
  const [sketchUrl, setSketchUrl] = useState<string | null>(null);

  const handleSketchUpload = (file: File) => {
    setSketchFile(file);
    const url = URL.createObjectURL(file);
    setSketchUrl(url);
  };

  const handleColorize = async (): Promise<string> => {
    if (!sketchFile) throw new Error("No sketch uploaded");
    
    // Convert file to base64
    const reader = new FileReader();
    const base64Promise = new Promise<string>((resolve, reject) => {
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(sketchFile);
    });
    
    const imageBase64 = await base64Promise;
    
    // Call backend function to colorize
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/colorize-sketch`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ imageBase64 }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to colorize image");
    }

    const data = await response.json();
    return data.colorizedImageUrl;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            AI-Powered Art Generation
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Sketch to Color
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Converter
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Transform your black and white sketches into vibrant, colorful masterpieces
            using cutting-edge deep learning technology
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            <div className="flex flex-col items-center p-6 rounded-lg bg-card shadow-card">
              <div className="rounded-full bg-primary/10 p-3 mb-3">
                <Palette className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">AI Colorization</h3>
              <p className="text-sm text-muted-foreground">
                Advanced neural networks analyze and colorize your sketches
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 rounded-lg bg-card shadow-card">
              <div className="rounded-full bg-accent/10 p-3 mb-3">
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Instant Results</h3>
              <p className="text-sm text-muted-foreground">
                Get your colorized artwork in seconds, not hours
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 rounded-lg bg-card shadow-card">
              <div className="rounded-full bg-primary/10 p-3 mb-3">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">High Quality</h3>
              <p className="text-sm text-muted-foreground">
                Professional-grade output ready for any use case
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Try It Yourself
            </h2>
            <p className="text-muted-foreground text-lg">
              Upload your sketch and watch the AI bring it to life
            </p>
          </div>

          {!sketchUrl ? (
            <SketchUpload onSketchUpload={handleSketchUpload} />
          ) : (
            <ColorizePreview sketchUrl={sketchUrl} onColorize={handleColorize} />
          )}
        </div>
      </section>

      {/* Example Gallery */}
      <ExampleGallery />

      {/* Footer */}
      <footer className="py-12 px-4 bg-muted">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-muted-foreground">
            Powered by Deep Learning • Built with{" "}
            <span className="text-primary">Pix2Pix GAN</span> and{" "}
            <span className="text-primary">U-Net</span>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Ready to connect to your trained model API
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
