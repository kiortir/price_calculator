<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const props = defineProps<{
    manufacturer: string
}>()

let data = computed<Manufacturer>(
    () => store.state.manufacturers[props.manufacturer]
        || <Manufacturer>{
            additional_info: {
                images: [],
                text: ""
            },
        })

const open_image_url = ref(false)

</script>


<template>
    <div
        class="px-3 font-sans divide-y divide-slate-500"
        v-if="(data.additional_info.images.length || data.text)"
    >
        <p class="text-2xl font-semibold mb-5">Дополнительная информация</p>
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
                        <div class="flex py-10 w-full ">
                            <img class="mx-auto z-[200]" :src="img.image" />
                        </div>
                    </div>
                </Teleport>
                <div>{{ img.text }}</div>
            </div>
        </div>
        <p class="w-100 pt-2" v-html="data.additional_info.text"></p>
    </div>
</template>

