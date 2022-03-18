<script setup lang="ts">
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/vue'
import { computed, ref, shallowRef } from 'vue'
import Stone from '../interfaces/Stone'

const props = defineProps<{
    stone: Stone
}>()


interface ConfigurationTable {
    [index: string]: object
}

let configuration_table = shallowRef({})
function calculateTable() {
    // let table = <ConfigurationTable>{}
    // props.stone.configurations.forEach((configuration) => {
    //     table[configuration.surface] = {
    //         ...(table[configuration.surface] || {}),
    //         ...{
    //             [configuration.slab_size]: {
    //                 ...(table[configuration.surface] ? table[configuration.surface][configuration.slab_size] : {} || {}),
    //                 ...{ [configuration.thickness]: configuration }
    //             }
    //         }
    //     }

    // })
    // configuration_table.value = table
}


</script>


<template>
    <Disclosure as="div" class="w-full flex-col h-full" v-slot="{ open }">
        <DisclosureButton
            class="flex flex-row pl-3 hover:bg-sky-100/80 hover:rounded-sm"
            :class="open ? 'shadow-xl bg-sky-100 mt-2 rounded-md ring-1' : ''"
            @click="calculateTable"
        >
            <div class="row-wrapper w-full grid grid-cols-3 divide-x flex-grow">
                <div class="name text-left py-2">
                    <span>{{ stone.name }}</span>
                </div>
                <div class="price py-2">
                    <span>{{ stone.configurations[0].price }}</span>
                </div>
            </div>
            <div
                class="nav self-center justify-self-end text-right w-content transition-transform duration-100"
                :class="open ? '-rotate-90' : ''"
            >
                <svg
                    class="h-6 w-6"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <polyline points="15 6 9 12 15 18" />
                </svg>
            </div>
        </DisclosureButton>
        <transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="transform scale-0 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-150 ease-out"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-0 opacity-0"
        >
            <DisclosurePanel class="text-gray-500 p-5">
                <ul class="list-disc list-inside text-left">
                    <li
                        v-for="configuration in stone.configurations"
                    >{{ stone.name }} {{ configuration.slab_size }} {{ configuration.thickness }} {{ configuration.price }}</li>
                </ul>
            </DisclosurePanel>
        </transition>
    </Disclosure>
</template>

