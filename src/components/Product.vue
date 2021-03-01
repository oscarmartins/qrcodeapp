<template>
  <div class="hello">
    <mt-cell title="Detalhes Produto"></mt-cell>
    <mt-cell title="id" :value="this.$store.state.product.id"> </mt-cell>
    <mt-cell title="Nome" :value="this.$store.state.product.name"> </mt-cell>
    <mt-cell title="Lote" :value="this.$store.state.product.lote"> </mt-cell>
    <mt-cell title="Armazem" :value="this.$store.state.product.armazem"> </mt-cell>
    <mt-cell title="Preço" :value="this.$store.state.product.price"> </mt-cell>

    <mt-cell title="Ler Produto" :to="{name: 'reader', params: {state: 200}}" is-link></mt-cell>
    <mt-cell title="Voltar" :to="{name: 'home'}" is-link></mt-cell>
  </div>
</template>

<script>
export default {
  name: 'Product'
}
</script>

<style scoped>
  .center {
    margin: auto;
    width: 90%;
    max-width: 20rem;
    min-width: 20rem;
    border: 3px solid #26a2ff;
  }
</style>
