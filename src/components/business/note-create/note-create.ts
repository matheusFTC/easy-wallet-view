import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import { fetchAssets } from '@/actions/asset';
import { loggedUser } from '@/actions/authentication';
import { insertNote } from '@/actions/note';
import { INote } from '@/interfaces/i-note';
import { IUser } from '@/interfaces/i-user';
import { IAsset, IAssetQuery } from '@/interfaces/i-asset';

@Component({
  computed: {
    ...mapGetters({
      loggedUser,
    }),
  },
})
export default class NoteCreate extends Vue {
  private loggedUser: IUser;

  private assetSymbol: string = '';
  private assetPagination: any = {};
  private assetHeaders: any[] = [
    { text: 'Ação', align: 'center', value: 'action', sortable: false },
    { text: 'Cód. referência', value: 'referenceCode' },
    { text: 'Nome', value: 'name' },
    { text: 'Descrição', value: 'description' },
    { text: 'Preço (R$)', align: 'right', value: 'price' },
    { text: 'Qtd. em estoque', align: 'right', value: 'quantityInStock' },
  ];
  private assetsInNote: IAsset[] = [];
  private menuExecutedIn: boolean = false;
  private errors: any = {};
  private record: INote = {} as INote;

  private mounted() {
    this.record.user = this.loggedUser;
  }

  get valid() {
    return this.record.executedIn && this.record.settlementFee;
  }

  get assetPages() {
    if (!this.assetPagination.rowsPerPage ||
      !this.assetPagination.totalItems) {
      return 0;
    } else {
      return Math.ceil(this.assetPagination.totalItems / this.assetPagination.rowsPerPage);
    }
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

  private search() {
    this.$store.dispatch(fetchAssets({ symbol: this.assetSymbol } as IAssetQuery));
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
    this.errors = {};

    this.record.user = this.loggedUser;
    this.record.executedIn = null;
    this.record.settlementFee = null;
  }

  private goBack() {
    this.$router.replace({ name: 'resume' });
  }
}
