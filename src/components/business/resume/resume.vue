<template lang="pug">
v-container(fluid)
  v-layout(align-start justify-center)
    v-flex(md10 xs12)
      template
        header.page-header
          h2.page-title Resumo da Carteira
        v-tooltip(left)
          v-btn(color="primary"
            dark
            fixed
            bottom
            right
            fab
            slot="activator"
            @click="goNoteCreate")
            v-icon note_add
          span Nova nota de corretagem
</template>

<script lang="ts" src="./resume.ts">
</script>

<style lang="stylus" scoped>
</style>
