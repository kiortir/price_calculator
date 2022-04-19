<script setup lang="ts">

import { Stone } from '../interfaces';
import { useStore } from '../store/stones'
import StoneInfoCardVue from './StoneInfoCard.vue';
import StoneSelectorVue from './StoneSelector.vue';
const store = useStore()

const updateStone = (index: number, payload: Stone) => store.stones[index] = payload

</script>

<template>
    <div class='flex flex-col gap-3'>
        <StoneSelectorVue class="w-full" @add="data => store.addCard(data)"></StoneSelectorVue>
        <div class="flex flex-col gap-2">
            <stone-info-card-vue v-for="(stone, index) in store.stones" :key="index" :stone="stone"
                @delete="store.deleteCard(index)" />
        </div>
    </div>
</template>