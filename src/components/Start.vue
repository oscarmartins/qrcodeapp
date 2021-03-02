<template>
<div class="hello">
  <h3 class="welcome-title">Bem vindo, {{this.$store.state.user.name}}</h3>
  <mt-cell title="Ler Produto" :to="{name: 'reader', params: {state: 200}}" is-link></mt-cell>
  <mt-cell title="Histórico Produtos" :to="{name: 'products'}" is-link></mt-cell>
  <mt-cell title="Meus Dados" :to="{name: 'profile'}" is-link></mt-cell>
  <mt-cell title="Terminar Sessão" @click.native="logout" is-link ></mt-cell>
</div>
</template>

<script>
import { MessageBox } from 'mint-ui'
export default {
  name: 'Start',
  beforeMount () {
    const user = this.$store.getters.isUserValid
    if (!user) {
      this.$router.push({name: 'reader', params: {state: 100}})
    }
  },
  methods: {
    logout (event) {
      MessageBox({
        message: 'Terminar Sessão?',
        title: 'Confrmar',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
        showCancelButton: true
      }).then(action => {
        if (action === 'confirm') {
          this.$store.commit('addUser', {})
          this.$router.push({name: 'home'})
        }
      })
    }
  }
}
</script>

<style>
  h3.welcome-title {
    text-align: center;
  }
</style>
