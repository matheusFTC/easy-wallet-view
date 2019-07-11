<template lang="pug">
v-container(fluid)
  v-layout(align-start justify-center)
    v-flex(md10 xs12)
      template
        header.page-header
          v-btn(@click="goBack" icon): v-icon arrow_back
          h2.page-title Nova nota de corretagem
        v-form
          .items-container
            header
              h3.page-sub-title Itens
              v-text-field(
                v-model="symbolSearch"
                append-icon="add"
                placeholder="Qual ativo você quer incluir?"
                single-line
                hide-details
                @click:append="search")
            v-data-table(:headers="itemsHeaders"
              :items="items"
              :pagination.sync="itemsPagination"
              hide-actions
              item-key="_id"
              no-data-text="Nenhum ativo na nota de corretagem."
              :loading="finding")
              template(slot="items" slot-scope="props")
                td.justify-center.layout.px-0
                  v-icon.action-element(
                    @click="removeItem(props.item)") remove
                td {{ props.item.asset.symbol }}
                td {{ props.item.asset.shortName }}
                td
                  v-edit-dialog(:return-value.sync="props.item.price"
                    large
                    lazy
                    persistent
                    saveText="Confirmar"
                    cancelText="Cancelar")
                    div {{ props.item.price }}
                    .mt-3.title(slot="input") Preço (R$)
                    v-text-field(slot="input"
                      v-model="props.item.price"
                      type="number"
                      autofocus)
                td
                  v-edit-dialog(:return-value.sync="props.item.quantity"
                    large
                    lazy
                    persistent
                    saveText="Confirmar"
                    cancelText="Cancelar")
                    div {{ props.item.quantity }}
                    .mt-3.title(slot="input") Quantidade
                    v-text-field(slot="input"
                      v-model="props.item.quantity"
                      type="number"
                      autofocus)
            .text-xs-center.pt-2
              v-pagination(v-model="itemsPagination.page"
                :length="itemsPages")
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
.items-container {
  margin-top: 1.5rem;
  margin-bottom: 2rem;Itensader {
    margin-bottom: 1.5rem;
  }
}

>>> .v-pagination {
  button {
    border-radius: 50%;
  }
}
</style>