<template lang="pug">
v-container(fluid)
  v-layout(align-start justify-center)
    v-flex(md10 xs12)
      template
        header.page-header
          v-btn(@click="goBack" icon): v-icon arrow_back
          h2.page-title Novo usuário
        v-form(ref="form")
          p.red--text.text--darken-3(v-if="errors.email") {{ errors.email.message }}
          v-text-field(v-model="record.email" label="E-mail" type="email")
          p.red--text.text--darken-3(v-if="errors.name") {{ errors.name.message }}
          v-text-field(v-model="record.name" label="Nome")
          p.red--text.text--darken-3(v-if="errors.password") {{ errors.password.message }}
          v-text-field(v-model="record.password" label="Senha" type="password")
          v-btn(color="primary"
            :disabled="!valid"
            @click="submit") Cadastrar
          v-btn(color="error"
            @click="clear") limpar
</template>

<script lang="ts" src="./register.ts">
</script>

<style lang="stylus">
</style>
