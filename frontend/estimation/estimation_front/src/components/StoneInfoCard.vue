<script setup lang="ts">
import { ref, Ref, computed } from 'vue'
import { Delete, Edit, InfoFilled } from '@element-plus/icons-vue'
import { Stone } from '../interfaces';
import { el } from 'element-plus/lib/locale';
const props = defineProps<{
    stone: Stone
}>()

const edit = ref(false)
let thickness = ref("")
const surface = ref("")
const slab_size = ref("")

const thickness_options = computed(() => {
    return [...new Set(props.stone.configurations.map(el => el.thickness))]
})
const slab_size_options = computed(() => {
    return [...new Set(props.stone.configurations.map(el => el.slab_size))]
})
const surface_options = computed(() => {
    return [...new Set(props.stone.configurations.map(el => el.surface))]
})

let currency_formatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
});

const configuration = computed(() => {
    if (!(thickness.value && surface.value && slab_size.value)) {
        return "Выберите опции"
    }
    else {
        const config = props.stone.configurations.find(el => {
            console.log({ el, surface: surface.value })
            return ((el.thickness === thickness.value) && (el.slab_size === slab_size.value) && (el.surface === surface.value))
        })
        return "Цена: " + currency_formatter.format(config?.rub_price)
    }
})


</script>

<template>
    <el-card class="box-card" shadow="hover">
        <template #header>
            <div class="card-header flex flex-row justify-between">
                <div class="flex flex-row gap-2 self-end order-2 md:order-1 my-auto">
                    <el-popconfirm title="Точно удалить?" confirm-button-text="Да" cancel-button-text="Нет"
                        :icon="InfoFilled" icon-color="red" @confirm="$emit('Delete')" @cancel="() => { }">
                        <template #reference>
                            <el-button size="large" circle class="button" :icon="Delete">
                            </el-button>
                        </template>
                    </el-popconfirm>
                </div>
                <div class="flex flex-col my-auto">
                    <span class="flex flex-row flex-wrap gap-x-2 text-xl">
                        <span class="font-semibold">{{ stone.manufacturer }}</span>
                        <span class="">{{ stone.name }}</span>
                    </span>
                    <span class="flex md:justify-end text-sm text-gray-400">{{ stone.code || "" }}</span>
                </div>
            </div>
        </template>
        <div
            class="flex flex-col md:grid  md:grid-flow-row md:grid-rows-1 md:grid-cols-2 gap-2 divide-y-2 md:divide-y-0 md:divide-x-2">
            <div class="controls flex flex-col">
                <div class="thickness flex flex-col">
                    <span class="text-lg font-semibold">Толщина камня</span>
                    <el-radio-group v-model="thickness">
                        <el-radio-button v-for="(thickness_value, index) in thickness_options" :label="thickness_value">
                            {{ thickness_value + 'mm' }}
                        </el-radio-button>
                    </el-radio-group>
                </div>
                <div class="surface flex flex-col">
                    <span class="text-lg font-semibold">Поверхность</span>
                    <el-radio-group v-model="surface">
                        <el-radio-button v-for="(surface_value, index) in surface_options" :label="surface_value">
                            {{ surface_value }}
                        </el-radio-button>
                    </el-radio-group>
                </div>
                <div class="slab_size flex flex-col">
                    <span class="text-lg font-semibold">Размер плиты</span>
                    <el-radio-group v-model="slab_size">
                        <el-radio-button v-for="(slab_size_value, index) in slab_size_options" :label="slab_size_value">
                            {{ slab_size_value + 'mm' }}
                        </el-radio-button>
                    </el-radio-group>
                </div>
            </div>
            <div class="flex flex-shrink">
                <div class="self-center mx-auto font-semibold text-2xl">{{ configuration }}</div>
            </div>
        </div>

    </el-card>

    <el-dialog width="70%" top="10vh" lock-scroll :fullscreen="!$grid.md" v-model="edit" title="Редактировать материал">
        <el-scrollbar height="">

        </el-scrollbar>
        <template #footer>
            <span class="dialog-footer sticky bottom-0">
                <el-button type="primary" @click="edit = false">Готово</el-button>
            </span>
        </template>
    </el-dialog>


</template>

<style>
.el-card__header {
    background-color: rgb(203, 194, 255);
}
</style>