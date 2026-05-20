import type { Mock } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useNavigationGuard } from './useNavigationGuard';

let blockerState = 'unblocked';
let addEventListenerSpy: Mock;
const proceedMock = vi.fn();
const resetMock = vi.fn();
const confirmMock = vi.fn();

vi.mock('react-router', () => ({
  useBlocker: () => ({
    state: blockerState,
    proceed: proceedMock,
    reset: resetMock,
  }),
}));

vi.stubGlobal('confirm', confirmMock);

describe('useNavigationGuard', () => {
  beforeEach(() => {
    addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    vi.clearAllMocks();
    blockerState = 'unblocked';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("doesn't block navigation when block=false", () => {
    renderHook(() => useNavigationGuard(false));

    expect(addEventListenerSpy).not.toHaveBeenCalled();
    expect(confirmMock).not.toHaveBeenCalled();
    expect(proceedMock).not.toHaveBeenCalled();
    expect(resetMock).not.toHaveBeenCalled();
  });

  test('proceeds navigation when block=true and has confirm', () => {
    blockerState = 'blocked';
    confirmMock.mockReturnValue(true);

    renderHook(() => useNavigationGuard(true));

    expect(addEventListenerSpy).toHaveBeenCalled();
    expect(confirmMock).toHaveBeenCalled();
    expect(proceedMock).toHaveBeenCalled();
    expect(resetMock).not.toHaveBeenCalled();
  });

  test("doesn't proceeds navigation on block=true and hasn't confirm", () => {
    blockerState = 'blocked';
    confirmMock.mockReturnValue(false);

    renderHook(() => useNavigationGuard(true));

    expect(addEventListenerSpy).toHaveBeenCalled();
    expect(confirmMock).toHaveBeenCalled();
    expect(proceedMock).not.toHaveBeenCalled();
    expect(resetMock).toHaveBeenCalled();
  });

  test('removes beforeunload listener on cleanup', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useNavigationGuard(true));

    expect(addEventListenerSpy).toHaveBeenCalled();

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalled();
  });
});
