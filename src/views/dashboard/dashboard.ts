import { Component, Vue } from 'vue-property-decorator';

import { restore, logoff } from '@/actions/authentication';

@Component
export default class Dashboard extends Vue {
  private title: string = 'Easy Sales';
  private drawer: boolean = false;
  private menu: any[] = [
    {
      icon: 'shop',
      title: 'Vendas',
      to: 'order-list',
    },
    {
      icon: 'people',
      title: 'Clientes',
      to: 'customer-list',
    },
    {
      icon: 'fastfood',
      title: 'Produtos',
      to: 'product-list',
    },
    {
      icon: 'payment',
      title: 'Formas de pagamento',
      to: 'payment-method-list',
    },
    {
      icon: 'perm_contact_calendar',
      title: 'Funcionários',
      to: 'employee-list',
    },
  ];

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
