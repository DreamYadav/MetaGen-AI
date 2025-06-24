import React from 'react';
import { FileText, Settings, Download } from 'lucide-react';

interface HeaderProps {
  onExport: () => void;
  documentCount: number;
}

export const Header: React.FC<HeaderProps> = ({ onExport, documentCount }) => {
  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-700 rounded-lg shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-700 bg-clip-text text-transparent">
                MetaGen Pro
              </h1>
              <p className="text-sm text-slate-500">Automated Metadata Generation</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-slate-600">
              <span className="font-medium text-violet-600">{documentCount}</span> documents processed
            </div>
            <button
              onClick={onExport}
              disabled={documentCount === 0}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-700 text-white rounded-lg hover:from-violet-700 hover:to-purple-800 disabled:from-slate-400 disabled:to-slate-500 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};