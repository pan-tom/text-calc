import storage from './lib/storage'
import makeCalculation from './lib/calculator'
import { initializeDOM } from './lib/dom'
import { setupAutoResize } from './lib/textareaResize'
import { createResultDisplay } from './lib/resultDisplay'
import { setupEventHandlers } from './lib/eventHandlers'
import './index.scss'

// Initialize DOM
const { clearBtn, exampleBtn, textBox, calcsBox, resultBox, infoBox } =
  initializeDOM()

// Setup textarea auto-resize
setupAutoResize(textBox)

// Create result display function
const setResult = createResultDisplay(textBox, calcsBox, resultBox)

// Setup event handlers
setupEventHandlers(
  exampleBtn,
  clearBtn,
  textBox,
  infoBox,
  setResult,
  makeCalculation
)

// Initialize with stored text
textBox.value = storage.get('text')
textBox.dispatchEvent(new Event('input'))
