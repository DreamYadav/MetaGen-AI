import React, { useState } from 'react';
import { DocumentMetadata } from '../types';
import { ExportUtils } from '../utils/exportUtils';
import { X, Download, FileJson, FileText, Table } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  metadata: DocumentMetadata[];
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, metadata }) => {
  const [selectedFormat, setSelectedFormat] = useState<'json' | 'xml' | 'csv'>('json');
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>(
    metadata.map(doc => doc.id)
  );

  if (!isOpen) return null;

  const handleExport = () => {
    const documentsToExport = metadata.filter(doc => selectedDocuments.includes(doc.id));
    
    switch (selectedFormat) {
      case 'json':
        ExportUtils.exportAsJSON(documentsToExport);
        break;
      case 'xml':
        ExportUtils.exportAsXML(documentsToExport);
        break;
      case 'csv':
        ExportUtils.exportAsCSV(documentsToExport);
        break;
    }
    
    onClose();
  };

  const toggleDocument = (docId: string) => {
    setSelectedDocuments(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const toggleAll = () => {
    setSelectedDocuments(prev => 
      prev.length === metadata.length 
        ? []
        : metadata.map(doc => doc.id)
    );
  };

  const formatOptions = [
    { 
      value: 'json', 
      label: 'JSON', 
      description: 'JavaScript Object Notation - structured data format',
      icon: <FileJson className="w-5 h-5 text-violet-600" />
    },
    { 
      value: 'xml', 
      label: 'XML', 
      description: 'Extensible Markup Language - hierarchical data format',
      icon: <FileText className="w-5 h-5 text-emerald-600" />
    },
    { 
      value: 'csv', 
      label: 'CSV', 
      description: 'Comma Separated Values - spreadsheet compatible',
      icon: <Table className="w-5 h-5 text-amber-600" />
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-violet-50 to-purple-50">
          <h2 className="text-xl font-semibold text-slate-900">Export Metadata</h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto">
          <div>
            <h3 className="text-lg font-medium text-slate-900 mb-3">Export Format</h3>
            <div className="space-y-3">
              {formatOptions.map((option) => (
                <label key={option.value} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                  <input
                    type="radio"
                    name="format"
                    value={option.value}
                    checked={selectedFormat === option.value}
                    onChange={() => setSelectedFormat(option.value as 'json' | 'xml' | 'csv')}
                    className="w-4 h-4 text-violet-600"
                  />
                  <div className="flex items-center space-x-3">
                    {option.icon}
                    <div>
                      <div className="font-medium text-slate-900">{option.label}</div>
                      <div className="text-sm text-slate-600">{option.description}</div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-slate-900">Select Documents</h3>
              <button
                onClick={toggleAll}
                className="text-violet-600 hover:text-violet-700 text-sm font-medium transition-colors"
              >
                {selectedDocuments.length === metadata.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-lg">
              {metadata.map((doc) => (
                <label key={doc.id} className="flex items-center space-x-3 p-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-b-0">
                  <input
                    type="checkbox"
                    checked={selectedDocuments.includes(doc.id)}
                    onChange={() => toggleDocument(doc.id)}
                    className="w-4 h-4 text-violet-600"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-slate-900 truncate">{doc.title}</div>
                    <div className="text-sm text-slate-600 truncate">{doc.filename}</div>
                  </div>
                  <div className="text-sm text-slate-500">
                    {doc.wordCount.toLocaleString()} words
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-6 border-t border-slate-200 bg-slate-50">
          <div className="text-sm text-slate-600">
            {selectedDocuments.length} of {metadata.length} documents selected
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              disabled={selectedDocuments.length === 0}
              className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-violet-600 to-purple-700 text-white rounded-lg hover:from-violet-700 hover:to-purple-800 disabled:from-slate-400 disabled:to-slate-500 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};