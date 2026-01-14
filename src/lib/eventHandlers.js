import generateText from './exampleTextGenerator'
import storage from './storage'

export const setupEventHandlers = (
  exampleBtn,
  clearBtn,
  textBox,
  infoBox,
  setResult,
  makeCalculation
) => {
  let exampleIntervalId = null

  exampleBtn.addEventListener('click', () => {
    const textGenerator = generateText()
    if (exampleIntervalId) {
      clearInterval(exampleIntervalId)
    }
    textBox.value = ''
    exampleIntervalId = setInterval(() => {
      const { value, done } = textGenerator.next()
      if (done) {
        clearInterval(exampleIntervalId)
        return
      }
      textBox.value += value
      textBox.dispatchEvent(new Event('input'))
    }, 100)
    textBox.focus()
  })

  clearBtn.addEventListener('click', () => {
    if (exampleIntervalId) {
      clearInterval(exampleIntervalId)
    }
    textBox.value = ''
    textBox.dispatchEvent(new Event('input'))
    textBox.dispatchEvent(new Event('blur'))
    textBox.focus()
  })

  textBox.addEventListener('input', evt => {
    const text = evt.target.value
    const { calcs, sum } = makeCalculation(text)
    setResult(calcs, sum)
  })

  textBox.addEventListener('blur', evt => {
    const text = evt.target.value

    if (text !== storage.get('text')) {
      storage.set('text', text)

      infoBox.innerText = storage.afterSetText
      infoBox.classList.add('visible')
      setTimeout(() => {
        infoBox.classList.remove('visible')
      }, 500)
    }
  })
}
