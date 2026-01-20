# Text Calc

Simple text parser and calculator written in TypeScript.

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

- **TypeScript** - Type-safe JavaScript
- **Webpack 5** - Module bundler
- **ts-loader** - TypeScript loader for Webpack
- **Vitest** - Fast unit testing framework
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

- `npm start` - Start development server with hot reload and type checking
- `npm run build` - Build for production
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking
- `npm test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:coverage` - Run tests with coverage report

## Project Structure

```
src/
├── index.ts          # Main entry point
├── index.scss        # Styles
├── lib/
│   ├── __tests__/          # Unit tests
│   │   ├── calculator.test.ts
│   │   ├── exampleTextGenerator.test.ts
│   │   └── storage.test.ts
│   ├── calculator.ts        # Calculation logic
│   ├── dom.ts               # DOM setup
│   ├── eventHandlers.ts     # Event handlers
│   ├── exampleTextGenerator.ts  # Example text generator for demo
│   ├── resultDisplay.ts     # Result display logic
│   ├── storage.ts           # URL-based storage
│   └── textareaResize.ts    # Auto-resize functionality
└── public/
    └── index.html
```

## License

MIT
