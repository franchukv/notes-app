# Notes App

A full-featured note-taking web application built with React 19 and Supabase. Supports rich text editing, tag-based organization, archiving, full-text search, and user personalization — with a fully responsive layout for desktop, tablet, and mobile.

**Live demo:** [notes-app-bcks.vercel.app]{target="\_blank"}(https://notes-app-bcks.vercel.app/)
**Test credentials:** `test@test.com` / `00000000`

---

## Features

- **Authentication** — email/password sign-up and login, Google OAuth, forgot/reset password flow via email link
- **Rich text editor** — powered by React Quill with full formatting support
- **Tag system** — create and assign multiple tags to notes, browse notes by tag
- **Archive** — archive and restore notes without deleting them
- **Full-text search** — search across note titles and content in real time (debounced)
- **Settings** — choose color theme (light / dark / system), font theme (sans-serif / serif / monospace), and change password
- **Master-detail layout** — the entire interface is built around the master-detail pattern: a list panel (notes, tags, search results) and a detail panel (note content, editor, settings page) update independently via nested routes, so the URL always reflects the exact view state
- **Modal system** — destructive actions (delete note, delete tag, confirm archive) are handled through a centralized `ModalManager` widget driven by a Redux slice, so any feature can open a modal by dispatching an action without coupling to the rendering layer
- **Responsive UI** — adaptive layout for desktop, tablet, and mobile with a bottom navigation bar on small screens
- **Skeleton loaders** — smooth loading states throughout the app
- **Toast notifications** — feedback for user actions

---

## Tech Stack

| Layer            | Technology                   |
| ---------------- | ---------------------------- |
| Framework        | React 19                     |
| Language         | TypeScript 6                 |
| Build tool       | Vite 8                       |
| Styling          | Tailwind CSS v4              |
| State management | Redux Toolkit + RTK Query    |
| Backend / DB     | Supabase (PostgreSQL + Auth) |
| Routing          | React Router v7              |
| Forms            | React Hook Form + Zod        |
| Rich text        | React Quill                  |
| Animations       | Motion                       |
| Testing          | Vitest + Testing Library     |
| Deployment       | Vercel                       |

---

## Architecture

The project follows **Feature-Sliced Design (FSD)** — a layered frontend architecture with strict import rules enforced via `eslint-plugin-fsd-lint`.

```
src/
├── app/          # Entry point, providers, router, store, global styles
├── pages/        # Route-level components (one per page)
├── widgets/      # Composite UI blocks (Sidebar, Header, NotesList, etc.)
├── features/     # User interactions (create-note, delete-note, auth-login, etc.)
├── entities/     # Domain models and API (note, tag, user, profile)
└── shared/       # Reusable UI, hooks, utils, API client
```

Each slice exposes a public API through `index.ts`. Cross-slice communication is handled via explicit `@x` boundary files.

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project

### Installation

```bash
git clone https://github.com/franchukv/notes-app.git
cd notes-app
npm install
```

### Environment variables

Create a `.env` file in the root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
VITE_SITE_URL=http://localhost:5173
```

### Run locally

```bash
npm run dev
```

### Build

```bash
npm run build
```

---

## Testing

The project uses **Vitest** with **Testing Library** in a jsdom environment.

```bash
# Run tests
npm run test

# Run with coverage
npm run coverage
```

Tests cover: validation schemas (credentials, password change, reset, note), shared utilities (`formatDate`, `generateDocumentTitle`, `profileStorage`), hooks (`useDebounce`, `useNavigationGuard`), and UI components (`Button`).

---

## Key Implementation Details

**Master-detail pattern** — all main views (notes, archived notes, tags, search) are built as nested routes where the list and the detail panel coexist at the same URL level. Navigating between notes updates only the detail outlet without remounting the list, and the URL always reflects the full view state — making deep-linking and browser history work naturally.

**Centralized modal management** — instead of per-component modal state, confirmation dialogs (delete note, delete tag, confirm archive) are controlled via a dedicated Redux slice in the `modal-manager` widget. Any feature dispatches an action with the modal type and payload; `ModalManager` renders the correct dialog reactively. This decouples triggering logic from rendering and makes it trivial to add new modals without touching the call sites.

**RTK Query + Supabase** — all server state is managed via RTK Query with a custom `queryFn` adapter for Supabase. A Redux middleware (`supabaseAuthMiddleware`) listens to Supabase auth events and invalidates cache tags on sign-in/sign-out, keeping the UI in sync.

**Route guards** — three guards protect routes: `PrivateGuard` (requires authenticated session), `PublicGuard` (redirects logged-in users away from auth pages), and `RecoveryGuard` (allows access to the reset-password page only during an active password recovery flow).

**Theme system** — color and font themes are persisted per user in Supabase and applied at the root `<html>` level via CSS classes and `data-font` attribute. The system theme option subscribes to `prefers-color-scheme` media query changes.

**Responsive detection** — device type (mobile / tablet / desktop) is tracked in Redux state and drives layout decisions such as showing the bottom navigation bar or sidebar.

**XSS protection** — rich text content is sanitized with DOMPurify before rendering.

**Slug-based routing** — notes and tags are accessed via human-readable slugs, generated server-side in Supabase via PostgreSQL stored procedures (`create_note_with_tags`, `update_note_with_tags`).

---

## Project Structure

```
src/
├── main.tsx
├── vite-env.d.ts
│
├── app/
│   ├── App.tsx
│   ├── guards/
│   │   ├── PrivateGuard.tsx        # Redirects unauthenticated users to /login
│   │   ├── PublicGuard.tsx         # Redirects authenticated users away from auth pages
│   │   ├── RecoveryGuard.tsx       # Allows /reset-password only during recovery flow
│   │   └── index.ts
│   ├── layouts/
│   │   ├── AppLayout.tsx           # Main app shell (sidebar + header + outlet)
│   │   ├── RootLayout.tsx          # Root shell wrapping all routes
│   │   └── index.ts
│   ├── providers/
│   │   ├── AppProviders.tsx
│   │   ├── router/
│   │   │   ├── router.ts
│   │   │   └── routes.tsx          # Full nested route tree
│   │   └── store/
│   │       ├── index.ts
│   │       └── middleware/
│   │           └── supabaseMiddleware.ts  # Auth event listener → cache invalidation
│   └── styles/
│       └── global.css
│
├── pages/
│   ├── notes/ui/NotesPage.tsx              # All notes (master panel)
│   ├── note/ui/NotePage.tsx                # Single note view (detail panel)
│   ├── create-note/ui/CreateNotePage.tsx
│   ├── edit-note/ui/EditNotePage.tsx
│   ├── archived-notes/ui/ArchivedNotesPage.tsx
│   ├── tags/ui/TagsPage.tsx
│   ├── tag/ui/TagPage.tsx                  # Notes filtered by tag
│   ├── search/ui/SearchPage.tsx
│   ├── settings/ui/SettingsPage.tsx
│   ├── settings-color-theme/ui/SettingsColorThemePage.tsx
│   ├── settings-font-theme/ui/SettingsFontThemePage.tsx
│   ├── settings-change-password/ui/SettingsChangePasswordPage.tsx
│   ├── auth-login/ui/AuthLoginPage.tsx
│   ├── auth-register/ui/AuthRegisterPage.tsx
│   ├── auth-check-email/ui/AuthCheckEmailPage.tsx
│   ├── auth-forgot-password/ui/AuthForgotPasswordPage.tsx
│   ├── auth-reset-password/ui/AuthResetPasswordPage.tsx
│   └── not-found/ui/NotFoundPage.tsx
│
├── widgets/
│   ├── sidebar/
│   │   ├── @x/TagsList.ts                  # Cross-slice boundary for TagsList
│   │   └── ui/Sidebar.tsx                  # Desktop sidebar with navigation and tag list
│   ├── header/
│   │   └── ui/Header.tsx
│   ├── bottom-navigation-bar/
│   │   └── ui/BottomNavigationBar.tsx      # Mobile/tablet bottom nav
│   ├── notes-list/
│   │   └── ui/NotesList.tsx                # Scrollable master list of notes
│   ├── note-content/
│   │   └── ui/
│   │       ├── NoteContent.tsx             # Detail panel: rendered note
│   │       └── SkeletonNoteContent.tsx
│   ├── note-actions/
│   │   ├── @x/modal-manager.ts             # Cross-slice boundary for ModalManager
│   │   └── ui/NoteActionsWidget.tsx        # Archive / restore / delete toolbar
│   ├── action-bar/
│   │   └── ui/ActionBarWidget.tsx          # Contextual top action bar
│   ├── tags-list/
│   │   └── ui/TagsList.tsx
│   ├── modal-manager/
│   │   ├── model/
│   │   │   ├── modalSlice.ts               # Redux slice: open/close modal by type + payload
│   │   │   └── types.ts
│   │   └── ui/ModalManager.tsx             # Renders the active modal from Redux state
│   ├── toasts-manager/
│   │   └── ui/ToastsManager.tsx
│   ├── auth-login/ui/AuthLoginWidget.tsx
│   ├── auth-register/ui/AuthRegisterWidget.tsx
│   ├── auth-check-email/ui/AuthCheckEmailWidget.tsx
│   ├── auth-forgot-password/ui/AuthForgotPasswordWidget.tsx
│   └── auth-reset-password/ui/AuthResetPasswordWidget.tsx
│
├── features/
│   ├── auth-login/
│   │   ├── api/authLoginApi.ts
│   │   └── ui/AuthLoginForm.tsx
│   ├── auth-register/
│   │   ├── api/authRegisterApi.ts
│   │   └── ui/AuthRegisterForm.tsx
│   ├── auth-oauth/
│   │   ├── api/authOAuthApi.ts
│   │   └── ui/AuthOAuth.tsx                # Google OAuth button
│   ├── auth-forgot-password/
│   │   ├── api/authForgotPasswordApi.ts
│   │   └── ui/AuthForgotPasswordForm.tsx
│   ├── auth-reset-password/
│   │   ├── api/authResetPasswordApi.ts
│   │   └── ui/AuthResetPasswordForm.tsx
│   ├── create-note/
│   │   └── ui/CreateNoteForm.tsx
│   ├── edit-note/
│   │   └── ui/EditNoteForm.tsx
│   ├── delete-note/
│   │   └── ui/ConfirmDeleteNoteModal.tsx   # Modal content for delete confirmation
│   ├── archive-note/
│   │   └── ui/ConfirmArchiveNoteModal.tsx  # Modal content for archive confirmation
│   ├── restore-note/
│   │   └── lib/hooks/useRestoreNote.ts
│   ├── delete-tag/
│   │   └── ui/ConfirmDeleteTagModal.tsx    # Modal content for tag delete confirmation
│   ├── search/
│   │   └── ui/SearchForm.tsx
│   ├── change-password/
│   │   └── ui/ChangePasswordForm.tsx
│   ├── update-color-theme/
│   │   └── ui/UpdateColorThemeForm.tsx
│   └── update-font-theme/
│       └── ui/UpdateFontThemeForm.tsx
│
├── entities/
│   ├── note/
│   │   ├── @x/tag.ts                       # Cross-slice Tag type import
│   │   ├── api/
│   │   │   ├── noteApi.ts                  # RTK Query: CRUD, search, archive, slug lookup
│   │   │   └── mappers.ts                  # NoteDTO → Note
│   │   ├── model/
│   │   │   ├── types.ts                    # Note, NoteDTO types
│   │   │   └── validation/note-schema.ts   # Zod schema (+ .test.ts)
│   │   └── ui/
│   │       ├── NoteItem.tsx                # Note card in the master list
│   │       └── SkeletonNoteItem.tsx
│   ├── tag/
│   │   ├── api/
│   │   │   ├── tagApi.ts
│   │   │   └── mappers.ts
│   │   ├── model/types.ts
│   │   └── ui/
│   │       ├── TagButton.tsx
│   │       ├── TagItem.tsx
│   │       └── SkeletonTagButton.tsx
│   ├── user/
│   │   ├── api/userApi.ts
│   │   └── model/
│   │       ├── index.ts                    # Redux slice (isRecoveryFlow)
│   │       └── validation/
│   │           ├── credentials-schema/     # (+ .test.ts)
│   │           ├── change-password-schema/ # (+ .test.ts)
│   │           └── reset-password-schema/  # (+ .test.ts)
│   └── profile/
│       ├── api/profileApi.ts
│       └── model/
│           ├── types.ts
│           └── validation/
│               ├── color-theme-schema.ts   # z.enum(['light','dark','system'])
│               └── font-theme-schema.ts    # z.enum(['sans-serif','serif','monospace'])
│
└── shared/
    ├── api/
    │   ├── supabaseClient.ts               # createClient(url, key)
    │   └── supabaseApi.ts                  # RTK Query base API with tag types
    ├── config/index.ts                     # Env vars (SUPABASE_URL, SITE_URL, etc.)
    ├── assets/icons/                       # SVG icons (imported as React components via svgr)
    ├── ui/
    │   ├── button/Button.tsx               # (+ Button.test.tsx)
    │   ├── input-field/InputField.tsx
    │   ├── modal/Modal.tsx                 # Base modal wrapper
    │   ├── toast/Toast.tsx
    │   ├── editor/Editor.tsx               # React Quill wrapper
    │   ├── creatable-multi-select/         # React Select with tag creation
    │   ├── skeleton/Skeleton.tsx
    │   ├── loader/Loader.tsx
    │   ├── form-layout/FormLayout.tsx
    │   ├── hint/Hint.tsx
    │   ├── notice/Notice.tsx
    │   ├── navigation-button/NavigationButton.tsx
    │   └── radio-card/RadioCard.tsx        # Theme picker card
    ├── lib/
    │   ├── hooks/
    │   │   ├── useAppDispatch.ts
    │   │   ├── useAppSelector.ts
    │   │   ├── useDebounce/               # (+ .test.ts)
    │   │   ├── useDeviceType.ts           # Dispatches mobile/tablet/desktop to Redux
    │   │   ├── useThemes.ts               # Applies color + font theme to <html>
    │   │   ├── useNavigationGuard/        # Unsaved-changes prompt (+ .test.ts)
    │   │   ├── useToast.ts
    │   │   └── useTitles.ts               # Sets document.title from route handle
    │   ├── utils/
    │   │   ├── formatDate/                # (+ .test.ts)
    │   │   ├── generateDocumentTitle/     # (+ .test.ts)
    │   │   └── profileStorage/            # localStorage helpers for profile (+ .test.ts)
    │   ├── guards/isApiError.ts
    │   ├── animations/list-variants.ts    # Motion animation presets
    │   └── tests/setup.ts                 # Vitest + Testing Library global setup
    ├── model/
    │   ├── page/                          # Current page slice
    │   ├── responsive/                    # Device type slice (mobile/tablet/desktop)
    │   ├── toast/                         # Toast queue slice
    │   └── profile/types.ts
    └── types/
        └── errors.ts
```
