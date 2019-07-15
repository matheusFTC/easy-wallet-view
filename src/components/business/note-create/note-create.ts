import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import { fetchAssets, assets, finding } from '@/actions/asset';
import { loggedUser } from '@/actions/authentication';
import { insertNote } from '@/actions/note';
import { INote, IItemCreateNote, ITypeItemCreateNote } from '@/interfaces/i-note';
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
    { text: 'Tipo da Operação', value: 'type' },
    { text: 'Preço (R$)', value: 'price' },
    { text: 'Qantidade', value: 'quantity' },
  ];
  private itemTypes: ITypeItemCreateNote[] = [
    {
      value: 'B',
      text: 'Compra',
    },
    {
      value: 'S',
      text: 'Venda',
    },
  ];
  private items: IItemCreateNote[] = [];
  private menuExecutedIn: boolean = false;
  private errors: any = {};
  private record: INote = {} as INote;

  private mounted() {
    this.items = JSON.parse(sessionStorage.getItem('itemsInNote') || '[]');
    this.record = JSON.parse(sessionStorage.getItem('record') || '{}');

    this.record.user = this.loggedUser;
  }

  get valid() {
    return this.items.length > 0
      && this.record.executedIn
      && this.record.settlementFee;
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
    if (this.symbolSearch.length >= 5) {
      const exist = this.items.findIndex((item) => item.asset.symbol === this.symbolSearch.toUpperCase());

      if (exist === -1) {
        this.$store.dispatch(fetchAssets({ symbol: this.symbolSearch } as IAssetQuery))
          .then(() => {
            if (this.assets.length) {
              this.assets.forEach((asset) => {
                this.symbolSearch = '';

                this.items.push({
                  asset,
                  type: this.itemTypes[0],
                  price: asset.currentPrice,
                  quantity: 100,
                } as IItemCreateNote);

                this.calculateTotalNet();
                this.saveInTemp();

                this.itemsPagination.totalItems = this.items.length;
              });
            } else {
              this.$notify({
                group: 'simple-notifications',
                title: 'Desculpe!',
                text: 'Não encontramos o ativo do ticker informado.',
                type: 'error',
              });
            }
          })
          .catch((error) => {
            this.$notify({
              group: 'simple-notifications',
              title: 'Desculpe!',
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

    this.calculateTotalNet();
    this.saveInTemp();

    this.itemsPagination.totalItems = this.items.length;
  }

  private calculateTotalNet() {
    this.record.netValueOfOperations = this.items.length ? Number(this.items
      .map((item) => item.price * item.quantity)
      .reduce((prevVal, elem) => prevVal + elem).toFixed(2)) : null;
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
    sessionStorage.setItem('record', JSON.stringify(this.record));
  }

  private clear() {
    sessionStorage.setItem('itemsInNote', '[]');
    sessionStorage.setItem('record', '');

    this.errors = {};

    this.record.user = this.loggedUser;

    this.items = [];

    this.record.executedInFormatted = null;
    this.record.executedIn = null;
    this.record.netValueOfOperations = null;
    this.record.settlementFee = null;
    this.record.registrationFee = null;
  }

  private goBack() {
    this.clear();

    this.$router.replace({ name: 'resume' });
  }
}
