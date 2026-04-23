interface TagsListProps {
  title: string;
  children: React.ReactNode;
}

export const TagsList = ({ title, children }: TagsListProps) => {
  return (
    <div className="w-full flex flex-col gap-4 lg:gap-2">
      <h2 className="text-preset-1 lg:text-preset-4 lg:text-neutral-500">
        {title}
      </h2>

      <div className="w-full flex flex-col lg:gap-1">{children}</div>
    </div>
  );
};
