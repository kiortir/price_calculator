<script setup lang="ts">
import {
    Dialog,
    DialogOverlay,
    DialogTitle,
} from '@headlessui/vue'

import { useRoute } from 'vue-router';
import { useGrid } from 'vue-screen'
import { computed, ref, Ref } from 'vue'

import StoneInfo from '../interfaces/Stone';
import ColMap from '../interfaces/ColMap';
// @ts-ignore
import layout_switch from '../store/translit_dict.js'


const grid = useGrid('tailwind')
const route = useRoute()
const props = defineProps<{
    columns: Array<ColMap>,
    source: StoneInfo[],
    filter: string,
    currency: number,
    multiplier: number,
    surface_configurations: string[],
    thickness_configurations: string[],
    manufacturer: string,
}>()


let surface: Ref<string> = ref(props.surface_configurations[0])
let thickness: Ref<string> = ref(props.thickness_configurations[0])

interface StyleRef {
    [column: string]: object
}

const style_ref: StyleRef = {
    _name: {
        "text-align": "left",
        "font-weight": 550,
    },
    _slab_size: {
        "font-weight": 300,
    },
    _code: {
        "text-align": "center",
        "font-weight": 400,
    }
}

const hide_excessive = ref(true)
const filter_string = computed(() => {
    const filter = props.filter
    const translit_array: string[] = []
    const reverse_array: string[] = []
    Array.from(filter).forEach((char) => {
        translit_array.push(layout_switch.dict[char])
        reverse_array.push(layout_switch.reverse[char])
    });
    const translit = <string>translit_array.join('') || '_'
    const reverse = <string>reverse_array.join('') || '_'
    return {
        filter,
        reverse,
        translit,
    }
})


const stones = computed(() => {
    const { filter, translit, reverse } = filter_string.value
    const empty_filter = (filter === "" && translit === "_" && reverse === "_")
    let filtered_stones: StoneInfo[] = []
    const t = thickness.value.replace('мм', '')
    props.source.forEach(stone => {
        const [code, name] = [stone._code ? stone._code.toLowerCase() : '', stone._name.toLowerCase()]
        if (empty_filter || ([name, code].some(
            (searchunit) => [filter, translit, reverse].filter(str => str.replaceAll(' ', '') !== "").some(
                (filter_str) => {
                    let ar = searchunit.split(' ');
                    let filter_ar = filter_str.split(' ');
                    return filter_ar.length === filter_ar.filter((word) => ar.some((w) => w.startsWith(word))).length
                })
        )
        )) {
            if (!grid.xl) {
                const new_stone = <StoneInfo>{
                    configurations: {}
                }
                Object.entries(stone).forEach((entry) => {
                    const [key, value] = entry
                    if (key.startsWith('_')) {
                        new_stone[key] = value
                    }
                    else {
                        if (key === surface.value) { new_stone.configurations = value[t] || {} }
                    }

                })
                if (Object.keys(new_stone.configurations).length || !hide_excessive.value) {
                    filtered_stones.push(new_stone)
                }
            }

            else {
                filtered_stones.push(stone)
            }
        }

    })
    return filtered_stones
})


let currency_formatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
});

const t = computed(() => thickness.value.replace('мм', ''))
function getValue(stone: StoneInfo, row: string) {
    let raw, value
    raw = value = stone[row] || '-'
    let is_on_order = false
    let style = style_ref[row] || {}
    let s = stone[surface.value]
    if (s) {
        s = s[t.value]
    }
    if (s) {
        let configuration
        if (row === '_price') {
            configuration = s[stone._slab_size]
            if (configuration) {
                value = currency_formatter.format(configuration.price)
                raw = Math.ceil(configuration.price)
                is_on_order = configuration.is_on_order
            }
        }
        else if (row === '_code') {
            configuration = s[stone._slab_size]
            if (configuration) {
                raw = value = configuration.code || stone[row] || '-'
            }
        }
        else if (!row.startsWith('_')) {
            configuration = s[row]
            if (configuration) {
                value = currency_formatter.format(configuration.price)
                raw = Math.ceil(configuration.price)
                is_on_order = configuration.is_on_order
            }
        }
    }
    return {
        value,
        raw,
        is_on_order,
        style,
    }
}

const values = computed(() => {
    return stones.value.map((stone) => {
        return props.columns.map((column) =>
            getValue(stone, column.key)
        )
    })
})

function getPrice(value: number | string) {
    return currency_formatter.format(Math.ceil(Number(value)))
}

const settings = ref(false)
function setSettings(value: boolean) {
    settings.value = value
}

function copyText(value: string | number) {
    navigator.clipboard.writeText(String(value));
}
</script>

<template>
    <div class="dispaly_settings flex flex-row gap-3 font-sans lg:max-w-[60vw]" v-if="grid.xl">
        <div
            class="surface ring-1 rounded-md grid grid-flow-col divide-x divide-slate-400 flex-grow"
        >
            <div
                class="surface_variant xl:py-1 first:rounded-t-md xl:first:rounded-tr-none xl:first:rounded-l-md last:rounded-b-md xl:last:rounded-bl-none xl:last:rounded-r-md text-left xl:text-center px-1 flex-row inline my-auto h-full"
                v-for="surface_v in surface_configurations"
                @click="surface = surface_v"
                :class="[surface === surface_v ? 'bg-sky-100' : '']"
            >
                <span class>
                    <span class="align-middle">{{ surface_v }}</span>
                </span>
            </div>
        </div>
        <div
            class="thickness ring-1 rounded-md grid grid-flow-col divide-x divide-slate-400 flex-grow"
        >
            <div
                class="thickness_variant xl:py-1 first:rounded-tr-none xl:first:rounded-l-md last:rounded-b-md xl:last:rounded-bl-none xl:last:rounded-r-md text-left xl:text-center px-1 flex-row inline my-auto h-full"
                v-for="thickness_v in thickness_configurations"
                @click="thickness = thickness_v"
                :class="[thickness === thickness_v ? 'bg-sky-100' : '']"
            >
                <span class>
                    <span class="align-middle">{{ thickness_v }}</span>
                </span>
            </div>
        </div>
    </div>
    <Teleport
        to="#header-settings"
        :key="manufacturer"
        v-else-if="manufacturer === route.query.manufacturer"
    >
        <svg
            @click="setSettings(true)"
            type="button"
            class="h-7 w-7"
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
            <path
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <circle cx="12" cy="12" r="3" />
        </svg>
        <Teleport to="body">
            <Dialog as="div" :open="settings" @close="setSettings(false)">
                <div class="fixed inset-0 z-20 overflow-y-auto">
                    <div class="min-h-screen px-4 text-center">
                        <TransitionChild
                            as="template"
                            enter="duration-300 ease-out"
                            enter-from="opacity-0"
                            enter-to="opacity-100"
                            leave="duration-200 ease-in"
                            leave-from="opacity-100"
                            leave-to="opacity-0"
                        >
                            <DialogOverlay class="fixed inset-0 bg-black opacity-30" />
                        </TransitionChild>
                        <span class="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

                        <TransitionChild
                            as="template"
                            enter="duration-300 ease-out"
                            enter-from="opacity-0 scale-95"
                            enter-to="opacity-100 scale-100"
                            leave="duration-200 ease-in"
                            leave-from="opacity-100 scale-100"
                            leave-to="opacity-0 scale-95"
                        >
                            <div
                                class="font-sans inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
                            >
                                <DialogTitle
                                    as="h3"
                                    class="text-xl font-medium leading-6 text-gray-900"
                                >Настройки списка</DialogTitle>
                                <div class="mt-3">
                                    <div
                                        class="dispaly_settings flex flex-col gap-3 font-sans lg:max-w-[60vw]"
                                    >
                                        <div
                                            class="surface ring-1 rounded-md grid grid-flow-col divide-x divide-slate-400 flex-grow"
                                        >
                                            <div
                                                class="surface_variant py-1 first:rounded-t-md first:rounded-tr-none first:rounded-l-md last:rounded-b-md last:rounded-bl-none last:rounded-r-md text-center px-1 flex-row inline my-auto h-full"
                                                v-for="surface_v in surface_configurations"
                                                @click="surface = surface_v"
                                                :class="[surface === surface_v ? 'bg-sky-100' : '']"
                                            >
                                                <span class="align-middle">{{ surface_v }}</span>
                                            </div>
                                        </div>
                                        <div
                                            class="thickness ring-1 rounded-md grid grid-flow-col divide-x divide-slate-400 flex-grow"
                                        >
                                            <div
                                                class="text-center surface_variant py-1 first:rounded-t-md first:rounded-tr-none first:rounded-l-md last:rounded-b-md last:rounded-bl-none last:rounded-r-md px-1 flex-row inline my-auto h-full"
                                                v-for="thickness_v in thickness_configurations"
                                                @click="thickness = thickness_v"
                                                :class="[thickness === thickness_v ? 'bg-sky-100' : '']"
                                            >
                                                <span class="align-middle">{{ thickness_v }}</span>
                                            </div>
                                        </div>
                                        <div class="p-1 px-2 rounded-md ring-1 active:bg-sky-100">
                                            <input
                                                v-model="hide_excessive"
                                                type="checkbox"
                                                id="hideexcessive"
                                            />
                                            <label
                                                for="hideexcessive"
                                                class="px-2 select-none"
                                            >Скрывать камни без соответствий</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Teleport>
    </Teleport>
    <div class="overflow-x-auto border-slate-300 w-full max-w-[60vw] border-x" v-if="grid.xl">
        <table class="table-auto border-separate overflow-hidden xl:border-t w-full h-fit">
            <thead class="shadow-sm">
                <tr
                    class="first:bg-[#26a69a] first:text-white text-slate-600 last:bg-white bg-[#26a69a]/10 last:text-black only:bg-[#26a69a] only:text-white"
                >
                    <td
                        v-for="column in columns"
                        class="py-1 border-r last:border-r-0 border-b text-inherit bg-inherit px-5 font-sans border-slate-400/[0.8] font-semibold"
                    >{{ column.title }}</td>
                </tr>
            </thead>
            <TransitionGroup name="list" tag="tbody" class>
                <tr
                    class="even:bg-[#ddf2f0] odd:bg-white hover:bg-sky-200"
                    v-for="stone in values"
                    :key="stone[0].value"
                >
                    <td
                        class="bg-inherit border-r last:border-r-0 mx-5 font-sans border-t border-[#e2e3e3] group"
                        v-for="(col, index) in stone"
                        :key="stone[0].value + index + stone[1].value || ''"
                        @click="copyText(col.raw)"
                        :style="col.style"
                    >
                        <div
                            class="px-2 flex flex-row gap-2 select-none group-active:text-white group-active:bg-teal-400"
                        >
                            <div class="flex-grow">
                                <span class="flex-grow">{{ col.value }}</span>
                            </div>
                        </div>
                    </td>
                </tr>
            </TransitionGroup>
        </table>
    </div>
    <div
        class="card-stones gap-3 before:box-inherit after:box-inherit box-border w-full xl:max-w-[60vw] flex flex-col"
        v-else
    >
        <div
            class="card font-sans ring-1 ring-unirock/30 shadow-md w-fill rounded-xl py-3 px-5 mb-3 last:mb-0 flex flex-col"
            v-for="stone in stones"
        >
            <div class="card-header w-fit self-end">
                <div class="text-xl font-semibold">{{ stone._name }}</div>
                <div class="text-right text-sm text-gray-400">{{ stone._code }}</div>
            </div>
            <div class="mt-1 border-t border-slate-600">
                <table class="table-fixed w-full">
                    <tbody>
                        <tr
                            v-for="(value, key) in stone.configurations"
                            :key="key"
                            class="border-b last:border-b-0"
                        >
                            <td class="text-left font-sans py-2">
                                <div class="last:after:content-['мм']">{{ key }}</div>
                            </td>
                            <td class="text-right">{{ getPrice(value.price) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="text-left mt-1 border-t text-gray-500" v-if="stone._info">{{ stone._info }}</div>
        </div>
    </div>
</template>

<style scoped>
table {
    border-spacing: 0;
    *border-collapse: collapse;
}
</style>