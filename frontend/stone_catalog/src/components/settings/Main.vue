<script setup lang="ts">
import ControlsVue from './Controls.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

// const controls_block = ref()
// const main_block = ref()

// const SetPosition = () => {
//     const navbar = document.getElementById('navbar')
//     navbar?.setAttribute("style", `position:fixed;background-color:white;border-bottom:5px;border-color:black; z-index:999999`)
//     const offset = navbar?.offsetHeight || 0
//     controls_block.value.$el.setAttribute("style", `height:${window.screen.height - offset}px;top:${offset}px`)
//     main_block.value.setAttribute("style", `top:${offset}px;left:${controls_block.value.$el.offsetWidth}px;width:${(navbar?.offsetWidth || 1400) - controls_block.value.$el.offsetWidth}px`)
// }

// onMounted(SetPosition)

</script>

<template>
    <div class="w-full flex md:gap-5 max-w-screen">
        <ControlsVue class="min-w-[300px] hidden md:flex" />
        <router-view class="grow w-full" :key="route.fullPath"></router-view>
    </div>
</template>