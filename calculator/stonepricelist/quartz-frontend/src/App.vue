<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
onMounted(async () => {
  window.onfocus = () => store.dispatch('loadManufacturers')
  store.dispatch('hydrate')
})
</script>

<template>
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
