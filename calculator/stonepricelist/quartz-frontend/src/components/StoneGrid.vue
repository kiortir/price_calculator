<script setup lang="ts">
import { computed, } from 'vue'
import ColMap from '../interfaces/ColMap';

import layout_switch from '../store/translit_dict.js'

import { useGrid } from 'vue-screen'
const grid = useGrid('tailwind')

const props = defineProps<{
    columns: Array<ColMap>,
    source: Array<StoneInfo>,
    filter: string,
    currency: Number,
    multiplier: Number
}>()

interface StoneInfo {
    [info: string]: string
}

interface StyleRef {
    [column: string]: object
}

const style_ref: StyleRef = {
    name: {
        "text-align": "left",
        "font-weight": 550,

    }
}

interface HeaderMap extends Map<number, Map<string, ColMap>> {
    map: Map<string, string>,
}

const header = computed(
    () => {
        const cols = <HeaderMap>new Map()
        cols.map = new Map()
        let level: Array<ColMap> = props.columns
        let row = 0
        if (level.length) {
            while (true) {
                const row_map = new Map()
                let counter = 0
                let children: Array<ColMap> = []
                level.forEach((row: ColMap) => {
                    let key = `${counter++}${row.prop}` || `${counter++}${row.name}`
                    row_map.set(key, row)
                    if (row.children !== undefined) {
                        children = children.concat(...row.children)
                    }
                    else if (row.prop !== undefined) {
                        cols.map.set(row.prop, '_')
                    }
                })
                cols.set(row++, row_map)
                if (children.length == 0) {
                    break
                }
                level = children

            }
            return cols
        }
        else {
            const z = <HeaderMap>new Map()
            z.map = new Map()
            return z
        }
    }
)

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
    console.log({ header: header.value })
    const { filter, translit, reverse } = filter_string.value

    let filtered_stones
    let counter = 0
    if (grid.xl && header.value.map.size < 10) {
        filtered_stones = []
    }
    else if (!grid.sm) {
        filtered_stones = [[]]
    }
    else {
        filtered_stones = [[], []]
    }
    props.source.forEach(stone => {
        const [code, name] = [(stone.code !== null) ? stone.code.toLowerCase() : '', stone.name.toLowerCase()]
        if ([name, code].some(
            (searchfield) => [searchfield,].concat(...searchfield.split(' ')).some(
                (searchunit) => [filter, translit, reverse].some(
                    (filter_str) => searchunit.startsWith(filter_str))
            )
        )
        ) {
            if (!grid.xl || header.value.map.size > 9) {
                const new_stone = <StoneInfo>{
                    configurations: {}
                }
                Object.entries(stone).forEach((entry) => {
                    const [key, value] = entry
                    if (['code', 'name'].includes(key)) {
                        new_stone[key] = value
                    }
                    else {
                        new_stone['configurations'][key] = value
                    }
                })
                if (grid.sm) {
                    filtered_stones[counter++ % 2].push(new_stone)
                }
                else {
                    filtered_stones[0].push(new_stone)
                }
            }
            else {
                filtered_stones.push(stone)
            }
        }
    })
    return filtered_stones
})

const shown_columns = computed(() => {
    if (header.value.size > 0) {
        return new Map([...header.value].filter(h => {
            let values = <Set<string>>new Set([...h[1].values()].map((v: ColMap) => v.name))
            return values.size > 1
        }))
    }
    else { return new Map() }
})

let currency_formatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
});

function getPrice(value) {
    return currency_formatter.format(Number(value) * props.currency * props.multiplier)
}

</script>

<template>
    <div
        class="overflow-x-auto border-slate-300 h-full w-full max-w-[60vw] border-x"
        v-if="grid.xl && header.map.size < 10"
    >
        <table class="table-auto border-separate h-content overflow-hidden xl:border-t">
            <thead class="sticky top-0 shadow-sm" v-if="header.keys()">
                <tr
                    class="first:bg-[#26a69a] first:text-white text-slate-600 last:bg-white bg-[#26a69a]/10 last:text-black sticky top-0"
                    v-for="header_row in shown_columns.values()"
                    v-if="header.values()"
                >
                    <td
                        v-for="header_col in header_row.values()"
                        :colspan="header_col.colspan || 1"
                        class="border-r last:border-r-0 border-b text-inherit bg-inherit px-5 font-sans border-slate-400/[0.8] font-semibold sticky top-0"
                        :rowspan="!header_col.children ? 3 : 1"
                    >{{ header_col.name }}</td>
                </tr>
            </thead>
            <TransitionGroup name="list" tag="tbody" class>
                <tr
                    class="even:bg-[#ddf2f0] odd:bg-white hover:bg-sky-200"
                    v-for="stone in stones"
                    :key="stone.name"
                >
                    <td
                        class="bg-inherit border-r last:border-r-0 px-5 font-sans border-t border-[#e2e3e3]"
                        v-for="row in header.map.keys()"
                        :key="row"
                        :style="style_ref[row]"
                    >{{ typeof (stone[row]) == 'number' ? getPrice(stone[row]) : stone[row] || "-" }}</td>
                </tr>
            </TransitionGroup>
        </table>
    </div>
    <div
        class="card-stones px-3 gap-3 before:box-inherit after:box-inherit box-border flex flex-row w-full xl:max-w-[60vw]"
        v-else
    >
        <div
            class="card-column flex flex-col flex-grow"
            v-for="group, index in Array(grid.sm ? 2 : 1)"
        >
            <div
                class="card font-sans ring-1 ring-unirock/30 shadow-md w-fill rounded-xl py-3 px-5 flex flex-col mb-3 last:mb-0"
                v-for="stone in stones[index]"
            >
                <div class="card-header w-fit self-end">
                    <div class="text-xl font-semibold">{{ stone.name }}</div>
                    <div class="text-right text-sm text-gray-400">{{ stone.code }}</div>
                </div>
                <div class="mt-1 border-t border-slate-600">
                    <table class="table-fixed w-full">
                        <tbody>
                            <tr
                                v-for="(value, key) in stone.configurations"
                                :key="key"
                                class="border-b last:border-b-0"
                            >
                                <td class="text-left text-[0.7rem] font-sans py-2">
                                    <div
                                        v-for="spec in key.split(' ')"
                                        class="last:after:content-['мм']"
                                    >{{ spec }}</div>
                                </td>
                                <td class="text-right">{{ getPrice(value) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
table {
    border-spacing: 0;
    *border-collapse: collapse;
}
</style>