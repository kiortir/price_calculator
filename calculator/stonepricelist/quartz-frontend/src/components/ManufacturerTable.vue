<script setup lang="ts">
import { ref, computed, onMounted, } from 'vue'
import { useStore } from 'vuex'
import ColMap from '../interfaces/ColMap';
import Manufacturer from '../interfaces/Manufacturer';
import Stone from '../interfaces/Stone';
import StoneGridVue from './StoneGrid.vue';



const store = useStore()
const props = defineProps<{
    manufacturer: string
}>()


let data = computed<Manufacturer>(
    () => store.state.manufacturers[props.manufacturer]
        || <Manufacturer>{
            stones: <Array<Stone>>[],
            schema: <Array<ColMap>>[],
            applied_currency: {
                source: '',
                value: 1
            },
            additional_info: {},
            multipliers: 1
        })




let stones_filter_q = ref("")

const stonesearch = ref()
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
    <div class="relative flex flex-col gap-y-3 w-full xl:px-3 mb-10">
        <div class="searchcontainer px-3 flex flex-col xl:flex-row gap-5">
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
                    class="font-sans block w-full pl-10 py-2 ring-1 rounded-lg accent-palette_accent"
                    :value="stones_filter_q"
                    @input="event => stones_filter_q = event.target.value"
                />
            </div>
            <div class="currency-data flex self-end place-self-end">
                <div
                    class="currency-source font-sans"
                >Источник курса: {{ data.applied_currency.source }}</div>
            </div>
        </div>

        <StoneGridVue
            class="w-full xl:w-fit"
            :columns="data.schema"
            :source="data.stones"
            :filter="stones_filter_q.toLowerCase()"
            :currency="data.applied_currency.value"
            :multiplier="data.multipliers"
            :key="manufacturer"
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


