export const setupAutoResize = (
  textarea: HTMLTextAreaElement
): (() => void) => {
  const autoResize = (): void => {
    // Calculate available space (viewport height minus header, margins, padding, etc.)
    const viewportHeight = window.innerHeight
    const header = document.querySelector('header') as HTMLElement | null
    const body = document.body
    const bodyPadding =
      parseInt(getComputedStyle(body).paddingTop) +
      parseInt(getComputedStyle(body).paddingBottom)
    const headerHeight = header
      ? header.offsetHeight + parseInt(getComputedStyle(header).marginBottom)
      : 0
    const otherElementsSpace = 50 // space for calcs, result, info boxes below textarea

    const maxHeight =
      viewportHeight - headerHeight - bodyPadding - otherElementsSpace
    textarea.style.maxHeight = maxHeight + 'px'
    textarea.style.height = 'auto'

    const desiredHeight = textarea.scrollHeight
    textarea.style.height = Math.min(desiredHeight, maxHeight) + 'px'
    textarea.style.overflow = desiredHeight > maxHeight ? 'auto' : 'hidden'
  }

  textarea.addEventListener('input', autoResize)
  window.addEventListener('resize', autoResize)
  autoResize()

  return autoResize
}
