import { describe, test, expect } from 'vitest';
import { generateDocumentTitle } from './generateDocumentTitle';

describe('generateDocumentTitle', () => {
  test('returns title with app title', () => {
    expect(generateDocumentTitle('Home')).toBe('Home | Notes App');
  });

  test('returns app title when pageTitle is undefined', () => {
    expect(generateDocumentTitle(undefined)).toBe('Notes App');
  });
});
