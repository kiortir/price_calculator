<script setup lang="ts">
import { ref, computed, onMounted, Ref, StyleValue } from 'vue'
import { useStore } from 'vuex'
import Manufacturer from '../interfaces/Manufacturer';
import Stone from '../interfaces/Stone';


const store = useStore()
const props = defineProps<{
    tab: string
}>()

const emit = defineEmits<{
    (e: 'update', tab: string): void
}>()

function setManufacturer(val: string) {
    emit('update', val);
    // store.dispatch('loadManufacturer', val)

}

let filter_q: Ref<string> = ref("")
let filtered_manufacturers = computed<Array<Manufacturer>>(() => {
    const manufacturers: Manufacturer[] = Object.values(store.state.manufacturers)
    const filtered_manufacturers: Manufacturer[] = manufacturers.filter((m: Manufacturer) => {
        return <boolean>m.name.toLowerCase().startsWith(filter_q.value.toLowerCase())
    })
    return filtered_manufacturers
})

</script>


<template>
    <div class="flex-col flex gap-3 h-full">
        <div class="search-tab w-full mt-4 relative px-2">
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
                v-model="filter_q"
                type="text"
                class="font-sans block w-full pl-10 py-2 px-3 ring-1 ring-palette_olive/[0.4] rounded-xl accent-palette_accent"
            />
        </div>
        <TransitionGroup
            class="overflow-y-auto overscroll-contain scroll-smooth manufacturer-list result-tab flex flex-1 flex-col w-full mx-auto gap-3 xl:gap-0 xl:divide-y pl-1 pr-1 xl:pr-0 pt-2 overflow-x-hidden"
            name="list"
            tag="div"
        >
            <div
                v-for="manufacturer in filtered_manufacturers"
                type="button"
                class="last:mb-[111px] last:flex last:flex-grow ring-1 ring-inset xl:ring-0 rounded-xl xl:rounded-none transition-color duration-100 text-xl font-sans hover:shadow-md lg:shadow-none"
                :class="[manufacturer.name === props.tab ? 'ring-unirock xl:ring-sky-400' : 'text-gray-500 border-r-2  ']"
                :key="manufacturer.id"
                @click="setManufacturer(manufacturer.name)"
            >
                <div class="w-full">
                    <div
                        class="w-full text-left pl-3 py-2 h-content xl:hover:shadow-md hover:text-gray-700 xl:hover:bg-sky-100 active:contrast-135 transition-all transition-ease duration-100"
                        :class="[manufacturer.name === props.tab ? 'white text-black xl:shadow-xl xl:border-l-4 xl:border-l-blue-400 borter-t-0 translate-x-1' : 'text-gray-500']"
                    >
                        <span class>{{ manufacturer.name }}</span>
                    </div>
                </div>
            </div>
        </TransitionGroup>
    </div>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
    transition: transform 0.2s ease;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
.list-leave-active {
    position: absolute;
}

.manufacturer-list {
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    overflow-y: scroll;
}

.manufacturer-list::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
}
</style>
