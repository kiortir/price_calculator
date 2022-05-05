<script setup lang="ts">
import { ref, computed } from 'vue';
import { useGrid } from 'vue-screen'
const props = defineProps<{
    title: string
    lead: string
    dates: string[]
}>()
const emits = defineEmits(['search', 'update'])

const grid = useGrid('tailwind')

const dates = computed({
    get() { return props.dates },
    set(value) {
        emits('update', { field: 'dates', value })
    }
})


const lead = ref(props.lead)
const lead_input = ref()
const lead_input_value = ref()
const regex = /https:\/\/unirock.amocrm.ru\/leads\/detail\/\d{8}/gm;
const validateInput = (value: string) => {
    // const sanitized_value = sanitizeAmoLink(value)
    const regex_result = regex.exec(value)
    const link = regex_result ? regex_result[0] : null
    if (link) {
        lead_input.value!.input!.classList.remove('invalid-input')
        lead.value = link

    }
    else {
        lead_input.value!.input!.classList.add('invalid-input')
    }
}


const title = ref(props.title)


const search = () => {
    emits('search', {
        title: title.value,
        lead: lead.value,
        dates: dates.value
    })
}

</script>

<template>
    <div class=" flex items-center">
        <el-form :inline="grid.md" class="mx-auto w-fit" :label-position="grid.md ? 'left' : 'top'">
            <el-form-item label="Дата создания" class="w-fit mx-auto">
                <el-date-picker id="toolbox-datepicker" v-model="dates" type="daterange" unlink-panels
                    start-placeholder="Начальная дата" format="DD.MM.YYYY" end-placeholder="Конечная дата">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="Ссылка на лид">
                <el-input v-model="lead_input_value" @keyup.enter="validateInput(lead_input_value)"
                    @blur="validateInput(lead_input_value)" ref="lead_input"></el-input>
            </el-form-item>
            <el-form-item label="Название">
                <el-input v-model="title"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search()">Поиск</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<style>
@media screen and (max-width: 768px) {

    .el-picker-panel__content.el-date-range-picker__content {
        width: 100%;
    }

    .el-picker-panel__body,
    .el-picker-panel__body-wrapper,
    .el-picker-panel.el-date-range-picker {
        display: flex;
        flex-direction: column;
        min-width: 0px !important;
        max-width: 90vw;
    }
}

.invalid-input {
    border: 2px solid red !important;
}
</style>