import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Resume extends Vue {

  private goOperationCreate() {
    this.$router.push('operation-create');
  }
}
