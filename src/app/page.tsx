"use client";

import { useState, useEffect, useMemo } from 'react';
import type { Document } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FileStack, Search } from 'lucide-react';
import { DocumentTable } from '@/components/docufind/document-table';
import { UploadButton } from '@/components/docufind/upload-button';
import { useToast } from '@/hooks/use-toast';

const initialDocuments: Document[] = [
  { id: 'doc-1', name: 'product-brief-q4.docx', type: 'DOCX', size: '2.5 MB', uploadDate: new Date('2023-10-26T10:00:00Z') },
  { id: 'doc-2', name: 'quarterly-report-q3.pdf', type: 'PDF', size: '10.1 MB', uploadDate: new Date('2023-10-25T14:30:00Z') },
  { id: 'doc-3', name: 'marketing-strategy-v2.docx', type: 'DOCX', size: '1.2 MB', uploadDate: new Date('2023-10-24T09:15:00Z') },
  { id: 'doc-4', name: 'legal-contract-final.pdf', type: 'PDF', size: '850 KB', uploadDate: new Date('2023-10-22T18:00:00Z') },
  { id: 'doc-5', name: 'team-onboarding-guide.pdf', type: 'PDF', size: '5.7 MB', uploadDate: new Date('2023-10-20T11:45:00Z') },
];

export default function Home() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Simulate fetching data from an API
    const timer = setTimeout(() => {
      setDocuments(initialDocuments);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleUpload = (newDocument: Omit<Document, 'id' | 'uploadDate'>) => {
    const doc = {
      ...newDocument,
      id: `doc-${Date.now()}`,
      uploadDate: new Date(),
    };
    setDocuments(prev => [doc, ...prev]);
    toast({
      title: "Upload Successful",
      description: `"${doc.name}" has been uploaded.`,
    });
  };

  const handleDelete = (docId: string) => {
    const docToDelete = documents.find(d => d.id === docId);
    if (docToDelete) {
      setDocuments(prev => prev.filter(d => d.id !== docId));
      toast({
        title: "Document Deleted",
        description: `"${docToDelete.name}" has been deleted.`,
        variant: "destructive",
      });
    }
  };

  const filteredDocuments = useMemo(() => {
    return documents.filter(doc =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [documents, searchQuery]);

  return (
    <div className="min-h-screen w-full p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <Card className="w-full max-w-5xl shadow-2xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <FileStack className="h-8 w-8 text-primary" />
              <CardTitle className="text-3xl font-bold tracking-tight">
                DocuFind
              </CardTitle>
            </div>
            <UploadButton onUpload={handleUpload} />
          </div>
          <div className="mt-6 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search documents by name..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <DocumentTable
            documents={filteredDocuments}
            onDelete={handleDelete}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}
