<template>
<div class="hello">
  <mt-cell title="Produtos"></mt-cell>
  <mt-cell title="Nenhum produto" v-if="this.$store.state.products.length === 0"></mt-cell>
  <mt-cell
  v-for="(product, p) in this.$store.state.products"
    :title="product.name"
    :value="product.id"
    v-bind:key="p"
    is-link
    @click.native="showProduct(product.uui, $event)"
    >
  </mt-cell>

  <mt-cell title="Voltar" :to="{name: 'home'}" is-link></mt-cell>
</div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  name: 'Products',
  data () {
    return {
      value: [],
      options: []
    }
  },
  methods: {
    showProduct: function (productId, event) {
      const product = this.$store.state.products.find(p => p.uui === productId)
      if (product) {
        this.$store.commit('setFlagProductView', true)
        this.$store.commit('addProduct', product)
        this.$router.push({name: 'product'})
      } else {
        Toast({
          message: 'Erro ao ler dados produtos',
          position: 'top',
          duration: 5000
        })
      }
    }
  }
}
</script>

<style>

</style>
