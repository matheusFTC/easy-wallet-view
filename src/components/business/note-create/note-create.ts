import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import { loggedUser } from '@/actions/authentication';
import { insertNote } from '@/actions/note';
import { INote } from '@/interfaces/i-note';
import { IUser } from '@/interfaces/i-user';

@Component({
  computed: {
    ...mapGetters({
      loggedUser,
    }),
  },
})
export default class NoteCreate extends Vue {
  private loggedUser: IUser;

  private menuExecutedIn: boolean = false;
  private errors: any = {};
  private record: INote = {} as INote;

  private mounted() {
    this.record.user = this.loggedUser;
  }

  get valid() {
    return this.record.executedIn && this.record.settlementFee;
  }

  private formatExecutedIn() {
    if (this.record.executedIn) {
      const date = new Date(this.record.executedIn as Date);

      date.setDate(date.getDate() + 1);

      this.record.executedInFormatted = date.toLocaleDateString();
    } else {
      this.record.executedInFormatted = '';
    }
  }

  private submit() {
    if (this.valid) {
      this.$store.dispatch(insertNote(this.record)).then((res) => {
        if (!res.errors && !res.error) {
          this.clear();

          this.$notify({
            group: 'simple-notifications',
            title: 'Nova nota de corretagem',
            text: 'Nota de corretagem inserida com sucesso!',
            type: 'success',
          });
        } else if (res.error) {
          this.$notify({
            group: 'simple-notifications',
            title: 'Ops!',
            text: res.error,
            type: 'error',
          });
        } else {
          this.errors = res.errors;
        }
      }).catch((error) => {
        this.$notify({
          group: 'simple-notifications',
          title: 'Ops!',
          text: error,
          type: 'error',
        });
      });
    }
  }

  private clear() {
    (this.$refs.form as any).reset();

    this.errors = {};

    this.record.user = this.loggedUser;
    this.record.executedIn = null;
    this.record.settlementFee = null;
  }

  private goBack() {
    this.$router.replace({ name: 'resume' });
  }
}
