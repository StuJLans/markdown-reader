import { useState } from 'react';
import { FileText, X, ChevronLeft, ChevronRight, Upload, ChevronDown, ChevronUp, Moon, Sun } from 'lucide-react';
import { MarkdownDocument } from '../types';
import { DropZone } from './DropZone';

interface SidebarProps {
  documents: MarkdownDocument[];
  selectedDocId: string | null;
  onSelectDocument: (doc: MarkdownDocument) => void;
  onDeleteDocument: (id: string) => void;
  onFileUpload: (name: string, content: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function Sidebar({
  documents,
  selectedDocId,
  onSelectDocument,
  onDeleteDocument,
  onFileUpload,
  isCollapsed,
  onToggleCollapse,
  isDarkMode,
  onToggleDarkMode,
}: SidebarProps) {
  const [isDropZoneExpanded, setIsDropZoneExpanded] = useState(true);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <>
      <div
        className={`
          relative h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
          transition-all duration-300 ease-in-out flex flex-col
          ${isCollapsed ? 'w-0' : 'w-80'}
        `}
      >
        <div className={`flex-1 overflow-hidden ${isCollapsed ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}>
          {/* Header with Dark Mode Toggle */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                Documents
              </h2>
              <button
                onClick={onToggleDarkMode}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {documents.length} {documents.length === 1 ? 'document' : 'documents'}
            </p>
          </div>

          {/* Upload Section */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            {isDropZoneExpanded ? (
              <div className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload File
                  </h3>
                  <button
                    onClick={() => setIsDropZoneExpanded(false)}
                    className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Collapse upload area"
                  >
                    <ChevronUp className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
                <DropZone onFileUpload={onFileUpload} />
              </div>
            ) : (
              <button
                onClick={() => setIsDropZoneExpanded(true)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
              >
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-blue-500" />
                  Upload New Document
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
              </button>
            )}
          </div>

          {/* Documents List */}
          <div className={`overflow-y-auto p-4 ${isDropZoneExpanded ? 'h-[calc(100%-380px)]' : 'h-[calc(100%-200px)]'}`}>
            {documents.length === 0 ? (
              <div className="text-center py-12 px-4">
                <FileText className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  No documents yet. Upload a markdown file to get started.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className={`
                      group relative p-4 rounded-lg cursor-pointer transition-all
                      ${
                        selectedDocId === doc.id
                          ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500'
                          : 'bg-gray-50 dark:bg-gray-700/50 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                      }
                    `}
                    onClick={() => onSelectDocument(doc)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 dark:text-gray-50 truncate mb-1">
                          {doc.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(doc.updatedAt)}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteDocument(doc.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-all"
                        aria-label="Delete document"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Collapse/Expand Button */}
      <button
        onClick={onToggleCollapse}
        className={`
          absolute top-6 z-10 p-2 rounded-lg bg-white dark:bg-gray-800
          border border-gray-200 dark:border-gray-700 shadow-lg
          hover:bg-gray-50 dark:hover:bg-gray-700 transition-all
          ${isCollapsed ? 'left-4' : 'left-[304px]'}
        `}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? (
          <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        ) : (
          <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        )}
      </button>
    </>
  );
}
