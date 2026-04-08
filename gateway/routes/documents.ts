import express, { Request, Response } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { DocumentService } from '../services/DocumentService';

const router = express.Router();
const documentService = new DocumentService();

// Setup multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 10 * 1024 * 1024 }, // limit file size to 10MB
});

// Route to upload a document
router.post('/upload', upload.single('document'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { originalname, filename } = req.file;
    const documentId = uuidv4();
    const filePath = path.join(__dirname, '../../uploads', filename);

    // Save document metadata to the database
    await documentService.saveDocumentMetadata({
      id: documentId,
      name: originalname,
      path: filePath,
      uploadedAt: new Date(),
    });

    res.status(201).json({ message: 'Document uploaded successfully', documentId });
  } catch (error) {
    console.error('Error uploading document:', error);
    res.status(500).json({ error: 'Failed to upload document' });
  }
});

// Route to list all documents
router.get('/', async (req: Request, res: Response) => {
  try {
    const documents = await documentService.getAllDocuments();
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
    const document = await documentService.getDocumentById(id);

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.status(200).json(document);
  } catch (error) {
    console.error('Error fetching document:', error);
    res.status(500).json({ error: 'Failed to fetch document' });
  }
});

// Route to download a document by ID
router.get('/download/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const document = await documentService.getDocumentById(id);

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.download(document.path, document.name);
  } catch (error) {
    console.error('Error downloading document:', error);
    res.status(500).json({ error: 'Failed to download document' });
  }
});

// Route to delete a document by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const document = await documentService.getDocumentById(id);

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Delete the file from the file system
    fs.unlinkSync(document.path);

    // Remove document metadata from the database
    await documentService.deleteDocumentById(id);

    res.status(200).json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ error: 'Failed to delete document' });
  }
});

export default router;