import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import cn from 'classnames';
import { components } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import type {
  ClassNamesConfig,
  ClearIndicatorProps,
  DropdownIndicatorProps,
  GroupBase,
  MultiValueRemoveProps,
  OptionsOrGroups,
} from 'react-select';
import CloseIcon from '../../assets/icons/close-icon.svg?react';
import BackArrow from '../../assets/icons/back-arrow-icon.svg?react';

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

const classNames: ClassNamesConfig<Option, true, GroupBase<Option>> = {
  container: () =>
    'w-full text-neutral-950 text-preset-6! sm:text-preset-5! dark:text-white!',
  control: ({ isFocused }) =>
    cn(
      'min-h-0! border! rounded-lg! shadow-[0_1px_2px_0_rgba(10,13,20,0.03)]! outline-2! outline-offset-2! dark:bg-neutral-950! dark:border-neutral-800!',
      isFocused
        ? 'border-neutral-950! outline-neutral-400!'
        : 'border-neutral-300! outline-transparent! hover:bg-neutral-50! dark:hover:bg-neutral-900!',
    ),
  input: () => 'dark:text-white!',
  valueContainer: () => 'p-1!',
  multiValue: () =>
    'py-0.5! pl-1.5! pr-1! flex items-center gap-1 bg-neutral-200! rounded-sm! dark:bg-neutral-600!',
  multiValueLabel: () => 'p-0! text-preset-6! dark:text-white!',
  multiValueRemove: () =>
    'p-0! cursor-pointer bg-transparent! hover:text-red-500',
  indicatorsContainer: () => '',
  indicatorSeparator: () => 'bg-neutral-300! dark:bg-neutral-800!',
  loadingIndicator: () => 'text-neutral-500! dark:text-white!',
  clearIndicator: () =>
    'p-2! text-neutral-500! cursor-pointer hover:text-red-500! dark:text-white!',
  dropdownIndicator: ({ selectProps }) =>
    cn(
      'p-2! text-neutral-500! cursor-pointer transition-all! duration-150! hover:text-neutral-950! dark:text-white! dark:hover:text-white!',
      selectProps.menuIsOpen && 'text-neutral-950! scale-y-[-1]',
    ),
  menu: () =>
    'rounded-lg! shadow-[0_1px_2px_0_rgba(10,13,20,0.03)]! border border-neutral-300 overflow-hidden! dark:border-neutral-800 dark:bg-neutral-950!',
  menuList: () => 'p-0!',
  option: ({ isFocused }) =>
    cn(
      'p-2! cursor-pointer!',
      isFocused && 'bg-neutral-100! dark:bg-neutral-900!',
    ),
};

const MultiValueRemove = (
  props: MultiValueRemoveProps<Option, true, GroupBase<Option>>,
) => (
  <components.MultiValueRemove {...props}>
    <CloseIcon className="h-3 w-3" />
  </components.MultiValueRemove>
);

const ClearIndicator = (
  props: ClearIndicatorProps<Option, true, GroupBase<Option>>,
) => (
  <components.ClearIndicator {...props}>
    <CloseIcon className="h-4 w-4" />
  </components.ClearIndicator>
);

const DropdownIndicator = (
  props: DropdownIndicatorProps<Option, true, GroupBase<Option>>,
) => (
  <components.DropdownIndicator {...props}>
    <BackArrow className="h-4 w-4 -rotate-90" />
  </components.DropdownIndicator>
);

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
          classNames={classNames}
          components={{
            MultiValueRemove,
            ClearIndicator,
            DropdownIndicator,
          }}
        />
      )}
    />
  );
};
