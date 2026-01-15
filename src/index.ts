import { storage } from './lib/storage'
import { makeCalculation } from './lib/calculator'
import { initializeDOM, type DOMElements } from './lib/dom'
import { setupAutoResize } from './lib/textareaResize'
import {
  createResultDisplay,
  type SetResultFunction,
} from './lib/resultDisplay'
import { setupEventHandlers } from './lib/eventHandlers'
import './index.scss'

// Initialize DOM
const {
  clearBtn,
  exampleBtn,
  textBox,
  calcsBox,
  resultBox,
  infoBox,
}: DOMElements = initializeDOM()

// Validate all required elements exist
if (
  !clearBtn ||
  !exampleBtn ||
  !textBox ||
  !calcsBox ||
  !resultBox ||
  !infoBox
) {
  throw new Error('Required DOM elements not found')
}

// Setup textarea auto-resize
setupAutoResize(textBox)

// Create result display function
const setResult: SetResultFunction = createResultDisplay(
  textBox,
  calcsBox,
  resultBox
)

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
textBox.value = storage.get()
textBox.dispatchEvent(new Event('input'))
