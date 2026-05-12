interface NoticeProps {
  children: React.ReactNode;
}

export const Notice = ({ children }: NoticeProps) => {
  return (
    <div className="p-2 text-preset-5 border border-neutral-200 bg-neutral-100 rounded-lg dark:border-neutral-700 dark:bg-neutral-800">
      {children}
    </div>
  );
};
