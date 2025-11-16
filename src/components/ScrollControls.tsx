import { useState, useEffect, useRef } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface ScrollControlsProps {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

export function ScrollControls({ scrollContainerRef }: ScrollControlsProps) {
  const [showControls, setShowControls] = useState(false);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isScrollable = scrollHeight > clientHeight;

      setShowControls(isScrollable);
      setCanScrollUp(scrollTop > 100);
      setCanScrollDown(scrollTop < scrollHeight - clientHeight - 100);
    };

    handleScroll();
    container.addEventListener('scroll', handleScroll);

    // Also check on resize
    const resizeObserver = new ResizeObserver(handleScroll);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
    };
  }, [scrollContainerRef]);

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToBottom = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  if (!showControls) return null;

  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-2 z-50">
      {canScrollUp && (
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all hover:scale-110 group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-500" />
        </button>
      )}
      {canScrollDown && (
        <button
          onClick={scrollToBottom}
          className="p-3 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all hover:scale-110 group"
          aria-label="Scroll to bottom"
        >
          <ArrowDown className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-500" />
        </button>
      )}
    </div>
  );
}
