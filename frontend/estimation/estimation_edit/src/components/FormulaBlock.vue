<script setup lang="ts">
import { ref, Ref, computed } from 'vue'
import { Plus, Minus, Delete } from '@element-plus/icons-vue'
import { Field, FormulaElement } from '../interfaces'

defineProps<{
    fields: {
        [id: string]: Field
    }
}>()





const price_formula: Ref<FormulaElement[]> = ref([])
const salary_formula = ref([])
const consumables_formula = ref([])


const edited_formula = ref()

interface OPERATOR_DICT {
    [key: string]: FormulaElement
}

const OPERATORS: OPERATOR_DICT = {
    plus: {
        type: 'operator',
        value: '+'
    },
    minus: {
        type: 'operator',
        value: '-'
    },
    division: {
        type: 'operator',
        value: '/'
    },
    multiplication: {
        type: 'operator',
        value: '*'
    },
    o_bracket: {
        type: 'operator',
        value: '('
    },
    c_bracket: {
        type: 'operator',
        value: ')'
    },
}


const addField = (field: Field) => {
    if (edited_formula.value) {
        const latest = edited_formula.value[edited_formula.value.length - 1] || 0
        if (!latest || latest.type === 'operator') {
            switch (field.type) {
                case ('constant'): {
                    edited_formula.value.push(<FormulaElement>{
                        type: 'constant',
                        value: ref(field.value).value
                    })
                    break
                }
                default: {
                    edited_formula.value.push(<FormulaElement>{
                        type: 'field',
                        name: field.name,
                        reference: field.code
                    })
                }
            }
        }
    }
}

const addOperator = (operator: string) => {
    if (edited_formula.value) {
        const latest = edited_formula.value[edited_formula.value.length - 1] || 0
        const operator_value = OPERATORS[operator]
        if (latest && latest.type !== 'operator') {
            edited_formula.value.push(operator_value)
        }
    }
}


</script>


<template>
    <div class="ring-1 ring-unirock p-3 rounded-sm class flex flex-col">
        <p class="text-2xl mb-3">Формула</p>
        <div class="flex flex-col md:flex-row md:divide-x gap-3">
            <div class="md:basis-9/12 order-2">
                <div class="flex flex-col">
                    <div class="p-3 text-lg flex flex-row gap-5 ring-1 rounded-md"
                        :class="edited_formula === price_formula ? 'bg-sky-100' : ''"
                        @click="edited_formula = price_formula">
                        <span>Цена</span>
                        <div class="formula-price flex flex-row gap-2">
                            <div class="bg-primary rounded-md text-white min-w-[40px] px-2 h-8 text-sm flex"
                                v-for="element in price_formula">
                                <span class="place-self-center mx-auto">{{ element.name || element.value }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="values order-1 md:order-3 md:basis-3/12 w-full">
                <div class="flex flex-row md:flex-col divide-x md:divide-x-0 md:divide-y gap-3 md:pl-3">
                    <div class="">
                        <p class="text-gray-500 text-lg">Операции</p>
                        <div class="flex flex-row">
                            <el-button @click="addOperator('plus')" :icon="Plus" type="primary"></el-button>
                            <el-button :icon="Minus" type="primary"></el-button>
                            <el-button type="primary">*</el-button>
                            <el-button type="primary">/</el-button>

                            <el-button :icon="Delete" type="danger" @click="edited_formula.pop()"></el-button>
                        </div>
                    </div>
                    <div class="pl-3 md:pl-0">
                        <p class="text-gray-500 text-lg">Прочее</p>
                        <div>Расстояние до объекта</div>
                    </div>
                    <div class="pl-3 md:pl-0">
                        <p class="text-gray-500 text-lg">Поля</p>
                        <div class="divide-y flex flex-col">
                            <button @click="addField({ ...field, ...{ code: id } })" class="text-left hover:bg-sky-100"
                                v-for="(field, id) in fields" :key="id">
                                {{ field.name }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>