# Markdown Reader

I was fed up with so many markdown documents now with AI coding and being able to read them cleanly when I needed to, so I made this simple thing. Works with local storage, nothing leaves your computer so it's secure and works great.

A beautiful, modern markdown reader application. Upload and view your markdown files with a clean, distraction-free interface.

## Features

- **Beautiful Markdown Rendering**: GitHub Flavored Markdown support with syntax highlighting
- **Local Storage**: All documents are stored locally in your browser
- **Collapsible Sidebar**: Toggle the sidebar for distraction-free reading
- **Drag & Drop Upload**: Easy file upload with drag and drop support
- **Dark Mode Support**: Automatically adapts to your system theme
- **Responsive Design**: Works seamlessly on all screen sizes
- **Document Management**: View, select, and delete your documents

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## How to Use

1. **Upload a Document**: Click the upload area or drag & drop a `.md` file
2. **View Documents**: Your uploaded documents appear in the sidebar
3. **Select a Document**: Click on any document in the sidebar to view it
4. **Delete a Document**: Hover over a document and click the X button
5. **Collapse Sidebar**: Click the arrow button to collapse/expand the sidebar

## Technology Stack

- **React 19** - Modern UI library
- **TypeScript** - Type safety and better developer experience
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **react-markdown** - Markdown rendering
- **remark-gfm** - GitHub Flavored Markdown support
- **rehype-highlight** - Syntax highlighting for code blocks
- **lucide-react** - Beautiful icons

## Project Structure

```
markdown-reader/
├── src/
│   ├── components/
│   │   ├── Sidebar.tsx          # Document sidebar with navigation
│   │   ├── DropZone.tsx         # File upload component
│   │   └── MarkdownViewer.tsx   # Markdown renderer
│   ├── hooks/
│   │   └── useLocalStorage.ts   # Local storage hook
│   ├── types.ts                 # TypeScript type definitions
│   ├── App.tsx                  # Main application component
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles and Tailwind imports
├── public/
│   └── markdown-icon.svg        # App icon
├── index.html                   # HTML template
└── package.json                 # Dependencies and scripts
```

## Sample File

A sample markdown file (`SAMPLE.md`) is included in the project root. You can upload this file to see all the markdown features in action.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
