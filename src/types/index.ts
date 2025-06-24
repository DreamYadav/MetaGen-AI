export interface DocumentMetadata {
  id: string;
  filename: string;
  fileType: string;
  fileSize: number;
  uploadDate: Date;
  processingStatus: 'pending' | 'processing' | 'completed' | 'error';
  extractedText: string;
  wordCount: number;
  characterCount: number;
  language: string;
  title: string;
  author: string;
  subject: string;
  keywords: string[];
  summary: string;
  entities: Entity[];
  topics: Topic[];
  sentiment: {
    overall: 'positive' | 'negative' | 'neutral';
    confidence: number;
  };
  readabilityScore: number;
  structure: DocumentStructure;
  technicalMetadata: TechnicalMetadata;
}

export interface Entity {
  text: string;
  type: 'person' | 'organization' | 'location' | 'date' | 'email' | 'phone' | 'url';
  confidence: number;
  startIndex: number;
  endIndex: number;
}

export interface Topic {
  name: string;
  confidence: number;
  keywords: string[];
}

export interface DocumentStructure {
  hasTitle: boolean;
  hasHeaders: boolean;
  headerCount: number;
  paragraphCount: number;
  listCount: number;
  tableCount: number;
  imageCount: number;
}

export interface TechnicalMetadata {
  mimeType: string;
  encoding: string;
  creationDate?: Date;
  modificationDate?: Date;
  pageCount?: number;
  dimensions?: {
    width: number;
    height: number;
  };
}

export interface ProcessingJob {
  id: string;
  filename: string;
  status: 'queued' | 'processing' | 'completed' | 'error';
  progress: number;
  startTime: Date;
  endTime?: Date;
  error?: string;
}