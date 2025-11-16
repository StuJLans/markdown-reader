import { useState, useEffect } from 'react';
import { List, X, ChevronRight, ChevronDown } from 'lucide-react';

interface Heading {
  id: string;
  text: string;
  level: number;
  children?: Heading[];
}

interface TableOfContentsProps {
  content: string;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

export function TableOfContents({ content, scrollContainerRef }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Extract headings from markdown content
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const flatHeadings: Heading[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');

      flatHeadings.push({ id, text, level, children: [] });
    }

    // Build hierarchical structure - only show H1 and H2 at top level
    const hierarchical: Heading[] = [];
    const stack: Heading[] = [];

    flatHeadings.forEach((heading) => {
      // Remove all items from stack that are same level or deeper
      while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
        stack.pop();
      }

      if (heading.level <= 2) {
        // Top-level items (H1 and H2)
        hierarchical.push(heading);
        stack.push(heading);
      } else {
        // Nested items (H3+)
        if (stack.length > 0) {
          const parent = stack[stack.length - 1];
          if (!parent.children) parent.children = [];
          parent.children.push(heading);
          stack.push(heading);
        } else {
          // No parent found, add to top level
          hierarchical.push(heading);
          stack.push(heading);
        }
      }
    });

    setHeadings(hierarchical);
  }, [content]);

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const scrollToHeading = (id: string) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const element = container.querySelector(`[id="${id}"]`);
    if (element) {
      const containerTop = container.getBoundingClientRect().top;
      const elementTop = element.getBoundingClientRect().top;
      const scrollOffset = elementTop - containerTop - 20; // 20px offset from top

      container.scrollBy({
        top: scrollOffset,
        behavior: 'smooth',
      });
    }
  };

  const renderHeading = (heading: Heading, depth: number = 0) => {
    const hasChildren = heading.children && heading.children.length > 0;
    const isExpanded = expandedSections.has(heading.id);

    return (
      <div key={heading.id} className="space-y-1">
        <div className="flex items-center gap-1">
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleSection(heading.id);
              }}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-500" />
              )}
            </button>
          )}
          <button
            onClick={() => {
              scrollToHeading(heading.id);
              setIsOpen(false);
            }}
            className={`
              flex-1 text-left px-3 py-2 rounded-lg transition-colors
              hover:bg-blue-50 dark:hover:bg-blue-900/20
              text-gray-700 dark:text-gray-300
              hover:text-blue-600 dark:hover:text-blue-400
              ${heading.level === 1 ? 'font-semibold text-base' : ''}
              ${heading.level === 2 ? 'font-medium text-sm' : ''}
              ${!hasChildren && depth === 0 ? 'ml-6' : ''}
            `}
          >
            {heading.text}
          </button>
        </div>

        {hasChildren && isExpanded && (
          <div className="ml-6 space-y-1">
            {heading.children!.map((child) => renderHeading(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  if (headings.length === 0) return null;

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all hover:scale-110 group"
        aria-label="Toggle table of contents"
      >
        <List className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-500" />
      </button>

      {/* TOC Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-2xl z-50 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50 flex items-center gap-2">
                  <List className="w-5 h-5 text-blue-500" />
                  Table of Contents
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Close table of contents"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              <nav className="space-y-1">
                {headings.map((heading) => renderHeading(heading))}
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
}
