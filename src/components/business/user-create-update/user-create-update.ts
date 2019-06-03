import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import { loggedUser } from '@/actions/authentication';
import { IUser } from '@/interfaces/i-user';
import {
  insertUser,
  updateUser,
  deleteUser,
  fetchUser,
  user,
} from '@/actions/user';

@Component({
  computed: {
    ...mapGetters({
      user,
      loggedUser,
    }),
  },
})
export default class UserCreateUpdate extends Vue {
  private user: IUser;
  private loggedUser: IUser;

  private valid: boolean = false;
  private _id: string | null = null;
  private menuDateOfBirth: boolean = false;
  private menuAdmissionAt: boolean = false;
  private menuResignationAt: boolean = false;
  private record: IUser = {} as IUser;
  private errors: {} = {};

  private mounted() {
    this._id = this.$route.params._id;

    if (this._id) {
      const promese = this.$store.dispatch(fetchUser(this._id));

      promese.then(() => {
        this.record = Object.assign({}, this.user);

        delete this.record.password;
      });
    }
  }

  private submit() {
    if (this.valid) {
      if (this._id) {
        this.$store
          .dispatch(updateUser(this.record))
          .then((res) => {
            if (res.error) {
              this.$notify({
                group: 'simple-notifications',
                title: 'Ops!',
                text: res.error,
                type: 'error',
              });
            } else if (!res.errors) {
              this.$store.commit('user/setUser', res);

              this.record = Object.assign({}, this.user);

              delete this.record.password;

              this.$notify({
                group: 'simple-notifications',
                title: 'Atualizar funcionário',
                text: 'Funcionário atualizado com sucesso!',
                type: 'success',
              });

              this.errors = {};
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
      } else {
        this.$store
          .dispatch(insertUser(this.record))
          .then((res) => {
            if (!res.errors) {
              this.$store.commit('employee/addEmployee', res);

              this.record = {} as IUser;

              this.$notify({
                group: 'simple-notifications',
                title: 'Novo funcionário',
                text: 'Funcionário inserido com sucesso!',
                type: 'success',
              });

              this.errors = {};
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
  }

  private async remove() {
    try {
      const res = await this.$store.dispatch(deleteUser(this.user._id as string));

      if (!res.error) {
        this.$notify({
          group: 'simple-notifications',
          title: 'Remover funcionário',
          text: res.message,
          type: 'success',
        });

        this.$router.push({ name: 'employee-list' });
      } else {
        this.$notify({
          group: 'simple-notifications',
          title: 'Ops!',
          text: res.error,
          type: 'error',
        });
      }
    } catch (error) {
      this.$notify({
        group: 'simple-notifications',
        title: 'Ops!',
        text: error,
        type: 'error',
      });
    }
  }

  private clear() {
    (this.$refs.form as any).reset();

    this.errors = {};
  }

  private goBack() {
    this.$router.replace({ name: 'employee-list' });
  }

  get enablePassword() {
    return !this.record._id;
  }
}
