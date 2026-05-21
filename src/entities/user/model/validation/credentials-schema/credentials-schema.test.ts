import { credentialsSchema } from './credentials-schema';

describe('credentialsSchema', () => {
  test('passes when email and password are correct', () => {
    const result = credentialsSchema.safeParse({
      email: 'test@test.com',
      password: 'password',
    });

    expect(result.success).toBeTruthy();
  });

  test('fails when any field is not correct', () => {
    const result = credentialsSchema.safeParse({
      email: 'test@test.',
      password: 'passw',
    });

    expect(result.success).toBeFalsy();
  });
});
