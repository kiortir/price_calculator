<script setup lang="ts">
import { ref, Ref, computed } from 'vue'
import { Delete, Edit, InfoFilled, RefreshLeft } from '@element-plus/icons-vue'
import { Stone } from '../interfaces';
const props = defineProps<{
    stone: Stone
}>()

const edit = ref(false)

const available_options = computed(() => {
    const options = {
        thickness: new Map(),
        surface: new Map(),
        slab_size: new Map(),
    }

    const chosen_values = Object.entries(props.stone.settings)
    props.stone.configurations.forEach(configuration => {
        console.log({ configuration })
        const is_active = !chosen_values.some((entry) => {
            const [key, value] = entry
            if (value === undefined) {
                console.log({ entry })
                return false
            }
            console.log({ configuration })
            return configuration[key] !== value
        })
        const settings = ['surface', 'slab_size', 'thickness']
        settings.forEach(setting => {
            if (!options[setting].has(configuration[setting]) || !options[setting].get(configuration[setting]))
                options[setting].set(configuration[setting], is_active)//|| props.stone.settings[setting] !== undefined)
        });
    })

    return options

})

const resetStone = () => {
    props.stone.settings = { "thickness": undefined, "slab_size": undefined, "surface": undefined }
}

</script>

<template>
    <el-card class="box-card" shadow="hover">
        <template #header>
            <div class="card-header flex flex-row justify-between">
                <div class="flex flex-row self-end order-2 md:order-1 my-auto">
                    <el-button size="large" circle class="button" :icon="RefreshLeft" @click="resetStone" />
                    <el-popconfirm title="Точно удалить?" confirm-button-text="Да" cancel-button-text="Нет"
                        :icon="InfoFilled" icon-color="red" @confirm="$emit('Delete')" @cancel="() => { }">
                        <template #reference>
                            <el-button size="large" type="danger" circle class="button" :icon="Delete">
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
                <el-form :model="stone.settings" label-width="auto" label-position="top">
                    <el-form-item label="Толщина камня">
                        <el-radio-group v-model="stone.settings.thickness">
                            <el-radio-button v-for="([thickness_value, is_active]) in available_options.thickness"
                                :label="thickness_value" :disabled="!is_active">
                                {{ thickness_value + 'mm' }}
                            </el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="Тип поверхности">
                        <el-radio-group v-model="stone.settings.surface">
                            <el-radio-button v-for="([surface_value, is_active]) in available_options.surface"
                                :label="surface_value" :disabled="!is_active">
                                {{ surface_value }}
                            </el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="Размер плиты">
                        <el-radio-group v-model="stone.settings.slab_size">
                            <el-radio-button v-for="([slab_size_value, is_active]) in available_options.slab_size"
                                :label="slab_size_value" :disabled="!is_active">
                                {{ slab_size_value + 'mm' }}
                            </el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="Количество листов">
                        <el-input-number :min="0.5" :step="0.5" v-model="stone.count"></el-input-number>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </el-card>

    <el-dialog width="70%" top="10vh" lock-scroll :fullscreen="false" v-model="edit" title="Редактировать материал">
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
/* .el-card__header {
    background-color: rgb(203, 194, 255);
} */
</style>