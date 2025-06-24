import React from 'react';
import { ProcessingJob } from '../types';
import { CheckCircle, XCircle, Clock, Loader } from 'lucide-react';

interface ProcessingStatusProps {
  jobs: ProcessingJob[];
}

export const ProcessingStatus: React.FC<ProcessingStatusProps> = ({ jobs }) => {
  if (jobs.length === 0) return null;

  const getStatusIcon = (status: ProcessingJob['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'processing':
        return <Loader className="w-5 h-5 text-violet-500 animate-spin" />;
      default:
        return <Clock className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStatusColor = (status: ProcessingJob['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-50 border-emerald-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'processing':
        return 'bg-violet-50 border-violet-200';
      default:
        return 'bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">Processing Status</h2>
      <div className="space-y-3">
        {jobs.map((job) => (
          <div key={job.id} className={`p-4 rounded-lg border ${getStatusColor(job.status)}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                {getStatusIcon(job.status)}
                <span className="font-medium text-slate-900">{job.filename}</span>
              </div>
              <span className="text-sm text-slate-600 capitalize">{job.status}</span>
            </div>
            {job.status === 'processing' && (
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-violet-600 to-purple-700 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${job.progress}%` }}
                />
              </div>
            )}
            {job.error && (
              <p className="text-sm text-red-600 mt-2">{job.error}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};