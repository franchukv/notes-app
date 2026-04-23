import cn from 'classnames';
import { useState, type InputHTMLAttributes } from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';
import { Hint } from '../../ui/hint/Hint';
import Eye from '../../assets/icons/eye-icon.svg?react';
import EyeClosed from '../../assets/icons/eye-closed-icon.svg?react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegisterReturn;
  extraLink?: React.ReactNode;
  title?: string;
  hint?: string;
  error?: string;
}

export const InputField = ({
  id,
  type = 'text',
  register,
  title,
  hint,
  error,
  extraLink,
  ...restProps
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { disabled } = restProps;
  const inputType =
    type === 'password' ? (showPassword ? 'text' : 'password') : type;
  const inputClassNames = cn(
    'h-10.5 w-full px-4 text-preset-5 text-neutral-950 bg-white placeholder:text-neutral-500 border border-neutral-300 rounded-lg shadow-[0_1px_2px_0_rgba(10,13,20,0.03)] not-focus:hover:bg-neutral-50 not-focus:hover:text-neutral-500 disabled:bg-neutral-50! disabled:text-neutral-300! disabled:pointer-events-none',
    type === 'password' && 'pr-10',
    error && 'border-red-500',
  );

  return (
    <label htmlFor={id} className="w-full flex flex-col gap-1.5">
      {title && (
        <span className="w-full flex items-center justify-between text-preset-4">
          {title} {extraLink}
        </span>
      )}

      <span className="w-full flex relative">
        <input
          {...register}
          id={id}
          type={inputType}
          className={inputClassNames}
          {...restProps}
        />

        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword((sp) => !sp)}
            className="absolute top-1/2  right-4 -translate-y-1/2 cursor-pointer disabled:text-neutral-300 disabled:pointer-events-none"
            disabled={disabled}
          >
            {showPassword ? <EyeClosed /> : <Eye />}
          </button>
        )}
      </span>

      {hint && !error && <Hint text={hint} />}

      {error && <Hint text={error} type="error" />}
    </label>
  );
};
