import { INote } from '@/interfaces/i-note';

export default {
  setNotes(state: { notes: INote[] }, notes: INote[]) {
    state.notes = notes;
  },
  setNote(state: { note: INote }, note: INote) {
    state.note = note;
  },
};
