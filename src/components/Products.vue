<template>
<div class="hello">
  <mt-checklist v-model="value" :options="this.options"> </mt-checklist>
  <mt-cell title="Voltar" :to="{name: 'home'}" is-link></mt-cell>
</div>
</template>

<script>
export default {
  name: 'Products',
  data () {
    return {
      value: [],
      options: [
        {
          label: 'disabled option',
          value: 'valueF',
          disabled: true
        },
        {
          label: 'checked disabled',
          value: 'valueE',
          disabled: true
        },
        {
          label: 'optionA',
          value: 'valueA'
        },
        {
          label: 'optionB',
          value: 'valueB'
        }
      ]
    }
  }
}
</script>

<style>

</style>
