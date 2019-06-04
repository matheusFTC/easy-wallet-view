import { Component, Vue } from 'vue-property-decorator';

import { IUser } from '@/interfaces/i-user';
import { insertUser } from '@/actions/user';

@Component
export default class Register extends Vue {
  private record: IUser = {} as IUser;
  private errors: {} = {};

  get valid() {
    return this.record.name && this.record.email && this.record.password;
  }

  private goBack() {
    this.$router.replace({ name: 'login' });
  }

  private submit() {
    if (this.valid) {
      this.$store
        .dispatch(insertUser(this.record))
        .then((res) => {
          if (!res.errors && !res.error) {
            this.record = {} as IUser;

            this.$notify({
              group: 'simple-notifications',
              title: 'Novo usuário',
              text: 'Usuário inserido com sucesso!',
              type: 'success',
            });

            this.errors = {};
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

  private clear() {
    (this.$refs.form as any).reset();

    this.errors = {};
  }
}
