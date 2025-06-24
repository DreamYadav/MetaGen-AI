import React, { useState } from 'react';
import { DocumentMetadata } from '../types';
import { 
  FileText, User, Tag, Hash, Calendar, Languages, 
  BarChart3, Eye, EyeOff, ChevronDown, ChevronUp,
  Globe, Mail, Phone, MapPin, Clock
} from 'lucide-react';

interface MetadataCardProps {
  metadata: DocumentMetadata;
}

export const MetadataCard: React.FC<MetadataCardProps> = ({ metadata }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showFullText, setShowFullText] = useState(false);

  const getEntityIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'phone': return <Phone className="w-4 h-4" />;
      case 'location': return <MapPin className="w-4 h-4" />;
      case 'date': return <Clock className="w-4 h-4" />;
      case 'url': return <Globe className="w-4 h-4" />;
      default: return <Tag className="w-4 h-4" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-emerald-700 bg-emerald-100 border-emerald-200';
      case 'negative': return 'text-red-700 bg-red-100 border-red-200';
      default: return 'text-slate-700 bg-slate-100 border-slate-200';
    }
  };

  const getReadabilityLevel = (score: number) => {
    if (score >= 90) return { level: 'Very Easy', color: 'text-emerald-600' };
    if (score >= 80) return { level: 'Easy', color: 'text-green-600' };
    if (score >= 70) return { level: 'Fairly Easy', color: 'text-yellow-600' };
    if (score >= 60) return { level: 'Standard', color: 'text-orange-600' };
    if (score >= 50) return { level: 'Fairly Difficult', color: 'text-red-600' };
    return { level: 'Difficult', color: 'text-red-700' };
  };

  const readability = getReadabilityLevel(metadata.readabilityScore);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-700 rounded-lg shadow-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-lg">{metadata.title}</h3>
              <p className="text-sm text-slate-500">{metadata.filename}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getSentimentColor(metadata.sentiment.overall)}`}>
              {metadata.sentiment.overall}
            </span>
            <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm border border-slate-200">
              {metadata.fileType.split('/').pop()?.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200">
            <Hash className="w-5 h-5 text-slate-600 mx-auto mb-1" />
            <div className="text-2xl font-bold text-slate-900">{metadata.wordCount.toLocaleString()}</div>
            <div className="text-sm text-slate-600">Words</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-violet-50 to-purple-50 rounded-lg border border-violet-200">
            <Languages className="w-5 h-5 text-violet-600 mx-auto mb-1" />
            <div className="text-2xl font-bold text-violet-900">{metadata.language}</div>
            <div className="text-sm text-violet-600">Language</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-200">
            <BarChart3 className="w-5 h-5 text-amber-600 mx-auto mb-1" />
            <div className={`text-2xl font-bold ${readability.color}`}>{metadata.readabilityScore}</div>
            <div className="text-sm text-amber-600">Readability</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
            <Calendar className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
            <div className="text-2xl font-bold text-emerald-900">{metadata.uploadDate.toLocaleDateString()}</div>
            <div className="text-sm text-emerald-600">Processed</div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <User className="w-4 h-4 text-slate-600" />
              <span className="font-medium text-slate-900">Author:</span>
              <span className="text-slate-700">{metadata.author}</span>
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Tag className="w-4 h-4 text-slate-600" />
              <span className="font-medium text-slate-900">Subject:</span>
              <span className="text-slate-700">{metadata.subject}</span>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-slate-900 mb-2">Summary</h4>
            <p className="text-slate-700 text-sm leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">{metadata.summary}</p>
          </div>

          <div>
            <h4 className="font-medium text-slate-900 mb-2">Keywords</h4>
            <div className="flex flex-wrap gap-2">
              {metadata.keywords.slice(0, 8).map((keyword, index) => (
                <span key={index} className="px-3 py-1 bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 rounded-full text-sm border border-violet-200">
                  {keyword}
                </span>
              ))}
              {metadata.keywords.length > 8 && (
                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm border border-slate-200">
                  +{metadata.keywords.length - 8} more
                </span>
              )}
            </div>
          </div>

          {metadata.topics.length > 0 && (
            <div>
              <h4 className="font-medium text-slate-900 mb-2">Topics</h4>
              <div className="space-y-2">
                {metadata.topics.slice(0, 3).map((topic, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-slate-700 font-medium">{topic.name}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-violet-600 to-purple-700 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${topic.confidence * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-slate-600 font-medium">{Math.round(topic.confidence * 100)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Expandable Section */}
      <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-slate-100 border-t border-slate-200">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-left hover:text-violet-600 transition-colors"
        >
          <span className="font-medium text-slate-900">Advanced Details</span>
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>

        {isExpanded && (
          <div className="mt-4 space-y-4">
            {metadata.entities.length > 0 && (
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Entities</h4>
                <div className="space-y-2">
                  {metadata.entities.slice(0, 10).map((entity, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-white rounded border border-slate-200">
                      <div className="flex items-center space-x-2">
                        {getEntityIcon(entity.type)}
                        <span className="text-slate-700">{entity.text}</span>
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs border border-slate-200">
                          {entity.type}
                        </span>
                      </div>
                      <span className="text-sm text-slate-500 font-medium">{Math.round(entity.confidence * 100)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-slate-900">Extracted Text</h4>
                <button
                  onClick={() => setShowFullText(!showFullText)}
                  className="flex items-center space-x-1 text-violet-600 hover:text-violet-700 transition-colors"
                >
                  {showFullText ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  <span className="text-sm">{showFullText ? 'Hide' : 'Show'}</span>
                </button>
              </div>
              <div className="p-3 bg-white rounded border border-slate-200 max-h-64 overflow-y-auto">
                <pre className="text-sm text-slate-700 whitespace-pre-wrap font-mono">
                  {showFullText 
                    ? metadata.extractedText 
                    : metadata.extractedText.substring(0, 400) + (metadata.extractedText.length > 400 ? '...' : '')
                  }
                </pre>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-slate-900 mb-2">Document Structure</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between p-2 bg-white rounded border border-slate-200">
                  <span className="text-slate-600">Headers:</span>
                  <span className="font-medium text-slate-900">{metadata.structure.headerCount}</span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded border border-slate-200">
                  <span className="text-slate-600">Paragraphs:</span>
                  <span className="font-medium text-slate-900">{metadata.structure.paragraphCount}</span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded border border-slate-200">
                  <span className="text-slate-600">Lists:</span>
                  <span className="font-medium text-slate-900">{metadata.structure.listCount}</span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded border border-slate-200">
                  <span className="text-slate-600">Tables:</span>
                  <span className="font-medium text-slate-900">{metadata.structure.tableCount}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};