export type Document = {
  id: string;
  name: string;
  type: 'PDF' | 'DOCX';
  size: string;
  uploadDate: Date;
};
