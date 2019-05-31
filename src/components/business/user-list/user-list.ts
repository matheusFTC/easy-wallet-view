import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { RawLocation } from 'vue-router';

import { fetchUsers, users } from '@/actions/user';
import { IUser } from '@/interfaces/i-user';

@Component({
  computed: {
    ...mapGetters({
      users,
    }),
  },
})
export default class UserList extends Vue {
  private users: IUser[];

  private search: string = '';
  private pagination: any = {};
  private headers: any[] = [
    {
      text: 'Ação',
      align: 'center',
      value: 'actions',
      sortable: false,
    },
    {
      text: 'Cód. Referência',
      value: 'referenceCode',
    },
    {
      text: 'Nome',
      value: 'name',
    },
    {
      text: 'Gerência?',
      align: 'center',
      value: 'isManager',
    },
    {
      text: 'Habilitado?',
      align: 'center',
      value: 'isEnabled',
    },
    {
      text: 'Observação',
      value: 'note',
    },
  ];

  private mounted() {
    this.$store.dispatch(fetchUsers()).then(() => this.pagination.totalItems = this.users.length);
  }

  private goUserCreate() {
    this.$router.push('user-create');
  }

  private goUserUpdate(user: IUser) {
    this.$router.push({ name: 'user-update', params: { _id: user._id } } as RawLocation);
  }

  get pages() {
    if (!this.pagination.rowsPerPage ||
      !this.pagination.totalItems) {
      return 0;
    } else {
      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
    }
  }
}
