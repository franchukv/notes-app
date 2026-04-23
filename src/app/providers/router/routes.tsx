import { Navigate } from 'react-router';
import { RecoveryGuard, PrivateGuard, PublicGuard } from '../../guards';
import { RootLayout, AppLayout } from '../../layouts';
import { NotFoundPage } from '@/pages/not-found';
import { AuthLoginPage } from '@/pages/auth-login';
import { AuthRegisterPage } from '@/pages/auth-register';
import { AuthCheckEmailPage } from '@/pages/auth-check-email';
import { AuthForgotPasswordPage } from '@/pages/auth-forgot-password';
import { AuthResetPasswordPage } from '@/pages/auth-reset-password';
import { NotesPage } from '@/pages/notes';
import { NotePage } from '@/pages/note';
import { TagsPage } from '@/pages/tags-page';
import { TagPage } from '@/pages/tag';

export const routes = [
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        Component: RecoveryGuard,
        children: [
          {
            path: 'reset-password',
            Component: AuthResetPasswordPage,
            handle: { title: 'Reset Password' },
          },
        ],
      },
      {
        Component: PrivateGuard,
        children: [
          {
            Component: AppLayout,
            children: [
              { index: true, element: <Navigate to="/notes" replace /> },
              {
                path: 'notes',
                Component: NotesPage,
                handle: { title: 'All Notes' },
                children: [
                  {
                    path: ':noteSlug',
                    Component: NotePage,
                  },
                ],
              },
              {
                path: 'tags',
                Component: TagsPage,
                handle: { title: 'All Tags' },
                children: [
                  {
                    path: ':tagSlug',
                    Component: TagPage,
                    children: [
                      {
                        path: ':noteSlug',
                        Component: NotePage,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        Component: PublicGuard,
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
