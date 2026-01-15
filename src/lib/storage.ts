interface Storage {
  get: () => string
  set: (val: string) => void
  afterSetText: string
}

const storage: Storage = {
  get: (): string => {
    if (window.location.hash != '') {
      return decodeURIComponent(window.location.hash).replace('#', '')
    }
    return ''
  },

  set: (val: string): void => {
    history.pushState({ id: 'main' }, '', '#' + encodeURIComponent(val))
  },

  afterSetText: 'saved in url',
}

export { storage }
