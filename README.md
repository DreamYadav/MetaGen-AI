# MetaGen Pro - Automated Metadata Generation System

<div align="center">
  <img src="https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop" alt="MetaGen Pro Banner" width="100%" height="200" style="border-radius: 10px; object-fit: cover;">
  
  [![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
</div>

## 🚀 Overview

**MetaGen Pro** is a sophisticated, production-ready automated metadata generation system designed to extract, analyze, and structure metadata from various document formats. Built with modern web technologies, it provides comprehensive document analysis including content extraction, semantic analysis, entity recognition, and intelligent summarization.

### ✨ Key Features

- **🔍 Multi-Format Support**: PDF, DOCX, TXT, and image files
- **🧠 Advanced AI Analysis**: Semantic content identification and topic classification
- **📊 Comprehensive Metrics**: Readability scores, sentiment analysis, and document structure
- **🌐 Multi-Language Support**: English, Spanish, and French detection
- **📈 Real-time Processing**: Live progress tracking with visual feedback
- **💾 Multiple Export Formats**: JSON, XML, and CSV export options
- **🎨 Modern UI/UX**: Beautiful, responsive interface with smooth animations
- **⚡ High Performance**: Optimized processing with efficient algorithms

## 🎯 Use Cases

- **Document Management Systems**: Automated cataloging and classification
- **Content Analysis**: Research and academic document processing
- **Digital Libraries**: Enhanced searchability and organization
- **Compliance & Legal**: Document metadata for regulatory requirements
- **Business Intelligence**: Content analysis for strategic insights
- **Academic Research**: Large-scale document analysis and categorization

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - Modern UI library with hooks
- **TypeScript 5.5.3** - Type-safe development
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **Vite 5.4.2** - Fast build tool and development server

### Processing Libraries
- **jsPDF 2.5.1** - PDF generation and manipulation
- **Mammoth 1.6.0** - DOCX document processing
- **pdf-parse 1.1.1** - PDF text extraction

### Development Tools
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS processing and optimization
- **Autoprefixer** - CSS vendor prefixing

## 📋 Prerequisites

Before running MetaGen Pro, ensure you have the following installed:

- **Node.js** (version 18.0 or higher)
- **npm** (version 8.0 or higher) or **yarn**
- Modern web browser (Chrome, Firefox, Safari, Edge)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/metagen-pro.git
cd metagen-pro
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Start Development Server
```bash
npm run dev
# or
yarn dev
```

### 4. Open in Browser
Navigate to `http://localhost:5173` to access the application.

## 📁 Project Structure

```
metagen-pro/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── Dashboard.tsx   # Main dashboard with analytics
│   │   ├── FileUpload.tsx  # Drag & drop file upload
│   │   ├── Header.tsx      # Application header
│   │   ├── MetadataCard.tsx # Individual document display
│   │   ├── ProcessingStatus.tsx # Real-time processing status
│   │   └── ExportModal.tsx # Export functionality
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts       # Core interfaces and types
│   ├── utils/             # Utility functions
│   │   ├── fileProcessor.ts # Core processing logic
│   │   └── exportUtils.ts  # Export functionality
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite build configuration
└── README.md              # This file
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory for custom configurations:

```env
VITE_APP_NAME=MetaGen Pro
VITE_MAX_FILE_SIZE=10485760  # 10MB in bytes
VITE_SUPPORTED_FORMATS=pdf,docx,txt,jpg,jpeg,png,gif
```

### Tailwind CSS Customization
Modify `tailwind.config.js` to customize the design system:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        }
      }
    }
  }
}
```

## 📊 Features Deep Dive

### 🔍 Content Extraction
- **PDF Processing**: Advanced text extraction with layout preservation
- **DOCX Analysis**: Complete document structure parsing
- **Image OCR**: Text recognition from images (simulated)
- **Plain Text**: Direct content analysis

### 🧠 Semantic Analysis
- **Topic Classification**: 9 predefined categories with confidence scoring
- **Entity Recognition**: Email, phone, URL, date, and person extraction
- **Keyword Extraction**: Frequency-based with stop-word filtering
- **Language Detection**: Multi-language support with confidence metrics

### 📈 Analytics & Metrics
- **Readability Score**: Flesch Reading Ease calculation
- **Sentiment Analysis**: Positive, negative, neutral classification
- **Document Structure**: Headers, paragraphs, lists, tables analysis
- **Word Count & Statistics**: Comprehensive text metrics

### 💾 Export Options
- **JSON**: Structured data for API integration
- **XML**: Hierarchical format for enterprise systems
- **CSV**: Spreadsheet-compatible for analysis

## 🎨 Design System

### Color Palette
- **Primary**: Violet/Purple gradients (`#7c3aed` to `#6d28d9`)
- **Secondary**: Emerald/Teal (`#059669` to `#0f766e`)
- **Accent**: Amber/Orange (`#d97706` to `#ea580c`)
- **Neutral**: Slate tones (`#64748b` to `#1e293b`)

### Typography
- **Headings**: Inter font family, bold weights
- **Body**: System font stack for optimal readability
- **Code**: Monospace for technical content

### Components
- **Cards**: Subtle shadows with hover effects
- **Buttons**: Gradient backgrounds with smooth transitions
- **Forms**: Clean inputs with focus states
- **Modals**: Backdrop blur with smooth animations

## 🔧 API Reference

### FileProcessor Class

#### `processFile(file: File): Promise<DocumentMetadata>`
Processes a single file and returns comprehensive metadata.

**Parameters:**
- `file`: File object to process

**Returns:**
- `Promise<DocumentMetadata>`: Complete metadata object

#### `extractText(file: File): Promise<string>`
Extracts raw text content from supported file formats.

### ExportUtils Class

#### `exportAsJSON(metadata: DocumentMetadata[]): void`
Exports metadata as JSON file.

#### `exportAsXML(metadata: DocumentMetadata[]): void`
Exports metadata as XML file.

#### `exportAsCSV(metadata: DocumentMetadata[]): void`
Exports metadata as CSV file.

## 🧪 Testing

### Running Tests
```bash
npm run test
# or
yarn test
```

### Test Coverage
```bash
npm run test:coverage
# or
yarn test:coverage
```

### Manual Testing Checklist
- [ ] File upload (drag & drop and browse)
- [ ] Multiple file processing
- [ ] Export functionality (JSON, XML, CSV)
- [ ] Responsive design on different screen sizes
- [ ] Error handling for unsupported files
- [ ] Processing status updates

## 🚀 Deployment

### Build for Production
```bash
npm run build
# or
yarn build
```

### Preview Production Build
```bash
npm run preview
# or
yarn preview
```

### Deployment Options

#### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push

#### Vercel
1. Import project from GitHub
2. Configure build settings (auto-detected)
3. Deploy with zero configuration

#### Traditional Hosting
1. Run `npm run build`
2. Upload `dist/` folder contents to web server
3. Configure server for SPA routing

## 🔒 Security Considerations

- **File Size Limits**: Configurable maximum file size (default: 10MB)
- **File Type Validation**: Strict MIME type checking
- **Client-Side Processing**: No server uploads required
- **Data Privacy**: All processing happens in the browser
- **XSS Protection**: Sanitized output rendering

## 🐛 Troubleshooting

### Common Issues

#### Large File Processing
**Problem**: Browser becomes unresponsive with large files
**Solution**: Implement file size limits and chunked processing

#### Memory Usage
**Problem**: High memory consumption
**Solution**: Process files sequentially and clear processed data

#### Export Failures
**Problem**: Export doesn't work in some browsers
**Solution**: Check browser compatibility for Blob API

### Debug Mode
Enable debug logging by adding to localStorage:
```javascript
localStorage.setItem('DEBUG', 'true');
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the Repository**
2. **Create Feature Branch**: `git checkout -b feature/amazing-feature`
3. **Commit Changes**: `git commit -m 'Add amazing feature'`
4. **Push to Branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Follow the existing code style

### Code Style
- Use Prettier for formatting
- Follow ESLint rules
- Use meaningful variable names
- Add JSDoc comments for functions
- Keep components focused and reusable

## 📝 Changelog

### Version 1.0.0 (Current)
- ✨ Initial release
- 🔍 Multi-format document processing
- 🧠 Advanced semantic analysis
- 📊 Comprehensive analytics dashboard
- 💾 Multiple export formats
- 🎨 Modern, responsive UI

### Planned Features
- 🌐 Multi-language UI support
- 🔌 API integration capabilities
- 📱 Mobile app version
- 🤖 Enhanced AI analysis
- 📊 Advanced analytics dashboard
- 🔄 Batch processing improvements

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Lucide** - For the beautiful icon library
- **Vite Team** - For the fast build tool
- **Open Source Community** - For inspiration and resources

## 📞 Support

- **Documentation**: [GitHub Wiki](https://github.com/your-username/metagen-pro/wiki)
- **Issues**: [GitHub Issues](https://github.com/your-username/metagen-pro/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/metagen-pro/discussions)
- **Email**: support@metagen-pro.com

## 🌟 Show Your Support

If you find MetaGen Pro helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 🤝 Contributing to the codebase
- 📢 Sharing with others

---

<div align="center">
  <p>Made with ❤️ by the MetaGen Pro Team</p>
  <p>© 2024 MetaGen Pro. All rights reserved.</p>
</div>