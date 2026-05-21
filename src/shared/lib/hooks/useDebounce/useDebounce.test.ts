import { act, renderHook } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('returs initial value immediately', () => {
    const { result } = renderHook(() => useDebounce({ value: 'initial' }));
    expect(result.current).toBe('initial');
  });

  test('updates value after delay', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce({ value }),
      { initialProps: { value: 'initial' } },
    );

    expect(result.current).toBe('initial');

    rerender({ value: 'updated' });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe('updated');
  });

  test('uses custom delay value', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce({ value, delay }),
      { initialProps: { value: 'initial', delay: 300 } },
    );

    rerender({ value: 'updated', delay: 500 });

    act(() => {
      vi.advanceTimersByTime(480);
    });

    expect(result.current).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(20);
    });

    expect(result.current).toBe('updated');
  });

  test('resets timer when value changes quicker than delay', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce({ value }),
      {
        initialProps: { value: 'initial' },
      },
    );

    rerender({ value: 'first update' });

    act(() => {
      vi.advanceTimersByTime(150);
    });

    expect(result.current).toBe('initial');

    rerender({ value: 'second update' });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe('second update');
  });
});
