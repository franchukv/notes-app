import { changePasswordSchema } from './change-password-schema';

describe('changePasswordSchema', () => {
  test('passes when old password is correct and new one is correct and equal in both fields', () => {
    const result = changePasswordSchema.safeParse({
      oldPassword: 'oldPassword',
      newPassword: 'newPassword',
      confirmPassword: 'newPassword',
    });

    expect(result.success).toBeTruthy();
  });

  test('fails when any password are not correct', () => {
    const result = changePasswordSchema.safeParse({
      oldPassword: 'oldPass',
      newPassword: 'newPass',
      confirmPassword: 'newPass',
    });

    expect(result.success).toBeFalsy();
  });

  test('fails when old and new passwords are equal', () => {
    const result = changePasswordSchema.safeParse({
      oldPassword: 'oldPassword',
      newPassword: 'oldPassword',
      confirmPassword: 'oldPassword',
    });

    expect(result.success).toBeFalsy();
    expect(result.error?.issues[0].message).toBe(
      'New password must be different from old password',
    );
  });

  test('fails when old password is correct but new and confirm passwords are not equal', () => {
    const result = changePasswordSchema.safeParse({
      oldPassword: 'oldPassword',
      newPassword: 'newPassword',
      confirmPassword: 'newerPassword',
    });

    expect(result.success).toBeFalsy();
    expect(result.error?.issues[0].message).toBe('Passwords do not match');
  });
});
