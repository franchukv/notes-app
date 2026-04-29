import { useOAuthMutation } from '../api/authOAuthApi';
import { Button } from '@/shared/ui';
import GoogleIcon from '@/shared/assets/icons/ggle-icon.svg?react';

export const AuthOAuth = () => {
  const [OAuth] = useOAuthMutation();

  return (
    <div className="w-full py-4 flex flex-col items-center gap-4 text-center border-y border-neutral-200">
      <span className="text-preset-5 text-neutral-600">Or log in with:</span>
      <Button
        type="button"
        onClick={() => OAuth()}
        variant="border"
        className="w-full text-preset-3 rounded-xl"
      >
        <GoogleIcon /> Google
      </Button>
    </div>
  );
};
