import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  public $vuetify: any;

  public mounted() {
    this.$vuetify.theme.primary = '#008da7';
    this.$vuetify.theme.secondary = '#5A647F';
    this.$vuetify.theme.accent = '#26A69A';
    this.$vuetify.theme.error = '#EF476F';
    this.$vuetify.theme.warning = '#FFD166';
    this.$vuetify.theme.info = '#0B5563';
    this.$vuetify.theme.success = '#83D63B';
  }
}
