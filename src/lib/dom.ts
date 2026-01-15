export const getEl = (id: string): HTMLElement | null => {
  return document.getElementById(id)
}

const getTextArea = (id: string): HTMLTextAreaElement | null => {
  return getEl(id) as HTMLTextAreaElement | null
}

export const createMarkup = (): string => {
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

export interface DOMElements {
  clearBtn: HTMLElement | null
  exampleBtn: HTMLElement | null
  textBox: HTMLTextAreaElement | null
  calcsBox: HTMLElement | null
  resultBox: HTMLElement | null
  infoBox: HTMLElement | null
}

export const initializeDOM = (): DOMElements => {
  const app = getEl('app')
  if (!app) {
    throw new Error('App element not found')
  }
  app.innerHTML = createMarkup()

  return {
    clearBtn: getEl('clear'),
    exampleBtn: getEl('example'),
    textBox: getTextArea('text'),
    calcsBox: getEl('calcs'),
    resultBox: getEl('result'),
    infoBox: getEl('info'),
  }
}
