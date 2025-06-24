import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { ProcessingStatus } from './components/ProcessingStatus';
import { Dashboard } from './components/Dashboard';
import { ExportModal } from './components/ExportModal';
import { DocumentMetadata, ProcessingJob } from './types';
import { FileProcessor } from './utils/fileProcessor';

function App() {
  const [documents, setDocuments] = useState<DocumentMetadata[]>([]);
  const [processingJobs, setProcessingJobs] = useState<ProcessingJob[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const handleFileUpload = useCallback(async (files: File[]) => {
    setIsProcessing(true);
    const processor = FileProcessor.getInstance();
    
    // Create processing jobs
    const jobs: ProcessingJob[] = files.map(file => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2),
      filename: file.name,
      status: 'queued',
      progress: 0,
      startTime: new Date()
    }));
    
    setProcessingJobs(jobs);

    // Process files sequentially
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const job = jobs[i];
      
      try {
        // Update job status to processing
        setProcessingJobs(prev => prev.map(j => 
          j.id === job.id ? { ...j, status: 'processing', progress: 0 } : j
        ));
        
        // Simulate processing progress
        for (let progress = 0; progress <= 100; progress += 20) {
          await new Promise(resolve => setTimeout(resolve, 100));
          setProcessingJobs(prev => prev.map(j => 
            j.id === job.id ? { ...j, progress } : j
          ));
        }
        
        // Process the file
        const metadata = await processor.processFile(file);
        
        // Update documents and job status
        setDocuments(prev => [...prev, metadata]);
        setProcessingJobs(prev => prev.map(j => 
          j.id === job.id 
            ? { ...j, status: 'completed', progress: 100, endTime: new Date() }
            : j
        ));
        
      } catch (error) {
        console.error('Error processing file:', error);
        setProcessingJobs(prev => prev.map(j => 
          j.id === job.id 
            ? { ...j, status: 'error', error: 'Failed to process file', endTime: new Date() }
            : j
        ));
      }
    }
    
    setIsProcessing(false);
    
    // Clear processing jobs after a delay
    setTimeout(() => {
      setProcessingJobs([]);
    }, 3000);
  }, []);

  const handleExport = useCallback(() => {
    setShowExportModal(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onExport={handleExport} documentCount={documents.length} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <FileUpload onFileUpload={handleFileUpload} isProcessing={isProcessing} />
            <ProcessingStatus jobs={processingJobs} />
          </div>
          
          <div className="lg:col-span-2">
            <Dashboard documents={documents} />
          </div>
        </div>
      </div>

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        metadata={documents}
      />
    </div>
  );
}

export default App;