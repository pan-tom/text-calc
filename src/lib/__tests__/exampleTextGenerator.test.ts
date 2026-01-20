import { describe, it, expect } from 'vitest'
import { generateText } from '../exampleTextGenerator'

describe('generateText', () => {
  it('should yield all characters from the example text', () => {
    const generator = generateText()
    const allChars: string[] = []

    let result = generator.next()
    while (!result.done) {
      allChars.push(result.value)
      result = generator.next()
    }

    expect(allChars.length).toBeGreaterThan(0)
    expect(result.done).toBe(true)
  })

  it('should yield characters one at a time', () => {
    const generator = generateText()
    const first = generator.next()
    const second = generator.next()

    expect(first.done).toBe(false)
    expect(second.done).toBe(false)
    expect((first.value as string).length).toBe(1)
  })

  it('should eventually complete', () => {
    const generator = generateText()
    let count = 0
    let result = generator.next()

    while (!result.done && count < 1000) {
      count++
      result = generator.next()
    }

    expect(result.done).toBe(true)
  })

  it('should contain expected example text characters', () => {
    const generator = generateText()
    const text = Array.from(generator).join('')

    expect(text).toContain('+100')
    expect(text).toContain('-200')
    expect(text).toContain('+300')
  })
})
