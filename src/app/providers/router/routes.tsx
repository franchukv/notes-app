import {
  RootLayout,
  RecoveryLayout,
  PrivateLayout,
  PublicLayout,
} from '../../layouts';
import { NotesPage } from '@/pages/notes';
import { NotFoundPage } from '@/pages/not-found';
import { AuthLoginPage } from '@/pages/auth-login';
import { AuthRegisterPage } from '@/pages/auth-register';
import { AuthCheckEmailPage } from '@/pages/auth-check-email';
import { AuthForgotPasswordPage } from '@/pages/auth-forgot-password';
import { AuthResetPasswordPage } from '@/pages/auth-reset-password';

export const routes = [
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        Component: RecoveryLayout,
        children: [
          {
            path: 'reset-password',
            Component: AuthResetPasswordPage,
            handle: { title: 'Reset Password' },
          },
        ],
      },
      {
        Component: PrivateLayout,
        children: [
          {
            index: true,
            Component: NotesPage,
            handle: { title: 'All notes' },
          },
        ],
      },
      {
        Component: PublicLayout,
        children: [
          {
            path: 'login',
            Component: AuthLoginPage,
            handle: {
              title: 'Login',
            },
          },
          {
            path: 'sign-up',
            Component: AuthRegisterPage,
            handle: { title: 'Sign Up' },
          },
          {
            path: 'check-email',
            Component: AuthCheckEmailPage,
            handle: { title: 'Check Your Email' },
          },
          {
            path: 'forgot-password',
            Component: AuthForgotPasswordPage,
            handle: {
              title: 'Forgot Password',
            },
          },
        ],
      },
      {
        path: '*',
        Component: NotFoundPage,
        handle: { title: 'Page not found' },
      },
    ],
  },
];
