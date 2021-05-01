<template>
  <div class="hello">
    <mt-cell title="Detalhes do Produto"></mt-cell>
    <mt-cell title="id" :value="this.actualProduct.id"> </mt-cell>
    <mt-cell title="Nome" :value="this.actualProduct.name"> </mt-cell>
    <mt-cell title="Lote" :value="this.actualProduct.lote"> </mt-cell>
    <mt-cell title="Armazem" :value="this.actualProduct.armazem"></mt-cell>
    <mt-cell title="Preço" :value="this.actualProduct.price"> </mt-cell>
    <mt-cell title=""></mt-cell>

    <mt-cell
      v-if="this.storeButtonShowHide"
      title="Guardar"
      @click.native="storeProduct"
      is-link
    >
    </mt-cell>

    <mt-cell
      v-if="this.rejectButtonShowHide"
      title="Anular"
      @click.native="rejectProduct"
      is-link
    >
    </mt-cell>

    <mt-cell
      v-if="this.readNewButtonShowHide"
      title="Ler Produto"
      :to="{ name: 'reader', params: { state: 200 } }"
      is-link
    ></mt-cell>

    <mt-cell
      v-if="this.deleteButtonShowHide"
      title="Apagar Produto"
      @click.native="deleteProduct"
      is-link
    ></mt-cell>

    <mt-cell
    title="Voltar"
    :to="{ name: this.backTo }"
    is-link>
    </mt-cell>

  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  name: 'Product',
  data () {
    return {
      actualProduct: {},
      backTo: 'home',
      storeButtonShowHide: false,
      rejectButtonShowHide: false,
      readNewButtonShowHide: false,
      deleteButtonShowHide: false
    }
  },
  mounted () {
    const pid = this.$route.params.pid
    if (pid > 0) {
      this.actualProduct = this.$store.getters.getProductById(pid)
      this.deleteButtonShowHide = true
    } else if ('product' in this.$route.params) {
      this.actualProduct = this.$route.params.product
      this.storeButtonShowHide = true
      this.rejectButtonShowHide = true
      this.readNewButtonShowHide = true
    } else {
      Toast({
        message: 'Erro ao ler produto',
        position: 'top',
        duration: 5000
      })
    }
    if (this.$store.state.flagProductView) {
      this.backTo = 'products'
    } else {
      this.backTo = 'home'
    }
  },
  methods: {
    globalActions: function (action) {
      const toast = {
        message: '',
        position: 'top',
        duration: 5000
      }
      const pid = this.actualProduct.pid
      switch (action) {
        case 'storeProduct':
          toast.message = 'Item adicionado com sucesso'
          this.$store.commit('storeProduct', this.actualProduct)
          break
        case 'deleteProduct':
          toast.message = 'Item removido com sucesso'
          this.$store.commit('removeProduct', pid)
          this.$router.push({name: 'products'})
          break
        default:
          toast.message = 'Nenhuma acção associada'
          break
      }
      if (toast.message.length > 0) {
        Toast(toast)
      }
    },
    storeProduct: function (event) {
      return this.globalActions('storeProduct')
    },
    rejectProduct: function (event) {

    },
    deleteProduct: function (event) {
      return this.globalActions('deleteProduct')
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
