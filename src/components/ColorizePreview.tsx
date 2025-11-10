import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface ColorizePreviewProps {
  sketchUrl: string;
  onColorize: () => Promise<string>;
}

export const ColorizePreview = ({ sketchUrl, onColorize }: ColorizePreviewProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [colorizedUrl, setColorizedUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleColorize = async () => {
    setIsProcessing(true);
    try {
      const result = await onColorize();
      setColorizedUrl(result);
      toast({
        title: "✨ Colorization Complete!",
        description: "Your sketch has been transformed with AI colors",
      });
    } catch (error) {
      toast({
        title: "Processing Error",
        description: "Failed to colorize the sketch. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="overflow-hidden shadow-card hover:shadow-hover transition-all duration-300">
        <div className="p-4 bg-muted">
          <h3 className="font-semibold text-foreground">Original Sketch</h3>
        </div>
        <div className="aspect-square bg-secondary flex items-center justify-center p-4">
          <img
            src={sketchUrl}
            alt="Original sketch"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </Card>

      <Card className="overflow-hidden shadow-card hover:shadow-hover transition-all duration-300">
        <div className="p-4 bg-gradient-primary">
          <h3 className="font-semibold text-primary-foreground">
            AI Colorized Result
          </h3>
        </div>
        <div className="aspect-square bg-secondary flex items-center justify-center p-4">
          {colorizedUrl ? (
            <img
              src={colorizedUrl}
              alt="Colorized result"
              className="max-w-full max-h-full object-contain animate-scale-in"
            />
          ) : (
            <div className="text-center">
              <Sparkles className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-muted-foreground">
                Click colorize to see the magic
              </p>
            </div>
          )}
        </div>
      </Card>

      <div className="md:col-span-2 flex justify-center">
        <Button
          size="lg"
          onClick={handleColorize}
          disabled={isProcessing}
          className="min-w-[200px]"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Colorize Sketch
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
