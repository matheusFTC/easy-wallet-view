import { INote } from '@/interfaces/i-note';

export default {
  notes: (state: { notes: INote[] }) => {
    return state.notes;
  },
  note: (state: { note: INote }) => {
    return state.note;
  },
};
