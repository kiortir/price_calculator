<script setup>
</script>

<template>
  <router-view></router-view>
</template>

<style>
.noscroll {
  overflow: hidden;
}
.result::-webkit-scrollbar {
  width: 0.4em; /* width of the entire scrollbar */
}

.result::-webkit-scrollbar-track {
  background: white; /* color of the tracking area */
}

.result::-webkit-scrollbar-thumb {
  background-color: #ff1c2e; /* color of the scroll thumb */
  border-radius: 3em; /* roundness of the scroll thumb */
  border: 1px solid white; /* creates padding around scroll thumb */
}
</style>
