<script setup lang="ts">
import { ref, Ref, computed, onMounted } from 'vue'
import { useModuleStore } from '../store/modules'
import { Plus, Delete } from '@element-plus/icons-vue'
import SelectorFields from './SelectorFields.vue'
import FormulaBlock from './FormulaBlock.vue'
import TemplateSelector from './TemplateSelector.vue'
import ConstField from './ConstField.vue'
import { useConstantStore } from '../store/constants';
import { Field, Module, Option } from '../interfaces';

const store = useModuleStore()

const isOpen = computed({
    get() {
        return props.open
    },
    set(value: boolean) {
        emits('setEdit', value)
    }
})

function makeid(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

const props = defineProps<{
    module: Module
    open: boolean
}>()
const emits = defineEmits(['setEdit'])

const form: Ref<Module> = ref(<Module>{})

onMounted(() => {
    if (Object.keys(props.module).length) {
        form.value = JSON.parse(JSON.stringify(props.module))
    }
    else {
        form.value = {
            name: "",
            code: makeid(9),
            fields: {},
            settings: {},
            formula: {
                salary: [],
                price: [],
                consumables: [],
            },
            templates: useConstantStore().templates

        }
    }
})



const ComponentFields = {
    selector: SelectorFields,
    constant: ConstField
}

function addModuleField() {
    form.value.fields[makeid(15)] = <Field>{
        name: "",
        type: "",
    }

}


const editFormulas = ref(false)

function save() {
    store.modules[form.value.code] = form.value
    emits('setEdit', false)
}

</script>

<template>
    <el-dialog fullscreen v-model="isOpen" :title="module.name || 'Новый модуль'">
        <div class="main container mx-auto p-30 mb-[50px] flex flex-col gap-3" v-if="!editFormulas">
            <el-form :model="form">
                <el-form-item label="Название модуля">
                    <el-input v-model="form.name" />
                </el-form-item>
            </el-form>
            <div class="grid grid-flow-row grid-cols-1 gap-5">
                <div class="ring-1 rounded-md p-3" v-for="(field, id) in form.fields" :key="id">
                    <div class="text-xl flex flex-row justify-between mb-2">
                        <span>
                            {{
                                    field.name || "Новое поле"
                            }}
                        </span>
                        <el-button type="danger" :icon="Delete" @click="delete form.fields[id]"></el-button>
                    </div>
                    <el-form :model="field" label-width="auto">
                        <el-form-item label="Название поля">
                            <el-input v-model="field.name" clearable type='string' />
                        </el-form-item>
                        <el-form-item label="Тип поля">
                            <el-select v-model="field.type" placeholder="выберите тип поля">
                                <el-option label="Константа" value="constant" />
                                <el-option label="Переменная" value="variable" />
                                <el-option label="Селектор" value="selector" />
                                <el-option label="Радиогруппа" value="Radio" />
                            </el-select>
                        </el-form-item>
                        <component :is="ComponentFields[field.type]" :field="field"></component>
                    </el-form>
                </div>
            </div>
            <el-button :icon="Plus" type="primary" @click="addModuleField()">Добавить поле</el-button>
        </div>
        <div class="main container mx-auto p-30 mb-[50px] flex flex-col gap-3" v-else>
            <formula-block :fields="form.fields" :formula=form.formula></formula-block>
            <TemplateSelector :moduleId="form.code" :form="form" />
        </div>
        <template #footer>
            <span class="dialog-footer" v-if="editFormulas">
                <el-button @click="editFormulas = false">Отменить</el-button>
                <el-button type="primary" @click="save()">Сохранить</el-button>
            </span>
            <span class="dialog-footer" v-else>
                <el-button @click="isOpen = false">Отменить</el-button>
                <el-button type="primary" @click="editFormulas = true">К формулам</el-button>
            </span>
        </template>
    </el-dialog>

</template>

<style >
</style>
