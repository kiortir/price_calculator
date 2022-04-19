<script setup lang="ts">
import { useRoute } from 'vue-router'
import axios from 'axios'
import { ref, computed, onMounted } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import PriceListConstants from './PriceListConstantsBlock.vue'
import ModuleEdit from './ModuleEdit.vue'
import { Module } from '../interfaces'
import { useStore } from '../store/modules'


const route = useRoute()
const store = useStore()
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

</script>

<template>
    <div class="container mx-auto mt-10 flex flex-col gap-3  mb-[100px]">
        <div class="settings">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ut ab sunt libero fuga
            accusamus rem corrupti maiores, quo fugiat esse magni enim voluptate possimus facere deleniti doloremque
            iste eius.</div>

        <div id="material-constants" class="">
            <PriceListConstants />
        </div>
        <div class="modules w-fit mx-auto">
            <el-transfer v-model="selected_modules" filterable :titles="['Доступные', 'Используемые']"
                :button-texts="['Убрать', 'Добавить']" :data="Object.values(store.modules)" :props="{
                    key: 'code',
                    label: 'name',
                    disabled: ''
                }">
                <template #default="{ option }">
                    <div class="flex flex-row gap-2 items-center justify-between w-full pr-1">
                        <span class="">{{ option.name }}</span>
                        <div class="flex flex-row">
                            <el-button size="small" :icon="Edit"
                                @click="editModule = true; edited_module = store.modules[option.code]" />
                                <el-button size="small" :icon="Delete" type="danger"
                                @click="delete store.modules[option.code]" />
                        </div>
                    </div>
                </template>
                <template #left-footer>
                    <div class=" w-full h-full flex place-content-center">
                        <div class="my-auto">
                            <el-button class="transfer-footer" size="small" @click="edited_module = {};editModule = true">Добавить
                                опцию
                            </el-button>
                        </div>
                    </div>
                </template>
                <template #right-footer>
                    <el-button class="transfer-footer" size="small">Operation</el-button>
                </template>
            </el-transfer>
            <module-edit :open="editModule" :module="edited_module" :key="Math.random()"
                @setEdit="value => { editModule = value }" />
        </div>
    </div>

</template>

<style >
</style>
