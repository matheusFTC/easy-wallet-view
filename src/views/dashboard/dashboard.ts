import { Component, Vue } from 'vue-property-decorator';

import { restore, logoff } from '@/actions/authentication';

@Component
export default class Dashboard extends Vue {
  private title: string = 'Easy Wallet';
  private drawer: boolean = false;
  private menu: any[] = [];

  private mounted() {
    this.$store.dispatch(restore());

    if (!localStorage.getItem('token')) {
      this.$router.push('/');
    }
  }

  private logoff() {
    this.$store.dispatch(logoff())
      .then(() => {
        this.$router.push({ name: 'login' });
      });
  }
}
