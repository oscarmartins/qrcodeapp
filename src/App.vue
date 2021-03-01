<template>
  <div id="app">
    <mt-header fixed :title="this.$store.state.header" >
      <mt-button v-on:click="back" icon="back" slot="left" v-if="this.$route.name !== 'home'" ></mt-button>
    </mt-header>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  beforeMount () {
    const user = this.$store.getters.isUserValid
    if (user && this.$route.name !== 'start') {
      this.$router.push({name: 'start'})
    }
  },
  methods: {
    back (event) {
      this.$router.push({name: 'home'})
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
