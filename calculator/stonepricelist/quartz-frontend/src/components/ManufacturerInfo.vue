<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

import Manufacturer from '../interfaces/Manufacturer';

const store = useStore()

const props = defineProps<{
    manufacturer: string
}>()

let data = computed<Manufacturer>(() => store.state.manufacturers[props.manufacturer])

const open_image_url = ref(false)

</script>


<template>
    <div class="px-3 font-sans divide-y divide-slate-500 text-left">
        <slot></slot>
        <div class="cut py-3">
            <p>
                <span class="text-xl">Цена распила:</span>
                {{ data.additional_info.cut_price }}р.
            </p>
        </div>
        <div v-if="data.additional_info.images.length" class="flex flex-col divide-y gap-2">
            <div
                class="image-continer py-3 px-2 hover:bg-sky-100"
                v-for="img in data.additional_info.images"
                @click="open_image_url = true"
            >
                <img class="float-left" :src="img.thumbnail" />
                <Teleport to="body">
                    <div
                        class="fixed z-[100] top-0 w-screen h-screen flex bg-[rgb(0,0,0,0.6)]"
                        @click="open_image_url = false"
                        v-if="open_image_url"
                    >
                        <div class="flex py-10 w-full">
                            <img class="mx-auto z-[200] object-contain" :src="img.image" />
                        </div>
                    </div>
                </Teleport>
                <div>{{ img.text }}</div>
            </div>
        </div>
        <p class="w-100 pt-2" v-html="data.additional_info.text"></p>
    </div>
</template>

