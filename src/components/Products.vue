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
    @click.native="showProduct(product.pid, $event)"
    >
  </mt-cell>

  <mt-cell title="Voltar" :to="{name: 'home'}" is-link></mt-cell>
</div>
</template>

<script>
export default {
  name: 'Products',
  data () {
    return {
      value: [],
      options: []
    }
  },
  methods: {
    showProduct: function (pid, event) {
      this.$store.commit('setFlagProductView', true)
      this.$router.push({
        name: 'product',
        params: {
          pid: pid
        }
      })
    }
  }
}
</script>

<style>

</style>
