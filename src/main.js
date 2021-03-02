// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import MintUi from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(MintUi)

Vue.mixin({
  methods: {
    validateQrCode: function (qrcode, statecode) {
      let result = false
      if (!qrcode || qrcode.trim().length === 0) {
        return result
      }
      if (!statecode) {
        return result
      }
      switch (statecode) {
        case 100:
          let qrtmp = {}
          if (typeof qrcode === 'string') {
            qrcode.split('\n').forEach(q => {
              let loc = q.split('=')
              qrtmp[loc[0]] = loc[1]
            })
          }
          result = 'key' in qrtmp
          if (result) {
            return qrtmp
          }
          return result
        case 200:
          return result
      }
    }
  }
})

const store = new Vuex.Store({
  state: {
    count: 0,
    header: 'WINPEGASUS APP QR CODE',
    activeCamera: '',
    user: {},
    flagProductView: false,
    product: {},
    products: []
  },
  mutations: {
    changeHeader (state, header) {
      state.header = header
    },
    increment (state) {
      state.count++
    },
    addUser (state, user) {
      /*
      id=100
      name=Oscar Martins
      username=oscar@winpegasus.com
      key=CEDGHYUzxy1341
      */
      state.user = user
    },
    setFlagProductView (state, flagProductView) {
      state.flagProductView = flagProductView
    },
    removeProduct (state, uii) {
      state.products = state.products.filter(p => p.uui !== uii)
    },
    addProduct (state, product) {
      /* id name lote price armazem */
      const uui = Date.now()
      const protmp = {
        uui: uui
      }
      if (typeof product === 'string') {
        product.split('\n').forEach(p => {
          const it = p.split('=')
          protmp[it[0]] = it[1]
        })
      } else {
        Object.assign(protmp, product)
      }
      state.product = protmp
      if (!state.products.find(p => p.uii === protmp.uui)) {
        state.products.push(protmp)
      }
    },
    turnCameraOn (state, camera) {
      state.activeCamera = camera.id
    }
  },
  getters: {
    isUserValid: state => {
      return Object.keys(state.user).indexOf('key') >= 0
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
