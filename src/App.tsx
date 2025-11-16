import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { MarkdownViewer } from './components/MarkdownViewer';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useDarkMode } from './hooks/useDarkMode';
import { MarkdownDocument } from './types';

function App() {
  const [documents, setDocuments] = useLocalStorage<MarkdownDocument[]>('markdown-documents', []);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  const selectedDocument = documents.find((doc) => doc.id === selectedDocId) || null;

  // Update page title based on selected document
  useEffect(() => {
    if (selectedDocument) {
      document.title = `${selectedDocument.name} - Markdown Reader`;
    } else {
      document.title = 'Markdown Reader';
    }
  }, [selectedDocument]);

  const handleFileUpload = (name: string, content: string) => {
    const newDoc: MarkdownDocument = {
      id: Date.now().toString(),
      name: name.replace('.md', '').replace('.markdown', ''),
      content,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    setDocuments((prev) => [newDoc, ...prev]);
    setSelectedDocId(newDoc.id);
  };

  const handleSelectDocument = (doc: MarkdownDocument) => {
    setSelectedDocId(doc.id);
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    if (selectedDocId === id) {
      setSelectedDocId(null);
    }
  };

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex bg-gray-50 dark:bg-gray-900">
      <Sidebar
        documents={documents}
        selectedDocId={selectedDocId}
        onSelectDocument={handleSelectDocument}
        onDeleteDocument={handleDeleteDocument}
        onFileUpload={handleFileUpload}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      <main className="flex-1 flex flex-col overflow-hidden p-6">
        <div className="flex-1 overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <MarkdownViewer document={selectedDocument} />
        </div>
      </main>
    </div>
  );
}

export default App;
