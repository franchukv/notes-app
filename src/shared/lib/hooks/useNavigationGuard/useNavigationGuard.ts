import { useEffect } from 'react';
import { useBlocker } from 'react-router';

export const useNavigationGuard = (block: boolean) => {
  const blocker = useBlocker(block);

  useEffect(() => {
    if (blocker.state !== 'blocked') {
      return;
    }

    const confirm = window.confirm('Unsaved changes will be lost. Continue?');

    if (confirm) {
      blocker.proceed();
    } else {
      blocker.reset();
    }
  }, [blocker.state]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!block) {
      return;
    }

    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener('beforeunload', handler);

    return () => {
      window.removeEventListener('beforeunload', handler);
    };
  }, [block]);
};
