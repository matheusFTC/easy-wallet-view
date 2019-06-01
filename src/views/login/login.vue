<template lang="pug">
  .login-wrapper
    .login-box
      h1.logo.pl-5 Easy Wallet
      span.credit
        a(href='https://br.freepik.com/fotos-vetores-gratis/cartao') Ilustração: Designed by Freepik
      .login-content.pl-5.pr-5.px-2
        v-text-field(
          v-model="email"
          label='E-mail' type="text" required)
        v-text-field(
          v-model="password"
          @keyup.enter="login"
          label='Senha' type="password" required)
        v-btn.mt-1(block round outline color='primary' dark @click="login" :loading="loading") Entrar
          span.loading-info(slot='loader')
            v-progress-circular(indeterminate :size="20" :width="1" color='primary')
            | Entrando...
        v-btn.mt-3(block round outline color='secondary' dark @click="goToRegister") Cadastrar
      .restore.mt-3.pl-5
        p Esqueci a senha
</template>

<script lang="ts" src="./login.ts">
</script>

<style lang="stylus">
.login-wrapper {
  width: 100%;
  height: 100%;
  padding: 2rem;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('../../assets/login-bg.jpg') no-repeat;
  background-size: 100%;
  background-origin: content-box;
  background-position-x: right;
  background-position-y: bottom;

  @media screen and (min-width: 500px) and (max-height: 600px) {
    background-size: 40%;
  }

  @media screen and (min-width: 500px) {
    justify-content: left;
  }

  @media screen and (min-width: 768px) {
    padding-right: 3rem;
    align-items: center;
  }

  @media screen and (min-width: 949px) {
    padding-right: 5rem;
    background-size: 50%;
    background-position-y: center;
  }
}

.logo {
  color: #008DA7;
  font-weight: 100;
  font-size: 3rem;

  @media screen and (min-width: 949px) {
    font-size: 5rem;
  }
}

.login-box {
  margin-top: -50%;

  @media screen and (min-width: 500px) {
    margin-top: 0;
  }

  @media screen and (min-width: 949px) {
    margin-left: 15%;
  }
}

.login-content {
  width: 350px;
}

.credit {
  position: fixed;
  font-size: 8px;
  bottom: 5px;
  right: 10px;

  a {
    color: #bdbdbd;
    text-decoration: none;
    font-weight: 400;
  }
}

.loading-info {
  display: flex;
  align-items: center;

  .v-progress-circular {
    margin-right: 1rem;
  }
}
</style>
