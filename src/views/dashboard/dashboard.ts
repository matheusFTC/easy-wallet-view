import { Component, Vue } from 'vue-property-decorator';

import { restore, logoff } from '@/actions/authentication';
import { getCookie } from '@/utils/cookie';

@Component
export default class Dashboard extends Vue {
  private title: string = 'Easy Wallet';
  private drawer: boolean = false;
  private menu: any[] = [
    {
      icon: 'account_balance_wallet',
      title: 'Resumo da Carteira',
      to: 'resume',
    },
  ];

  private mounted() {
    if (!getCookie('token')) {
      this.$router.push('/');
    } else {
      this.$store.dispatch(restore());
    }
  }

  private logoff() {
    this.$store.dispatch(logoff())
      .then(() => {
        this.$router.push({ name: 'login' });
      });
  }
}
