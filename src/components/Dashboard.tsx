import React, { useState } from 'react';
import { DocumentMetadata } from '../types';
import { MetadataCard } from './MetadataCard';
import { Search, Filter, Calendar, FileText, Users, Tag } from 'lucide-react';

interface DashboardProps {
  documents: DocumentMetadata[];
}

export const Dashboard: React.FC<DashboardProps> = ({ documents }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pdf' | 'docx' | 'txt' | 'image'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'size'>('date');

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'pdf' && doc.fileType.includes('pdf')) ||
                         (selectedFilter === 'docx' && doc.fileType.includes('word')) ||
                         (selectedFilter === 'txt' && doc.fileType.includes('text')) ||
                         (selectedFilter === 'image' && doc.fileType.includes('image'));

    return matchesSearch && matchesFilter;
  });

  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'size':
        return b.fileSize - a.fileSize;
      default:
        return b.uploadDate.getTime() - a.uploadDate.getTime();
    }
  });

  const stats = {
    total: documents.length,
    totalWords: documents.reduce((sum, doc) => sum + doc.wordCount, 0),
    averageReadability: documents.length > 0 
      ? Math.round(documents.reduce((sum, doc) => sum + doc.readabilityScore, 0) / documents.length)
      : 0,
    languages: [...new Set(documents.map(doc => doc.language))].length
  };

  if (documents.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-violet-600" />
        </div>
        <h3 className="text-xl font-medium text-slate-900 mb-2">No documents processed yet</h3>
        <p className="text-slate-600">Upload some documents to see their metadata analysis here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Documents</p>
              <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-violet-100 to-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-violet-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Words</p>
              <p className="text-3xl font-bold text-slate-900">{stats.totalWords.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center">
              <Tag className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Avg. Readability</p>
              <p className="text-3xl font-bold text-slate-900">{stats.averageReadability}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Languages</p>
              <p className="text-3xl font-bold text-slate-900">{stats.languages}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-pink-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-rose-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search documents, authors, keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
              />
            </div>
          </div>
          
          <div className="flex space-x-3">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value as any)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
            >
              <option value="all">All Files</option>
              <option value="pdf">PDF</option>
              <option value="docx">DOCX</option>
              <option value="txt">TXT</option>
              <option value="image">Images</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
              <option value="size">Sort by Size</option>
            </select>
          </div>
        </div>
        
        {searchTerm && (
          <div className="mt-3 text-sm text-slate-600">
            Showing {sortedDocuments.length} of {documents.length} documents
          </div>
        )}
      </div>

      {/* Document Cards */}
      <div className="space-y-6">
        {sortedDocuments.map((doc) => (
          <MetadataCard key={doc.id} metadata={doc} />
        ))}
      </div>
    </div>
  );
};