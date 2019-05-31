<template lang="pug">
v-container(fluid)
  v-layout(align-start justify-center)
    v-flex(md10 xs12)
      template
        header.page-header
          h2.page-title Funcionários
        .employees-container
          header
            v-text-field(v-model="search"
              append-icon="search"
              placeholder="Pesquise aqui os funcionários..."
              single-line
              hide-details)
          v-data-table(:headers="headers"
            :items="employees"
            :search="search"
            :pagination.sync="pagination"
            hide-actions
            item-key="_id"
            no-data-text="Nenhum funcionário a ser exibida."
            no-results-text="Sua pesquisa não retornou nada.")
            template(slot="items" slot-scope="props")
              td.justify-center.layout.px-0
                v-icon.action-element(
                  @click="goEmployeeUpdate(props.item)") edit
              td {{ props.item.referenceCode }}
              td {{ props.item.name }}
              td.text-xs-center {{ props.item.isManager ? 'Sim' : 'Não' }}
              td.text-xs-center {{ props.item.isEnabled ? 'Sim' : 'Não' }}
              td {{ props.item.note }}
          .text-xs-center.pt-2
            v-pagination(v-model="pagination.page"
              :length="pages")
        v-tooltip(left)
          v-btn(color="primary"
            dark
            fixed
            bottom
            right
            fab
            slot="activator"
            @click="goEmployeeCreate")
            v-icon add
          span Novo funcionário
</template>

<script lang="ts" src="./employee-list.ts">
</script>

<style lang="stylus" scoped>
.employees-container {
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
