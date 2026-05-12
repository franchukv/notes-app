import { type InputHTMLAttributes } from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';

interface RadioCardProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegisterReturn;
  id: string;
  icon: React.ReactNode;
  title: string;
  text: string;
  value: string;
}

export const RadioCard = ({
  register,
  id,
  icon,
  title,
  text,
  value,
  ...restProps
}: RadioCardProps) => {
  return (
    <label htmlFor={id} className="w-full flex relative">
      <input
        {...register}
        id={id}
        type="radio"
        value={value}
        {...restProps}
        className="peer sr-only"
      />
      <span className="w-full p-4 flex items-center gap-4 cursor-pointer bg-white border border-neutral-200 rounded-xl outline-2 outline-offset-2 outline-transparent shadow-[0_1px_2px_0_rgba(10,13,20,0.03)] after:content-[''] after:min-w-4 after:w-4 after:h-4 after:ml-auto after:block after:rounded-full  after:border-2 after:border-neutral-200 not-focus:hover:bg-neutral-50 peer-checked:bg-neutral-100 peer-focus-visible:outline-neutral-400 peer-disabled:pointer-events-none peer-disabled:bg-neutral-50 peer-disabled:opacity-50 peer-checked:after:border-4 peer-checked:after:border-blue-500">
        <span className="min-w-10 w-10 h-10 flex items-center justify-center bg-white text-neutral-950 border border-neutral-200 rounded-xl [&>svg]:h-6 [&>svg]:w-6">
          {icon}
        </span>

        <span className="flex flex-col gap-1.5">
          <h4 className="text-preset-4">{title}</h4>
          <span className="text-preset-6 text-neutral-700">{text}</span>
        </span>
      </span>
    </label>
  );
};
