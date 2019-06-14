<template lang="pug">
v-container(fluid)
  v-layout(align-start justify-center)
    v-flex(md10 xs12)
      template
        header.page-header
          v-btn(@click="goBack" icon): v-icon arrow_back
          h2.page-title Nova nota de corretagem
</template>

<script lang="ts" src="./note-create.ts">
</script>

<style lang="stylus" scoped>
</style>