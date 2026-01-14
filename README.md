# Text Calc

Simple text parser and calculator written in pure JavaScript ES6.

Parses text for numbers with `+` or `-` signs and calculates their sum in real-time.

Demo: https://text-calc.netlify.app/

![Text Calc demo](https://raw.githubusercontent.com/pan-tom/text-calc/master/demo.gif)

## Features

- Real-time calculation as you type
- Auto-resizing textarea
- URL-based storage (text saved in URL hash)
- Click on numbers to highlight them in the textarea
- Modern, minimal UI

## Tech Stack

- **JavaScript ES6+** - Vanilla JS with ES6 modules
- **Webpack 5** - Module bundler
- **Babel 7** - JavaScript compiler
- **Sass** - CSS preprocessor
- **PostCSS** - CSS processing
- **Prettier** - Code formatter

## Requirements

- Node.js >= 22.0.0
- npm >= 10.0.0

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd text-calc
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm start
```

The dev server will automatically find an available port (starting from 3000) and open in your browser.

## Available Scripts

- `npm start` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run format` - Format code with Prettier

## Project Structure

```
src/
├── index.js          # Main entry point
├── index.scss        # Styles
├── lib/
│   ├── calculator.js        # Calculation logic
│   ├── dom.js               # DOM setup
│   ├── eventHandlers.js     # Event handlers
│   ├── exampleTextGenerator.js
│   ├── resultDisplay.js     # Result display logic
│   ├── storage.js           # URL-based storage
│   └── textareaResize.js    # Auto-resize functionality
└── public/
    └── index.html
```

## License

MIT
