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
import { TagsPage } from '@/pages/tags';
import { TagPage } from '@/pages/tag';
import { CreateNotePage } from '@/pages/create-note';
import { ArchivedNotesPage } from '@/pages/archived-notes';
import { EditNotePage } from '@/pages/edit-note';
import { SearchPage } from '@/pages/search';
import { SettingsPage } from '@/pages/settings';
import { SettingsColorThemePage } from '@/pages/settings-color-theme';
import { SettingsFontThemePage } from '@/pages/settings-font-theme';
import { SettingsChangePasswordPage } from '@/pages/settings-change-password';

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
                    path: 'create-new-note',
                    Component: CreateNotePage,
                    handle: { title: 'Create New Note' },
                  },
                  {
                    path: 'edit/:noteSlug',
                    Component: EditNotePage,
                    handle: { title: 'Edit Note' },
                  },
                  {
                    path: ':noteSlug',
                    Component: NotePage,
                  },
                ],
              },
              {
                path: 'archived-notes',
                Component: ArchivedNotesPage,
                handle: { title: 'Archived Notes' },
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
                        path: 'create-new-note',
                        Component: CreateNotePage,
                        handle: { title: 'Create New Note' },
                      },
                      {
                        path: ':noteSlug',
                        Component: NotePage,
                      },
                    ],
                  },
                ],
              },
              {
                path: 'search',
                Component: SearchPage,
                handle: { title: 'Search' },
                children: [
                  {
                    path: ':noteSlug',
                    Component: NotePage,
                  },
                ],
              },
              {
                path: 'settings',
                Component: SettingsPage,
                handle: { title: 'Settings' },
                children: [
                  {
                    path: 'color-theme',
                    Component: SettingsColorThemePage,
                    handle: { title: 'Color Theme', headerTitle: 'Settings' },
                  },
                  {
                    path: 'font-theme',
                    Component: SettingsFontThemePage,
                    handle: { title: 'Font Theme', headerTitle: 'Settings' },
                  },
                  {
                    path: 'change-password',
                    Component: SettingsChangePasswordPage,
                    handle: {
                      title: 'Change Password',
                      headerTitle: 'Settings',
                    },
                  },
                ],
              },
              {
                path: '*',
                Component: NotFoundPage,
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
    ],
  },
];
