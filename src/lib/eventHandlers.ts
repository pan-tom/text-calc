import { generateText } from './exampleTextGenerator'
import { storage } from './storage'
import { MakeCalculationFunction } from './calculator'
import { SetResultFunction } from './resultDisplay'

export const setupEventHandlers = (
  exampleBtn: HTMLElement,
  clearBtn: HTMLElement,
  textBox: HTMLTextAreaElement,
  infoBox: HTMLElement,
  setResult: SetResultFunction,
  makeCalculation: MakeCalculationFunction
): void => {
  let exampleIntervalId: number | null = null

  exampleBtn.addEventListener('click', () => {
    const textGenerator = generateText()
    if (exampleIntervalId) {
      clearInterval(exampleIntervalId)
    }
    textBox.value = ''
    exampleIntervalId = window.setInterval(() => {
      const { value, done } = textGenerator.next()
      if (done) {
        if (exampleIntervalId) {
          window.clearInterval(exampleIntervalId)
        }
        return
      }
      textBox.value += value
      textBox.dispatchEvent(new Event('input'))
    }, 100)
    textBox.focus()
  })

  clearBtn.addEventListener('click', () => {
    if (exampleIntervalId) {
      window.clearInterval(exampleIntervalId)
    }
    textBox.value = ''
    textBox.dispatchEvent(new Event('input'))
    textBox.dispatchEvent(new Event('blur'))
    textBox.focus()
  })

  textBox.addEventListener('input', (evt: Event) => {
    const target = evt.target as HTMLTextAreaElement
    const text = target.value
    const { calcs, sum } = makeCalculation(text)
    setResult(calcs, sum)
  })

  textBox.addEventListener('blur', (evt: Event) => {
    const target = evt.target as HTMLTextAreaElement
    const text = target.value

    if (text !== storage.get()) {
      storage.set(text)

      infoBox.innerText = storage.afterSetText
      infoBox.classList.add('visible')
      setTimeout(() => {
        infoBox.classList.remove('visible')
      }, 500)
    }
  })
}
