import { useState, useCallback } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface SketchUploadProps {
  onSketchUpload: (file: File) => void;
}

export const SketchUpload = ({ onSketchUpload }: SketchUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        onSketchUpload(file);
      }
    },
    [onSketchUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onSketchUpload(file);
      }
    },
    [onSketchUpload]
  );

  return (
    <Card
      className={`relative overflow-hidden border-2 border-dashed transition-all duration-300 ${
        isDragging
          ? "border-primary bg-primary/5 scale-105"
          : "border-border hover:border-primary/50"
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <div className="mb-4 rounded-full bg-primary/10 p-6">
          {isDragging ? (
            <ImageIcon className="h-12 w-12 text-primary animate-scale-in" />
          ) : (
            <Upload className="h-12 w-12 text-primary" />
          )}
        </div>
        
        <h3 className="mb-2 text-xl font-semibold text-foreground">
          Upload Your Sketch
        </h3>
        <p className="mb-6 text-sm text-muted-foreground max-w-sm">
          Drag and drop your black and white sketch here, or click to browse
        </p>
        
        <label htmlFor="file-upload">
          <Button
            type="button"
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            Choose File
          </Button>
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileInput}
        />
        
        <p className="mt-4 text-xs text-muted-foreground">
          Supports JPG, PNG, WEBP
        </p>
      </div>
    </Card>
  );
};
