import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  public $vuetify: any;

  public mounted() {
    this.$vuetify.theme.primary = '#008da7';
    this.$vuetify.theme.secondary = '#5a647f';
    this.$vuetify.theme.accent = '#26a69a';
    this.$vuetify.theme.error = '#ef476f';
    this.$vuetify.theme.warning = '#ffd166';
    this.$vuetify.theme.info = '#0b5563';
    this.$vuetify.theme.success = '#83d63b';
  }
}
