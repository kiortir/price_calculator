<script setup lang="ts">
import { useRoute } from 'vue-router'
import axios from 'axios'
import { ref, computed, onMounted } from 'vue'
import draggable from 'vuedraggable'
import { Edit, Delete, Rank } from '@element-plus/icons-vue'
import PriceListConstants from './PriceListConstantsBlock.vue'
import ModuleEdit from './ModuleEdit.vue'
import TemplatesBlockVue from './TemplatesBlock.vue'
import { Module } from '../interfaces'
import { useModuleStore } from '../store/modules'
import { useConstantStore } from '../store/constants'
import { router } from '../router'

interface CSRFMeta extends Element {
    value: string
}

const csrftoken_holder = <CSRFMeta>document.querySelector('[name=csrfmiddlewaretoken]');
const csrftoken = csrftoken_holder.value


const route = useRoute()
const moduleStore = useModuleStore()
const constStore = useConstantStore()
const loading = ref(false)
const error = ref()
const selected_modules = ref([])

const editModule = ref(false)
const edited_module = ref(<Module>{})


const getModules = (origin_id: number | null = null) => {
    loading.value = true
    axios.get('/estimation/api/pricelist/modules/', {
        params: { origin_id }
    }).
        then(response => {

            loading.value = error.value = false
        })
}

const savePricelist = () => {
    axios({
        method: 'post',
        url: '/estimation/api/pricelist/',
        data: {
            constants: constStore.$state,
            modules: moduleStore.ordered_modules,
        },
        headers: { "X-CSRFToken": csrftoken }
    }).then(() => {
        router.back()
    })
}


const getPricelist = (id?: number): void => {
    axios.get('/estimation/api/pricelist/', {
        params: {
            id
        }
    }).then(response => {
        const data = response.data.data
        constStore.$state = data.variables
        moduleStore.modules = data.modules
        moduleStore.modules_list = Object.values(data.modules).sort((a: Module, b: Module) => { return (a._order || 0) - (b._order || 0) }) || []
    })
}


if (route.query.from !== undefined) {

    getPricelist(Number(route.query.from))
}

const drag = ref(false)
const dragOptions = computed(() => {
    return {
        animation: 200,
        disabled: false,
        ghostClass: "ghost"
    };
})
</script>

<template>
    <div class="container mx-auto mt-10 flex flex-col gap-3  mb-[100px]">

        <div class="settings">
            <el-button @click="savePricelist()">Сохранить</el-button>
        </div>
        <div>
            <p>Шаблоны</p>
            <TemplatesBlockVue></TemplatesBlockVue>
        </div>

        <div id="material-constants" class="">
            <PriceListConstants />
        </div>
        <div class="modules w-fit">
            <div class="flex flex-col gap-2 mb-12">
                <div class="text-xl font-semibold flex gap-2"><span>Модули</span>
                    <el-button class="transfer-footer" size="small" @click="edited_module = {}; editModule = true">
                        Добавить опцию
                    </el-button>
                </div>
                <draggable :list="moduleStore.modules_list" @start="drag = true" @end="drag = false" 
                    tag="transition-group" :component-data="{
                        tag: 'div',
                        type: 'transition-group',
                        name: !drag ? 'flip-list' : null
                    }" class="list-group" v-bind="dragOptions">
                    <template #item="{ element }">
                        <div
                            class="flex flex-row gap-2 items-center justify-between w-full pr-1 mb-2 ring-1 rounded-md p-2 list-group-item">
                            <div class="flex items-center gap-2">
                                <el-icon>
                                    <rank></rank>
                                </el-icon>
                                <span>{{ element.name }}</span>
                            </div>
                            <div class="flex flex-row">
                                <el-button size="small" :icon="Edit"
                                    @click="editModule = true; edited_module = moduleStore.modules[element.code]" />
                                <el-button size="small" :icon="Delete" type="danger"
                                    @click="moduleStore.delete(element.code)" />
                            </div>
                        </div>
                    </template>
                </draggable>
            </div>
            <module-edit :open="editModule" :module="edited_module" :key="Math.random()"
                @setEdit="value => { editModule = value }" />

        </div>
    </div>

</template>

<style>
.button {
    margin-top: 35px;
}

.flip-list-move {
    transition: transform 0.5s;
}

.no-move {
    transition: transform 0s;
}

.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}

.list-group {
    min-height: 20px;
}

.list-group-item {
    cursor: move;
}

.list-group-item i {
    cursor: pointer;
}
</style>
