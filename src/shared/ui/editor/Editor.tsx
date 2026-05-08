import {
  type FieldValues,
  type Path,
  type Control,
  Controller,
} from 'react-hook-form';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const toolbarOptions = [
  [{ header: [2, 3, 4, 5, 6, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['blockquote', 'code-block'],
  ['link'],
  ['clean'],
];

interface EditorProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
}

export const Editor = <T extends FieldValues>({
  name,
  control,
}: EditorProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <ReactQuill
          {...field}
          theme="snow"
          value={field.value ?? ''}
          onChange={field.onChange}
          modules={{
            toolbar: toolbarOptions,
          }}
        />
      )}
    />
  );
};
