import express, { Request, Response } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { DocumentService } from '../services/DocumentService';
import { AnythingLLMService } from '../services/AnythingLLMService';
import { FlowiseService } from '../services/FlowiseService';
import { LangflowService } from '../services/LangflowService';
import { DifyService } from '../services/DifyService';
import { SupabaseService } from '../services/SupabaseService';

const router = express.Router();
const documentService = new DocumentService();
const anythingLLMService = new AnythingLLMService();
const flowiseService = new FlowiseService();
const langflowService = new LangflowService();
const difyService = new DifyService();
const supabaseService = new SupabaseService();

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

    // Index the document using AnythingLLM
    await anythingLLMService.indexDocument(documentId, filePath);

    // Create a retrieval chain using Flowise
    await flowiseService.createRetrievalChain(documentId);

    // Create a pipeline using Langflow
    await langflowService.createPipeline(documentId);

    // Create a workflow using Dify
    await difyService.createWorkflow(documentId);

    // Save the document to Supabase
    await supabaseService.saveDocument(documentId, filePath);

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

// Route to search documents using AnythingLLM
router.post('/search', async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    const results = await anythingLLMService.searchDocuments(query);
    res.status(200).json(results);
  } catch (error) {
    console.error('Error searching documents:', error);
    res.status(500).json({ error: 'Failed to search documents' });
  }
});

// Route to get a document's retrieval chain using Flowise
router.get('/:id/retrieval-chain', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const retrievalChain = await flowiseService.getRetrievalChain(id);
    res.status(200).json(retrievalChain);
  } catch (error) {
    console.error('Error fetching retrieval chain:', error);
    res.status(500).json({ error: 'Failed to fetch retrieval chain' });
  }
});

// Route to get a document's pipeline using Langflow
router.get('/:id/pipeline', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pipeline = await langflowService.getPipeline(id);
    res.status(200).json(pipeline);
  } catch (error) {
    console.error('Error fetching pipeline:', error);
    res.status(500).json({ error: 'Failed to fetch pipeline' });
  }
});

// Route to get a document's workflow using Dify
router.get('/:id/workflow', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workflow = await difyService.getWorkflow(id);
    res.status(200).json(workflow);
  } catch (error) {
    console.error('Error fetching workflow:', error);
    res.status(500).json({ error: 'Failed to fetch workflow' });
  }
});

// Route to get a document from Supabase
router.get('/:id/supabase', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const document = await supabaseService.getDocument(id);
    res.status(200).json(document);
  } catch (error) {
    console.error('Error fetching document from Supabase:', error);
    res.status(500).json({ error: 'Failed to fetch document from Supabase' });
  }
});