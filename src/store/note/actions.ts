import { INote } from '@/interfaces/i-note';

import fetch from '@/utils/fetch';

export default {
  fetchNotes(context: any) {
    return fetch('api/v1/notes')
      .then((res) => {
        context.commit('setNotes', res);
      });
  },
  fetchNote(context: any, { _id }: { _id: string }) {
    return fetch(`api/v1/notes/${_id}`)
      .then((res) => {
        context.commit('setNote', res);
      });
  },
  insertNote(context: any, { note }: { note: INote }) {
    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    const body = JSON.stringify(note);

    return fetch('api/v1/notes', {
      method: 'POST',
      headers,
      body,
    });
  },
  updateNote(context: any, { note }: { note: INote }) {
    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    const body = JSON.stringify(note);

    return fetch(`api/v1/notes/${note._id}`, {
      method: 'PUT',
      headers,
      body,
    });
  },
  deleteUser(context: any, { _id }: { _id: string }) {
    return fetch(`api/v1/notes/${_id}`, {
      method: 'DELETE',
    });
  },
};
