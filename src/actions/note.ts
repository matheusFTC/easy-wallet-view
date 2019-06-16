import { INote } from '@/interfaces/i-note';

export const insertNote = (note: INote) => ({ type: 'note/insertNote', note });
