export interface ConfirmDeleteModalPayload {
  modal: 'confirm-delete';
  props: {
    noteId: number;
    noteSlug: string;
    parentUrl: string;
  };
}

export interface ConfirmArchiveModalPayload {
  modal: 'confirm-archive';
  props: {
    noteId: number;
    isArchived: boolean;
    parentUrl: string;
  };
}

export type ModalPayload =
  | ConfirmDeleteModalPayload
  | ConfirmArchiveModalPayload;
