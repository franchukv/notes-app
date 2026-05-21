import { resetPasswordSchema } from './reset-password-schema';

describe('resetPasswordSchema', () => {
  test('passes when passwords are correct and equal', () => {
    const result = resetPasswordSchema.safeParse({
      password: 'password',
      confirmPassword: 'password',
    });

    expect(result.success).toBeTruthy();
  });

  test('fails when passwords is too short', () => {
    const result = resetPasswordSchema.safeParse({
      password: 'pass',
      confirmPassword: 'pass',
    });

    expect(result.success).toBeFalsy();
  });

  test('fails when passwords are not equal', () => {
    const result = resetPasswordSchema.safeParse({
      password: 'password',
      confirmPassword: 'confirmPassword',
    });

    expect(result.success).toBeFalsy();
    expect(result.error?.issues[0].message).toBe('Passwords do not match');
  });
});
