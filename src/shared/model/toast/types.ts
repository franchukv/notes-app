export interface Toast {
  id: number;
  message: string;
  type?: 'success' | 'error' | 'info';
  link?: {
    url: string;
    text: string;
  };
}
