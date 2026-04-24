interface TagItemProps {
  children: React.ReactNode;
}

export const TagItem = ({ children }: TagItemProps) => {
  return (
    <div className="py-0.5 px-1.5 text-preset-6 text-center rounded-sm bg-neutral-200">
      {children}
    </div>
  );
};
