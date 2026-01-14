export const getEl = id => document.getElementById(id)

export const createMarkup = () => {
  let markup = '<div id="container">'
  markup += '<header>'
  markup += '<h1>Text Calc</h1>'
  markup += '<div>'
  markup += '<button id="example">show example</button>'
  markup += '<button id="clear">clear</button>'
  markup += '</div>'
  markup += '</header>'
  markup += '<textarea id="text" autofocus></textarea>'
  markup += '<div id="calcs"></div>'
  markup += '<div id="result"></div>'
  markup += '<div id="info"></div>'
  markup += '</div>'
  return markup
}

export const initializeDOM = () => {
  const app = getEl('app')
  app.innerHTML = createMarkup()

  return {
    clearBtn: getEl('clear'),
    exampleBtn: getEl('example'),
    textBox: getEl('text'),
    calcsBox: getEl('calcs'),
    resultBox: getEl('result'),
    infoBox: getEl('info'),
  }
}
