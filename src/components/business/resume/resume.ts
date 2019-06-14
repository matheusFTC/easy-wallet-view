import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Resume extends Vue {
  private goNoteCreate() {
    this.$router.push('note-create');
  }
}
