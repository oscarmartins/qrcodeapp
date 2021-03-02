<template>
  <div class="hello">
    <mt-cell title="Detalhes Produto"></mt-cell>
    <mt-cell title="id" :value="this.$store.state.product.id"> </mt-cell>
    <mt-cell title="Nome" :value="this.$store.state.product.name"> </mt-cell>
    <mt-cell title="Lote" :value="this.$store.state.product.lote"> </mt-cell>
    <mt-cell title="Armazem" :value="this.$store.state.product.armazem"></mt-cell>
    <mt-cell title="Preço" :value="this.$store.state.product.price"> </mt-cell>

    <mt-cell
      v-if="this.$store.state.flagProductView === false"
      title="Ler Produto"
      :to="{ name: 'reader', params: { state: 200 } }"
      is-link
    ></mt-cell>
    <mt-cell
      v-if="this.$store.state.flagProductView"
      title="Apagar Produto"
      @click.native="deleteProduct"
      is-link
    ></mt-cell>

    <mt-cell title="Voltar" :to="{ name: (this.$store.state.flagProductView ? 'products' : 'home') }" is-link></mt-cell>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  name: 'Product',
  methods: {
    deleteProduct: function (event) {
      const uui = this.$store.state.product.uui
      const index = this.$store.state.products.findIndex(p => p.uui === uui)
      if (index > -1) {
        this.$store.commit('removeProduct', uui)
        this.$router.push({name: 'products'})
      } else {
        Toast({
          message: 'Erro ao Apagar item',
          position: 'top',
          duration: 5000
        })
      }
    }
  },
  beforeDestroy () {
    this.$store.commit('setFlagProductView', false)
  }
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
