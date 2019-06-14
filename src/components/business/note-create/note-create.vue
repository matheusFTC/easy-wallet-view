<template lang="pug">
v-container(fluid)
  v-layout(align-start justify-center)
    v-flex(md10 xs12)
      template
        header.page-header
          v-btn(@click="goBack" icon): v-icon arrow_back
          h2.page-title Nova nota de corretagem
        v-form(ref="form" v-model="valid")
          v-menu(ref="menuExecutedIn"
            :close-on-content-click="false"
            v-model="menuExecutedIn"
            :nudge-right="40"
            :return-value.sync="record.executedIn"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px")
            v-text-field(slot="activator"
              v-model="record.executedInFormatted"
              label="Data de execução"
              prepend-icon="event"
              readonly)
            v-date-picker(v-model="record.executedIn" @input="formatExecutedIn()" no-title scrollable locale="pt-br")
              v-spacer
              v-btn(flat color="primary" @click="menuExecutedIn = false") Cancelar
              v-btn(flat color="primary" @click="$refs.menuExecutedIn.save(record.executedIn)") Selecionar
</template>

<script lang="ts" src="./note-create.ts">
</script>

<style lang="stylus" scoped>
</style>