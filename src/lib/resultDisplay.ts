import { CalcItem } from './calculator'

export type SetResultFunction = (calcs: CalcItem[], sum: number) => void

export const createResultDisplay = (
  textBox: HTMLTextAreaElement,
  calcsBox: HTMLElement,
  resultBox: HTMLElement
): SetResultFunction => {
  const setResult = (calcs: CalcItem[], sum: number): void => {
    const resultText = calcs.length > 0 ? ' = ' + sum.toFixed(2) : ''
    const calcsKeys = Object.keys(calcs)

    const textBoxSelect = (el: HTMLElement): void => {
      textBox.focus()
      const posFrom = el.getAttribute('data-pos-from')
      const posTo = el.getAttribute('data-pos-to')
      if (posFrom !== null && posTo !== null) {
        textBox.setSelectionRange(parseInt(posFrom), parseInt(posTo))
      }
    }

    calcsBox.classList.toggle('visible', calcs.length > 0)
    calcsBox.innerHTML = ''

    for (const key of calcsKeys) {
      const num = calcs[parseInt(key)].num
      const numStr = num.toFixed(2).toString().replace('-', '')
      const sign = num > 0 ? ' + ' : ' - '
      const sign1st = num > 0 ? '' : '-'
      const textRange = [
        calcs[parseInt(key)].pos,
        calcs[parseInt(key)].pos + calcs[parseInt(key)].len,
      ]
      let text = ''
      text += key === '0' ? sign1st : sign
      text +=
        '<span data-pos-from="' +
        textRange[0] +
        '" data-pos-to="' +
        textRange[1] +
        '">' +
        numStr +
        '</span>'
      calcsBox.innerHTML += text
    }

    resultBox.classList.toggle('visible', resultText.length > 0)
    resultBox.innerText = resultText

    calcsBox.querySelectorAll('span').forEach(el => {
      el.addEventListener('click', () => textBoxSelect(el as HTMLElement))
    })
  }

  return setResult
}
