export const createResultDisplay = (textBox, calcsBox, resultBox) => {
  const setResult = (calcs, sum) => {
    const resultText = calcs.length > 0 ? ' = ' + sum.toFixed(2) : ''
    const calcsKeys = Object.keys(calcs)

    const textBoxSelect = el => {
      textBox.focus()
      textBox.setSelectionRange(
        el.getAttribute('data-pos-from'),
        el.getAttribute('data-pos-to')
      )
    }

    calcsBox.classList.toggle('visible', calcs.length)
    calcsBox.innerHTML = ''

    for (const key of calcsKeys) {
      const num = calcs[key].num
      const numStr = num.toFixed(2).toString().replace('-', '')
      const sign = num > 0 ? ' + ' : ' - '
      const sign1st = num > 0 ? '' : '-'
      const textRange = [calcs[key].pos, calcs[key].pos + calcs[key].len]
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

    resultBox.classList.toggle('visible', resultText.length)
    resultBox.innerText = resultText

    calcsBox.querySelectorAll('span').forEach(el => {
      el.addEventListener('click', () => textBoxSelect(el))
    })
  }

  return setResult
}
