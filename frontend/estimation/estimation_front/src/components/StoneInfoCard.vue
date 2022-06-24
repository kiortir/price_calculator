<script setup lang="ts">
import { ref, Ref, computed, ComputedRef } from 'vue'
import { Delete, Edit, InfoFilled, RefreshLeft } from '@element-plus/icons-vue'
import { CascaderValue, CascaderNodeValue } from 'element-plus/es/components/cascader-panel'
import { Stone } from '../interfaces';
const props = defineProps<{
    stone: Stone
}>()

const edit = ref(false)

const resetStone = () => {
    props.stone.settings = { "thickness": undefined, "slab_size": undefined, "surface": undefined }
}

const generated_options = computed(() => {
    const options: object[] = []
    const used_surface: string[] = []
    props.stone.configurations.forEach((option) => {
        let surface_index = used_surface.findIndex((val) => val === option.surface)
        if (surface_index === -1) {
            options.push({
                label: option.surface,
                value: option.surface,
                children: []
            })
            used_surface.push(option.surface)
            surface_index = used_surface.length - 1
        }
        let thickness_index = options[surface_index].children.findIndex((val) => val.value === option.thickness)
        if (thickness_index === -1) {
            options[surface_index].children.push({
                label: `${option.thickness} мм`,
                value: option.thickness,
                children: []
            })
            thickness_index = options[surface_index].children.length - 1
        }

        options[surface_index].children[thickness_index].children.push({
            label: `${option.slab_size} мм`,
            value: option.slab_size,
        })
    })
    return options
})

const stone_value: ComputedRef<CascaderValue | undefined> = computed({
    get() {
        return [<CascaderNodeValue>props.stone.settings.surface, <CascaderNodeValue>props.stone.settings.thickness, <CascaderNodeValue>props.stone.settings.slab_size]
    },
    set(val: Array<string>) {
        props.stone.settings.surface = val[0]
        props.stone.settings.thickness = val[1]
        props.stone.settings.slab_size = val[2]
    }
})

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
        <div class="w-full h-fit">

            <div class="">
                <el-form :model="stone.settings" label-width="auto" label-position="top" @submit.prevent>
                    <el-form-item label="Конфигурация камня">

                        <el-cascader class="w-full max-w-[400px]" v-model="stone_value" :options="generated_options" />
                    </el-form-item>
                    <el-form-item label="Количество листов">
                        <el-input-number :min="0.5" :step="0.5" v-model="stone.count"></el-input-number>
                    </el-form-item>
                </el-form>

                <!-- <el-form :model="stone.settings" label-width="auto" label-position="top" @submit.prevent>
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
                </el-form> -->
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