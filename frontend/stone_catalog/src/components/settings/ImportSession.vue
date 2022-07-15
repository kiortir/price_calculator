<script setup lang="ts">
import axios from 'axios';
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { Manufacturer, MaterialAddon, TokenHolder } from '../../../interfaces'


const csrftoken_holder = <TokenHolder>document.querySelector('[name=csrfmiddlewaretoken]');

const xcrf = { 'X-CSRFToken': csrftoken_holder.value, };

const route = useRoute()

if (!route.params.table) {
    const router = useRouter()
    router.replace({ name: 'import' })
}

const manufacturer_list = ref<{ name: string, id: number }[]>([])

const getManufacturers = () => {
    axios.get('/price_list/manufacturers').then((response) => manufacturer_list.value = response.data)
}
getManufacturers()

const setManufacturer = async (id: number) => {
    axios
        .get('/price_list/manufacturer?id=' + id)
        .then(response => form.value.manufacturer = <Manufacturer>response.data)
}

const params = ref(JSON.parse(<string>route.params.table || '[]'))

const headers = ref<{ [id: number]: { name: string; value: string } }>({})
const header_options = [
    {
        label: 'Название',
        value: 'name',
    },
    {
        label: 'Материал',
        value: 'material',
    },

    {
        label: 'Тип поверхности',
        value: 'surface',
    },
    {
        label: 'Толщина',
        value: 'thickness',
    },
    {
        label: 'Размер листа',
        value: 'slab_size',
    },
    {
        label: 'Артикул',
        value: 'code',
    },
    {
        label: 'Цена',
        value: 'price',
    },
    {
        label: 'Скидка',
        value: 'discount',
    },
]

const available_options = computed(() => {
    const used = Object.values(headers.value).map(x => x.value)
    let options = header_options
    if (Object.keys(form.value.manufacturer).length > 0) {
        const addons = <{ label: string, value: string }[]>form.value.manufacturer.material?.addons?.map((x: MaterialAddon) => ({ label: x?.name, value: x?.name }))
        options = options.concat(addons)
    }
    return options.filter(x => !used.includes(x.value))
})

const multipleSelection = ref([])

const handleSelectionChange = (val: []) => {
    multipleSelection.value = val
}

const form = ref({
    active_from: 0,
    manufacturer: <Manufacturer>{},
    discount: 0
})

const active_from = computed({
    // @ts-ignore
    get() {
        const date_value = form.value.active_from
        return date_value > 0 ? new Date(date_value * 1000) : null
    },
    set(val: Date) {
        form.value.active_from = val.getTime() / 1000;
    }
})

const validate = () => {
    let values = multipleSelection.value
    if (!values.length || !Object.keys(headers.value).length) {
        return
    }

    const formalized_values = values.map((row: { [idx: number]: string | number }) => {
        const new_row = <{ [idx: string]: string | number }>{}
        Object.entries(row).forEach(([key, value]) => {
            const new_key: string = headers.value[Number(key)]?.value
            if (new_key !== undefined) { new_row[new_key] = value }
        })
        return new_row
    })

    axios.put("/price_list/import/",
        {
            meta: form.value,
            entries: formalized_values
        },
        {
            headers: xcrf
        }
    )
}

</script>

<template>

    <div class="flex flex-col" v-if="params.length">
        <el-form :model="form">
            <el-form-item label="Поставщик">
                <el-select filterable :model-value="form.manufacturer.name"
                    @change="(val: number) => setManufacturer(val)" placeholder="Выберите поставщика">
                    <el-option v-for="manufacturer in manufacturer_list" :key="manufacturer.name"
                        :label="manufacturer.name" :value="manufacturer.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="Время активации">
                <el-date-picker v-model="active_from" type="datetime" placeholder="Выберите дату и время" />
            </el-form-item>
            <el-form-item label="Скидка на прайс, %">
                <el-input-number v-model="form.discount" :step="5" :min="0" :max="100"></el-input-number>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="validate()">Поехали</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="params" :border="true" table-layout="auto" class="w-screen" v-show="form.manufacturer.name"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column v-for="(_, index) in params[0]" :key="index" :prop="index" :label="index" width="220">
                <template #header>
                    <el-select filterable clearable v-model="headers[index]" :key="index + 'select'">
                        <el-option v-for="item in available_options" :key="item.value" :label="item.label" :value="item"
                            value-key="label" />
                    </el-select>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>