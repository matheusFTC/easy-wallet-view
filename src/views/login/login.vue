<template lang="pug">
  .login-wrapper
    .login-form
      h1.logo Easy Wallet
      v-text-field(
        v-model="email"
        label='E-mail' type="text" required)
      v-text-field(
        v-model="password"
        @keyup.enter="login"
        label='Senha' type="password" required)
      v-btn.mt-1(block round outline color='primary' dark @click="login" :loading="loading") Entrar
        span.loading(slot='loader')
          v-progress-circular(indeterminate :size="20" :width="1" color='primary')
          | Entrando...
      v-btn.mt-3(block round outline color='secondary' dark @click="goToRegister") Cadastrar
</template>

<script lang="ts" src="./login.ts">
</script>

<style lang="stylus">
.login-wrapper {
  width: 100%;
  height: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.logo {
  color: #008da7;
  font-weight: 100;
  font-size: 3rem;

  @media screen and (min-width: 949px) {
    font-size: 4rem;
  }
}

.login-form {
  @media screen and (max-width: 425px) {
    width: 80%;
  }

  @media screen and (min-width: 426px) {
    width: 320px;
  }
}

.loading {
  display: flex;
  align-items: center;

  .v-progress-circular {
    margin-right: 1rem;
  }
}
</style>
