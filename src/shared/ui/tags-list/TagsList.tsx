interface TagsListProps {
  title: string;
  children: React.ReactNode;
}

export const TagsList = ({ title, children }: TagsListProps) => {
  return (
    <div className="pt-2 w-full flex flex-col gap-4 lg:gap-2">
      <h2 className="max-lg:text-preset-1 lg:text-preset-4 lg:text-neutral-500">
        {title}
      </h2>

      <div className="w-full flex flex-col lg:gap-1 overflow-auto lg:max-h-[calc(100dvh-219px)] lg:min-h-60">
        {children}
      </div>
    </div>
  );
};
