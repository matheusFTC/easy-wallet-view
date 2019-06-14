import { Component, Vue } from 'vue-property-decorator';

import { INote } from '@/interfaces/i-note';

@Component
export default class NoteCreate extends Vue {
  private valid: boolean = false;
  private menuExecutedIn: boolean = false;
  private record: INote = {} as INote;

  private formatExecutedIn() {
    if (this.record.executedIn) {
      const date = new Date(this.record.executedIn as Date);

      date.setDate(date.getDate() + 1);

      this.record.executedInFormatted = date.toLocaleDateString();
    } else {
      this.record.executedInFormatted = '';
    }
  }

  private goBack() {
    this.$router.replace({ name: 'resume' });
  }
}
