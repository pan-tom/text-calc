import { describe, it, expect, beforeEach, vi } from 'vitest'
import { storage } from '../storage'

describe('storage', () => {
  beforeEach(() => {
    // Reset hash before each test
    window.history.replaceState(null, '', window.location.pathname)
  })

  it('should return empty string when hash is empty', () => {
    window.history.replaceState(null, '', window.location.pathname)
    expect(storage.get()).toBe('')
  })

  it('should get value from URL hash', () => {
    const testValue = 'test text content'
    window.history.replaceState(null, '', `#${encodeURIComponent(testValue)}`)
    expect(storage.get()).toBe(testValue)
  })

  it('should decode URL-encoded values', () => {
    const testValue = 'text with spaces & special chars'
    window.history.replaceState(null, '', `#${encodeURIComponent(testValue)}`)
    expect(storage.get()).toBe(testValue)
  })

  it('should set value in URL hash', () => {
    const testValue = 'new text value'
    const pushStateSpy = vi.spyOn(window.history, 'pushState')

    storage.set(testValue)

    expect(pushStateSpy).toHaveBeenCalledWith(
      { id: 'main' },
      '',
      `#${encodeURIComponent(testValue)}`
    )
  })

  it('should encode special characters when setting', () => {
    const testValue = 'text with spaces & symbols'
    const pushStateSpy = vi.spyOn(window.history, 'pushState')

    storage.set(testValue)

    expect(pushStateSpy).toHaveBeenCalledWith(
      expect.any(Object),
      expect.any(String),
      expect.stringContaining(encodeURIComponent(testValue))
    )
  })

  it('should have correct afterSetText property', () => {
    expect(storage.afterSetText).toBe('saved in url')
  })
})
