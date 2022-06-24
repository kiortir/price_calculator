<script setup lang="ts">
import { computed } from 'vue';
import { useProductStore } from '../store/products'
import { useModuleStore } from '../store/modules';
import { filter } from 'lodash';

const props = defineProps<{
    product_id: string
}>()

const store = useProductStore()
const modules = useModuleStore()
const product = store.products[props.product_id]

const options = computed(() => {
    const option_list = Object.entries(product.data.options)
    const filtered_options = <{ [key: string]: [] }>{}

    for (const [id, fields] of option_list) {
        if (!Object.keys(fields).length) {
            continue
        }
        const plain_id = id.split('_')[0]
        const option_data = modules.data[plain_id]
        const name = option_data.name
        const f_fields = Object.entries(fields).map(([id, value], idx) => ({
            name: option_data.fields[id].name,
            value
        }))
        filtered_options[name] = f_fields
    }
    return filtered_options
})

</script>


<template>
    <div class="grid gap-2 flex-wrap">
        <div class="pl-2" v-for="(fields, name, index) in options" :key="name + index">
            <div class="font-semibold">{{ name }}</div>
            <div class="flex justify-between text-[0.75rem]" v-for="(field, fid) in fields" :key="fid">
                <span>{{ field.name }}:</span>
                <span>{{ field.value }}</span>
            </div>
        </div>
    </div>
</template>