import { noteSchema } from './note-schema';

describe('noteSchema', () => {
  test('passes with valid data', () => {
    const result = noteSchema.safeParse({
      title: 'Title',
      tags: [{ label: 'Label', value: 'Value' }],
      content: 'Content',
    });

    expect(result.success).toBeTruthy();
  });

  test('passes without optional fields', () => {
    const result = noteSchema.safeParse({
      title: 'Title',
    });

    expect(result.success).toBeTruthy();
  });

  test('fails when title is empty or missing', () => {
    let result = noteSchema.safeParse({
      title: '',
    });

    expect(result.success).toBeFalsy();
    expect(result.error?.issues[0].message).toBe('Please enter the title');

    result = noteSchema.safeParse({});

    expect(result.success).toBeFalsy();
  });
});
