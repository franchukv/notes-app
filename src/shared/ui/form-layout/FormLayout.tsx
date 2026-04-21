import cn from 'classnames';

interface FormLayoutProps {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export const FormLayout = ({
  icon,
  title,
  description,
  children,
  className,
}: FormLayoutProps) => {
  const classNames = cn(
    'max-w-135 w-full py-12 px-4 flex flex-col gap-10 rounded-xl bg-white border border-neutral-200 shadow-[0_8px_12px_0_rgba(240,240,240,0.6)] sm:px-12',
    className,
  );

  return (
    <div className={classNames}>
      {(icon || title || description) && (
        <header className="flex flex-col items-center gap-4">
          {icon}

          <div className="flex flex-col items-center gap-2 text-center">
            {title && <h1 className="text-preset-1">{title}</h1>}

            {description && (
              <p className="text-preset-5 text-neutral-600">{description}</p>
            )}
          </div>
        </header>
      )}

      <div className="flex flex-col items-center gap-4">{children}</div>
    </div>
  );
};
