<template>
  <div class="hello">
    <mt-cell title="Iniciar Sessão" :to="{name: 'reader', params: {state: 100}}" is-link></mt-cell>
    <mt-cell title="Sobre" is-link></mt-cell>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  beforeMount () {
    const user = this.$store.getters.isUserValid
    if (user && this.$route.name !== 'start') {
      this.$router.push({name: 'start'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
