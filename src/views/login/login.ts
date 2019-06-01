import { Component, Vue } from 'vue-property-decorator';

import { authenticate } from '@/actions/authentication';

@Component
export default class Login extends Vue {
  private email: string = '';
  private password: string = '';
  private loading: boolean = false;

  private login() {
    this.loading = true;
    this.$store.dispatch(authenticate(this.email, this.password))
      .then((res) => {
        this.loading = false;

        if (res.error) {
          this.$notify({
            group: 'simple-notifications',
            title: 'Ops!',
            text: res.error,
            type: 'error',
          });
        } else {
          this.$router.push({ name: 'order-list' });
        }
      });
  }

  private goToRegister() {
    this.$router.push({ name: 'register' });
  }

}
