<template>
  <div class="hello">
    <mt-cell title="Perfil"></mt-cell>
    <mt-cell title="id" :value="this.$store.state.user.id"> </mt-cell>
    <mt-cell title="Nome" :value="this.$store.state.user.name"> </mt-cell>
    <mt-cell title="Username" :value="this.$store.state.user.username"> </mt-cell>
    <mt-cell title="key" :value="this.$store.state.user.key"> </mt-cell>

    <mt-cell title="Voltar" :to="{name: 'home'}" is-link></mt-cell>
  </div>
</template>

<script>
export default {
  name: 'Profile'
}
</script>
