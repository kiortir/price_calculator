<script setup lang="ts">
import { ref, computed, onMounted, Ref } from 'vue'
import { useStore } from 'vuex'
import Manufacturer from '../interfaces/Manufacturer';
import StoneGridVue from './StoneGrid.vue';

const store = useStore()
const props = defineProps<{
    manufacturer: string
}>()


let data = computed<Manufacturer>(
    () => store.state.manufacturers[props.manufacturer]
)



let stones_filter_q: Ref<string> = ref("")

const stonesearch = ref<HTMLElement>(document.body)

function searchHandler(e: KeyboardEvent) {
    if (e.key == "F3" || (e.ctrlKey && e.code == "KeyF")) {
        e.preventDefault();
        stonesearch.value.focus()
    }
    if (e.key == "Escape") {
        if (document.activeElement === stonesearch.value) {
            stonesearch.value.blur()
        }
        else {
            stones_filter_q.value = ""
        }
    }
}


onMounted(() => {
    window.addEventListener('keydown', searchHandler)
})

defineExpose({
    stonesearch,
})

</script>


<template>
    <div class="flex flex-col px-3 gap-y-3 w-full mb-10">
        <div class="searchcontainer flex flex-col xl:flex-row gap-5">
            <div
                class="search-tab mt-4 relative w-full xl:w-80 mx-auto xl:mx-0 max-w-80 h-100 flex"
            >
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-auto">
                    <svg class="absolute h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </div>
                <input
                    id="search"
                    ref="stonesearch"
                    placeholder="введите название камня"
                    type="search"
                    class="font-sans block w-full pl-10 py-2 ring-1 rounded-xl accent-palette_accent"
                    v-model="stones_filter_q"
                />
            </div>

            <div class="currency-data flex self-end place-self-end">
                <div
                    class="currency-source font-sans"
                >Источник курса: {{ data.applied_currency.source }}</div>
            </div>
        </div>

        <StoneGridVue
            class="w-full"
            :columns="data.schema"
            :source="data.stones"
            :filter="stones_filter_q.toLowerCase()"
            :currency="data.applied_currency.value"
            :multiplier="data.multipliers"
            :thickness_configurations="data.thickness_configurations"
            :surface_configurations="data.surface_configurations"
            :key="manufacturer"
            :manufacturer="manufacturer"
        />
    </div>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
    transition: all 0.2s ease;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
.list-leave-active {
    position: absolute;
}

.surface-header {
    background-color: azure;
}
.thickness-header {
    background-color: blue !important;
}
</style>


