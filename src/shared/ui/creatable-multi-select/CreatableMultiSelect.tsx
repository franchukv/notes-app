import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';
import type { GroupBase, OptionsOrGroups } from 'react-select';

interface Option {
  label: string;
  value: string;
}

interface CreatableMultiSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  options: OptionsOrGroups<Option, GroupBase<Option>>;
  isLoading: boolean;
}
export const CreatableMultiSelect = <T extends FieldValues>({
  name,
  control,
  options,
  isLoading,
}: CreatableMultiSelectProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <CreatableSelect
          {...field}
          isMulti
          isClearable
          isLoading={isLoading}
          options={options}
          className="w-full"
        />
      )}
    />
  );
};
