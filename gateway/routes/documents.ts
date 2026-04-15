import express, { Request, Response } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// In-memory storage for document metadata (replace with database in production)
interface Document {
  id: string;
  name: string;
  path: string;
  uploadedAt: Date;
}

const documents: Document[] = [];

// Setup multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 10 * 1024 * 1024 }, // limit file size to 10MB
});

// Route to upload a document
router.post('/upload', upload.single('document') as any, async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { originalname } = req.file;
    const documentId = uuidv4();

    // Save document metadata
    const doc: Document = {
      id: documentId,
      name: originalname,
      path: req.file.path,
      uploadedAt: new Date(),
    };
    documents.push(doc);

    res.status(201).json({ 
      message: 'Document uploaded successfully', 
      documentId,
      document: doc
    });
  } catch (error) {
    console.error('Error uploading document:', error);
    res.status(500).json({ error: 'Failed to upload document' });
  }
});

// Route to list all documents
router.get('/', async (req: Request, res: Response) => {
  try {
    res.status(200).json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

// Route to get a document by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const document = documents.find(doc => doc.id === id);

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.status(200).json(document);
  } catch (error) {
    console.error('Error fetching document:', error);
    res.status(500).json({ error: 'Failed to fetch document' });
  }
});

// Route to delete a document
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const index = documents.findIndex(doc => doc.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Document not found' });
    }

    const doc = documents[index];
    
    // Delete the file if it exists
    if (fs.existsSync(doc.path)) {
      fs.unlinkSync(doc.path);
    }

    documents.splice(index, 1);
    res.status(200).json({ message: 'Document deleted successfully', documentId: id });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ error: 'Failed to delete document' });
  }
});

export default router;