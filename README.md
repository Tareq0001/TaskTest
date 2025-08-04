# DocuFind - Document Management System

DocuFind is a simple, elegant full-stack Document Management System (DMS) that allows users to upload, store, view, search, and manage documents. This project implements the frontend of the application using Next.js and Tailwind CSS.

## Features Implemented

- **Document Upload**: A sleek dialog with drag-and-drop support for uploading new PDF and DOCX documents.
- **Document Listing**: A clean, responsive table view of all uploaded documents, showing file type icons, names, sizes, and upload dates.
- **Real-time Search**: Instantly filter and find documents by name with a prominent search bar.
- **Document Deletion**: Securely delete documents with a confirmation step.
- **User Feedback**: Subtle animations and toast notifications provide feedback for actions like uploading and deleting files.
- **Modern UI**: A visually appealing interface with a soft color palette, modern icons, and a clean layout, designed for a great user experience.
- **Responsive Design**: The application is fully responsive and works seamlessly on desktop and mobile devices.

## Tech Stack (Frontend)

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)

## How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd docufind
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

**Note on Backend**: This repository contains the frontend implementation. The backend API endpoints (`/upload`, `/documents`, etc.) are mocked within the frontend for demonstration purposes. To build a full-stack application, you would need to implement a backend service (e.g., using Python with FastAPI or Flask) and connect it to the frontend.
