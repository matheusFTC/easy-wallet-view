import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import { fetchAssets, assets, finding } from '@/actions/asset';
import { loggedUser } from '@/actions/authentication';
import { insertNote } from '@/actions/note';
import { INote, IItemCreateNote } from '@/interfaces/i-note';
import { IUser } from '@/interfaces/i-user';
import { IAsset, IAssetQuery } from '@/interfaces/i-asset';

@Component({
  computed: {
    ...mapGetters({
      loggedUser,
      assets,
      finding,
    }),
  },
})
export default class NoteCreate extends Vue {
  private loggedUser: IUser;
  private assets: IAsset[];

  private symbolSearch: string = '';
  private itemsPagination: any = {};
  private itemsHeaders: any[] = [
    { text: 'Ação', align: 'center', value: 'action', sortable: false },
    { text: 'Ticker', value: 'asset.symbol' },
    { text: 'Nome', value: 'asset.shortName' },
    { text: 'Preço (R$)', align: 'right', value: 'price' },
    { text: 'Qantidade', align: 'right', value: 'quantity' },
  ];
  private items: IItemCreateNote[] = [];
  private menuExecutedIn: boolean = false;
  private errors: any = {};
  private record: INote = {} as INote;

  private mounted() {
    this.record.user = this.loggedUser;

    this.items = JSON.parse(sessionStorage.getItem('itemsInNote') || '[]');
  }

  get valid() {
    return this.record.executedIn && this.record.settlementFee;
  }

  get itemsPages() {
    if (!this.itemsPagination.rowsPerPage ||
      !this.itemsPagination.totalItems) {
      return 0;
    } else {
      return Math.ceil(this.itemsPagination.totalItems / this.itemsPagination.rowsPerPage);
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

  private search(event: any) {
    if (this.symbolSearch.length === 6) {
      const exist = this.items.findIndex((item) => item.asset.symbol === this.symbolSearch.toUpperCase());

      if (exist === -1) {
        this.$store.dispatch(fetchAssets({ symbol: this.symbolSearch } as IAssetQuery))
          .then(() => {
            this.assets.forEach((asset) => {
              this.symbolSearch = '';

              this.items.push({
                asset,
                price: 0.0,
                quantity: 0,
              } as IItemCreateNote);

              this.saveInTemp();

              this.itemsPagination.totalItems = this.items.length;
            });
          })
          .catch((error) => {
            this.$notify({
              group: 'simple-notifications',
              title: 'Ops!',
              text: error,
              type: 'error',
            });
          });
      }
    }
  }

  private removeItem(item: IItemCreateNote) {
    const index = this.items.findIndex((i: IItemCreateNote) => i.asset._id === item.asset._id);

    this.items.splice(index, 1);

    this.saveInTemp();

    this.itemsPagination.totalItems = this.items.length;
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

  private saveInTemp() {
    sessionStorage.setItem('itemsInNote', JSON.stringify(this.items));
  }

  private clear() {
    sessionStorage.setItem('itemsInNote', '[]');

    this.errors = {};

    this.record.user = this.loggedUser;
    this.record.executedIn = null;
    this.record.settlementFee = null;
  }

  private goBack() {
    this.clear();

    this.$router.replace({ name: 'resume' });
  }
}
