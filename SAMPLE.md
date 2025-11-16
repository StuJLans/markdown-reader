# Welcome to Markdown Reader

This is a **beautiful** and *functional* markdown reader built with React, TypeScript, and Tailwind CSS.

## Features

- 📁 **Local Storage**: All your documents are saved in your browser
- 🎨 **Beautiful Design**: Modern, clean interface with dark mode support
- 📝 **Full Markdown Support**: Renders GitHub Flavored Markdown
- 🗂️ **Sidebar Navigation**: Easy access to all your documents
- ⚡ **Fast & Responsive**: Built with Vite for optimal performance

## How to Use

1. Click or drag & drop a `.md` file into the upload area
2. Your document will be rendered beautifully
3. Access previously uploaded documents from the sidebar
4. Collapse the sidebar for distraction-free reading

## Markdown Examples

### Code Blocks

```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
}

greet('World');
```

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
```

### Tables

| Feature | Status | Priority |
|---------|--------|----------|
| File Upload | ✅ Done | High |
| Markdown Rendering | ✅ Done | High |
| Local Storage | ✅ Done | High |
| Dark Mode | ✅ Done | Medium |

### Lists

#### Unordered List
- First item
- Second item
  - Nested item
  - Another nested item
- Third item

#### Ordered List
1. Step one
2. Step two
3. Step three

### Blockquotes

> "The best way to predict the future is to invent it."
> — Alan Kay

### Links and Images

Check out [React](https://react.dev) and [Tailwind CSS](https://tailwindcss.com).

---

## Technology Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **react-markdown** - Markdown rendering
- **remark-gfm** - GitHub Flavored Markdown support
- **rehype-highlight** - Syntax highlighting

---

Made with ❤️ using modern web technologies
