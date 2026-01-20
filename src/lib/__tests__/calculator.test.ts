import { describe, it, expect } from 'vitest'
import { makeCalculation } from '../calculator'

describe('makeCalculation', () => {
  it('should calculate sum of positive numbers', () => {
    const text = 'John gives me +100 for a good job\n+200 from Jane'
    const result = makeCalculation(text)

    expect(result.sum).toBe(300)
    expect(result.calcs).toHaveLength(2)
    expect(result.calcs[0].num).toBe(100)
    expect(result.calcs[1].num).toBe(200)
  })

  it('should handle negative numbers', () => {
    const text = '+100 from John\n-50 from Jane'
    const result = makeCalculation(text)

    expect(result.sum).toBe(50)
    expect(result.calcs).toHaveLength(2)
    expect(result.calcs[0].num).toBe(100)
    expect(result.calcs[1].num).toBe(-50)
  })

  it('should handle decimal numbers with dot', () => {
    const text = '+100.50 from John\n+200.25 from Jane'
    const result = makeCalculation(text)

    expect(result.sum).toBe(300.75)
    expect(result.calcs).toHaveLength(2)
    expect(result.calcs[0].num).toBe(100.5)
    expect(result.calcs[1].num).toBe(200.25)
  })

  it('should handle decimal numbers with comma', () => {
    const text = '+100,50 from John\n+200,25 from Jane'
    const result = makeCalculation(text)

    expect(result.sum).toBe(300.75)
    expect(result.calcs[0].num).toBe(100.5)
    expect(result.calcs[1].num).toBe(200.25)
  })

  it('should track positions correctly', () => {
    const text = 'Start +100 middle -50 end'
    const result = makeCalculation(text)

    expect(result.calcs[0].pos).toBeGreaterThan(0)
    expect(result.calcs[1].pos).toBeGreaterThan(result.calcs[0].pos)
    expect(result.calcs[0].len).toBeGreaterThan(0)
    expect(result.calcs[1].len).toBeGreaterThan(0)
  })

  it('should return empty array and zero sum for empty text', () => {
    const result = makeCalculation('')

    expect(result.sum).toBe(0)
    expect(result.calcs).toHaveLength(0)
  })

  it('should ignore text without valid number patterns', () => {
    const text = 'This is just text without numbers'
    const result = makeCalculation(text)

    expect(result.sum).toBe(0)
    expect(result.calcs).toHaveLength(0)
  })

  it('should ignore numbers in parentheses', () => {
    const text = '+100 from John\n(-50) does not count'
    const result = makeCalculation(text)

    expect(result.sum).toBe(100)
    expect(result.calcs).toHaveLength(1)
  })

  it('should handle mixed positive and negative numbers', () => {
    const text = '+100\n-50\n+200\n-25'
    const result = makeCalculation(text)

    expect(result.sum).toBe(225)
    expect(result.calcs).toHaveLength(4)
  })

  it('should handle numbers at start of line', () => {
    const text = '+100\n-50'
    const result = makeCalculation(text)

    expect(result.sum).toBe(50)
    expect(result.calcs).toHaveLength(2)
  })

  it('should handle numbers after whitespace', () => {
    const text = '  +100  \n  -50  '
    const result = makeCalculation(text)

    expect(result.sum).toBe(50)
    expect(result.calcs).toHaveLength(2)
  })
})
