import { useState, useCallback } from 'react';
import { Upload, FileText } from 'lucide-react';

interface DropZoneProps {
  onFileUpload: (name: string, content: string) => void;
}

export function DropZone({ onFileUpload }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (file.type === 'text/markdown' || file.name.endsWith('.md')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          onFileUpload(file.name, content);
        };
        reader.readAsText(file);
      } else {
        alert('Please upload a valid Markdown (.md) file');
      }
    },
    [onFileUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  return (
    <div
      className={`
        relative border-2 border-dashed rounded-lg transition-all
        ${
          isDragging
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-[1.02]'
            : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/30 hover:border-blue-400 dark:hover:border-blue-500'
        }
      `}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <label className="cursor-pointer block p-6">
        <input
          type="file"
          accept=".md,.markdown"
          onChange={handleFileInput}
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <div
            className={`
              p-3 rounded-full transition-all
              ${
                isDragging
                  ? 'bg-blue-500 scale-110'
                  : 'bg-gray-200 dark:bg-gray-600'
              }
            `}
          >
            {isDragging ? (
              <FileText className="w-6 h-6 text-white" />
            ) : (
              <Upload className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            )}
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-50 mb-0.5">
              {isDragging ? 'Drop here' : 'Click or Drop File'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              .md or .markdown
            </p>
          </div>
        </div>
      </label>
    </div>
  );
}
