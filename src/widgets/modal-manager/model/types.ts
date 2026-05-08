export interface ConfirmDeleteNoteModalPayload {
  modal: 'confirm-delete';
  props: {
    noteId: number;
    noteSlug: string;
    parentUrl: string;
  };
}

export interface ConfirmArchiveNoteModalPayload {
  modal: 'confirm-archive';
  props: {
    noteId: number;
    isArchived: boolean;
    parentUrl: string;
  };
}

export type ModalPayload =
  | ConfirmDeleteNoteModalPayload
  | ConfirmArchiveNoteModalPayload;
