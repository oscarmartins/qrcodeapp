<template>
  <div class="hello">
    <div class="center">
      <h4>
        {{this.cardTitle}}
      </h4>
      <div class="preview-container">
        <video id="preview"></video>
      </div>
       <mt-cell title="Voltar" :to="{name: 'home'}" is-link></mt-cell>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
const Instascan = require('instascan')
export default {
  name: 'QrCodeRader',
  data () {
    const {state} = this.$route.params
    debugger
    let cardTitle = 'Ler Qrcode '
    if (Number(state) === 100) {
      cardTitle = 'Iniciar Sessão'
    } else if (Number(state) === 200) {
      cardTitle = 'Ler Produto..'
    }
    return {
      msg: '',
      scanner: null,
      activeCameraId: null,
      cameras: [],
      scans: [],
      cardTitle: cardTitle,
      appState: Number(state)
    }
  },
  mounted: function () {
    var $this = this
    const args = { video: document.getElementById('preview') }
    window.URL.createObjectURL = (stream) => {
      args.video.srcObject = stream
      return stream
    }
    $this.scanner = new Instascan.Scanner({
      video: document.getElementById('preview'),
      scanPeriod: 5
    })
    $this.scanner.addListener('scan', function (qrcodestr) {
      $this.scans.unshift({ date: +Date.now(), qrcodestr: qrcodestr })
      if ($this.appState === 100) {
        const qrcodeval = $this.validateQrCode(qrcodestr, 100)
        if (qrcodeval) {
          console.log(qrcodestr)
          $this.$store.commit('addUser', qrcodeval)
          $this.$router.push({
            name: 'start'
          })
        } else {
          Toast({
            message: 'Qrcode Inválido!!',
            position: 'top',
            duration: 3000
          })
        }
      } else if ($this.appState === 200) {
        const result = `qrcode value: ${qrcodestr}`
        Toast({
          message: result,
          position: 'top',
          duration: 5000
        })
        $this.$store.commit('addProduct', qrcodestr)
        $this.$router.push({name: 'product'})
      } else {
        Toast({
          message: qrcodestr,
          position: 'bottom',
          duration: 5000
        })
      }
    })
    Instascan.Camera.getCameras()
      .then(function (cameras) {
        $this.cameras = cameras
        if (cameras.length > 0) {
          $this.activeCameraId = cameras[0].id
          $this.scanner.start(cameras[0])
        } else {
          console.error('No cameras found.')
        }
      })
      .catch(function (e) {
        console.error(e)
      })
  },
  methods: {
    formatName: function (name) {
      return name || '(unknown)'
    },
    selectCamera: function (camera) {
      this.activeCameraId = camera.id
      this.scanner.start(camera)
    }
  },
  beforeDestroy () {
    this.scanner.stop()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .center {
    margin: auto;
    width: 90%;
    max-width: 20rem;
    min-width: 20rem;
    border: 3px solid #26a2ff;
  }
  .preview-container {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #26a2ff;
  }
  .preview-container video {
    position: relative;
    width: 100%;
    height: 100%;
    min-width: 50%;
    min-height: 1rem;
  }
</style>
