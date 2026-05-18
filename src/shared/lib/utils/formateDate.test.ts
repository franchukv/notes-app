import { describe, expect, test } from 'vitest';
import { formatDate } from './formatDate';

describe('formatDate', () => {
  test('formats date correctly', () => {
    expect(formatDate('2026-05-18')).toBe('18 May 2026');
  });

  test('formats long month name correctly', () => {
    expect(formatDate('2026-01-01')).toBe('01 Jan 2026');
  });
});
