export interface ConfirmDeleteNoteModalPayload {
  modal: 'confirm-delete-note';
  props: {
    noteId: number;
    noteSlug: string;
    parentUrl: string;
  };
}

export interface ConfirmDeleteTagModalPayload {
  modal: 'confirm-delete-tag';
  props: {
    tagId: number;
    tagSlug: string;
    parentUrl: string;
  };
}

export interface ConfirmArchiveNoteModalPayload {
  modal: 'confirm-archive-note';
  props: {
    noteId: number;
    isArchived: boolean;
    parentUrl: string;
  };
}

export type ModalPayload =
  | ConfirmDeleteNoteModalPayload
  | ConfirmDeleteTagModalPayload
  | ConfirmArchiveNoteModalPayload;
