<template lang="pug">
v-container(fluid)
  v-layout(align-start justify-center)
    v-flex(md10 xs12)
      template
        header.page-header
          v-btn(@click="goBack" icon): v-icon arrow_back
          h2.page-title Nova nota de corretagem
        v-form
          .assets-container
            header
              h3.page-sub-title Ativos
              v-text-field(
                v-model="assetSymbol"
                append-icon="playlist_add"
                placeholder="Qual o ticker do ativo?"
                single-line
                hide-details
                @click:append="search")
            v-data-table(:headers="assetHeaders"
              :items="assetsInNote"
              :search="assetSymbol"
              :pagination.sync="assetPagination"
              hide-actions
              item-key="_id"
              no-data-text="Nenhum ativo a ser exibido."
              no-results-text="Sua pesquisa não retornou nada.")
              template(slot="items" slot-scope="props")
                td.justify-center.layout.px-0
                  v-icon.action-element(
                    @click="addItem(props.item)") add
                td {{ props.item.referenceCode }}
                td {{ props.item.name }}
                td {{ props.item.description }}
                td.text-xs-right R$ {{ props.item.price }}
                td.text-xs-right {{ props.item.quantityInStock }}
            .text-xs-center.pt-2
              v-pagination(v-model="assetPagination.page"
                :length="assetPages")
          p.red--text.text--darken-3(v-if="errors.executedIn") {{ errors.executedIn.message }}
          v-menu(ref="menuExecutedIn"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="record.executedIn"
            lazy
            offset-y
            full-width
            v-model="menuExecutedIn"
            transition="scale-transition"
            min-width="290px")
            v-text-field(slot="activator"
              v-model="record.executedInFormatted"
              label="Data de execução"
              readonly)
            v-date-picker(v-model="record.executedIn" @input="formatExecutedIn()" no-title scrollable locale="pt-br")
              v-spacer
              v-btn(flat color="primary" @click="menuExecutedIn = false") Cancelar
              v-btn(flat color="primary" @click="$refs.menuExecutedIn.save(record.executedIn)") Selecionar
          p.red--text.text--darken-3(v-if="errors.settlementFee") {{ errors.settlementFee.message }}
          v-text-field(label="Taxa de liquidação"
            v-model="record.settlementFee" mask="##.##")
          v-btn(color="primary" :disabled="!valid" @click="submit") salvar
          v-btn(color="error" @click="clear") limpar
</template>

<script lang="ts" src="./note-create.ts">
</script>

<style lang="stylus" scoped>
.assets-container {
  margin-top: 1.5rem;
  margin-bottom: 2rem;

  header {
    margin-bottom: 1.5rem;
  }
}

>>> .v-pagination {
  button {
    border-radius: 50%;
  }
}
</style>