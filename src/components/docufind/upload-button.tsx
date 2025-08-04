"use client"

import { useState, useCallback, type DragEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, UploadCloud } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import type { Document } from '@/lib/types';

interface UploadButtonProps {
  onUpload: (document: Omit<Document, 'id' | 'uploadDate'>) => void;
}

export function UploadButton({ onUpload }: UploadButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile) {
      if (selectedFile.type === "application/pdf" || selectedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        setFile(selectedFile);
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF or DOCX file.",
          variant: "destructive",
        });
      }
    }
  };
  
  const handleDrag = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  }, []);


  const handleSubmit = () => {
    if (file) {
      const newDoc = {
        name: file.name,
        type: file.type === 'application/pdf' ? 'PDF' : 'DOCX',
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      } as Omit<Document, 'id' | 'uploadDate'>;
      onUpload(newDoc);
      setFile(null);
      setIsOpen(false);
    } else {
       toast({
        title: "No file selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Upload className="mr-2 h-4 w-4" />
        Upload Document
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload a new document</DialogTitle>
            <DialogDescription>
              Drag and drop a PDF or DOCX file here, or click to select a file.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
             <div 
              className={cn(
                "flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
                isDragging ? "border-primary bg-accent" : "border-border hover:border-primary/50"
              )}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
                <UploadCloud className="w-12 h-12 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  {file ? file.name : 'Drag & drop or click to upload'}
                </p>
                <Input id="file-upload" type="file" className="hidden" accept=".pdf,.docx" onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
                <Button type="button" variant="secondary">
                Cancel
                </Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit}>Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
