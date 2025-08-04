"use client"

import { useState } from 'react';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { File as FileIcon, FileText, Trash2, FolderSearch } from 'lucide-react';
import type { Document } from '@/lib/types';

interface DocumentTableProps {
  documents: Document[];
  onDelete: (id: string) => void;
  isLoading: boolean;
}

const fileTypeIcons = {
  'PDF': <FileIcon className="h-5 w-5 text-red-500" />,
  'DOCX': <FileText className="h-5 w-5 text-blue-500" />,
};

export function DocumentTable({ documents, onDelete, isLoading }: DocumentTableProps) {
  const [docToDelete, setDocToDelete] = useState<Document | null>(null);

  const handleDeleteClick = (doc: Document) => {
    setDocToDelete(doc);
  };

  const handleConfirmDelete = () => {
    if (docToDelete) {
      onDelete(docToDelete.id);
      setDocToDelete(null);
    }
  };

  const renderSkeleton = () => (
    Array.from({ length: 5 }).map((_, index) => (
      <TableRow key={`skeleton-${index}`}>
        <TableCell><Skeleton className="h-5 w-5 rounded-full" /></TableCell>
        <TableCell><Skeleton className="h-4 w-48" /></TableCell>
        <TableCell><Skeleton className="h-4 w-16" /></TableCell>
        <TableCell><Skeleton className="h-4 w-32" /></TableCell>
        <TableCell><Skeleton className="h-8 w-8" /></TableCell>
      </TableRow>
    ))
  );

  const renderEmptyState = () => (
    <TableRow>
      <TableCell colSpan={5} className="h-48 text-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <FolderSearch className="h-16 w-16 text-muted-foreground" />
          <h3 className="text-xl font-semibold">No Documents Found</h3>
          <p className="text-muted-foreground">Try uploading a new document or refining your search.</p>
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <TooltipProvider>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Type</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="w-[100px]">Size</TableHead>
              <TableHead className="w-[200px]">Upload Date</TableHead>
              <TableHead className="w-[50px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              renderSkeleton()
            ) : documents.length > 0 ? (
              documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>{fileTypeIcons[doc.type]}</TableCell>
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell>{doc.size}</TableCell>
                  <TableCell>{format(doc.uploadDate, "PPp")}</TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <Tooltip>
                        <TooltipTrigger asChild>
                           <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(doc)}>
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                           </AlertDialogTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete Document</p>
                        </TooltipContent>
                      </Tooltip>
                      {docToDelete && docToDelete.id === doc.id && (
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the document
                              <span className="font-semibold"> "{docToDelete.name}"</span>.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setDocToDelete(null)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleConfirmDelete}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      )}
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              renderEmptyState()
            )}
          </TableBody>
        </Table>
      </div>
    </TooltipProvider>
  );
}
