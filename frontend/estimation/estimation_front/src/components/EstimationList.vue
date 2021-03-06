<script setup lang="ts">
import Toolbox from './Toolbox.vue';

import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import ru from 'element-plus/lib/locale/lang/ru'
import { ElConfigProvider } from 'element-plus'

import { EstimationAPI } from '../interfaces'

import axios from 'axios'

const route = useRoute()
const router = useRouter()
const locale = ru

const estimations = ref(<EstimationAPI[]>[])
const page_count = ref(1)
const current_page = ref()
const page_size = ref(10)
const filter = ref({
    title: "",
    dates: ["", ""],
    lead: ""
})

const fetchEstimations = ({ page = 1, limit = page_size.value, title = "", dates = [], lead = "" }) => {
    const params = { page, limit, title, dates, lead }
    axios.get('api/', {
        params
    }).then((response: {
        data: {
            estimations: EstimationAPI[]
            total: number
        }
    }) => {
        router.replace({ query: params })
        current_page.value = page
        filter.value.dates = dates
        filter.value.title = title

        filter.value.lead = lead

        estimations.value = response.data.estimations
        page_count.value = response.data.total
    })
}
onMounted(() => {
    if (!route.query.page?.length) {
        current_page.value = parseInt(<string>route.query.page)
    }

    fetchEstimations({ ...route.query })
})


const getName = (name_obj: {
    first_name: string
    last_name: string
    id: number
    username: string
}) => {
    const name = name_obj.first_name + name_obj.last_name ? ' ' + name_obj.last_name : ''
    return name || name_obj.username
}

const getDateTime = (time: string) => {
    const date_time = new Date(time)
    return date_time.toLocaleString()
}

const routed_id = ref()
const open_estimation = (id: number) => {
    routed_id.value = id
    router.push({ name: 'estimation', params: { id } })
}

const search = (values: object) => {
    axios.get('api/search/', { params: Object.assign(values, { limit: page_size.value, page: 0 }) })
}

const setField = (payload: { field: string; value: string | string[] }) => {
    const field = payload.field
    // @ts-expect-error
    filter.value[field] = payload.value
}

</script>

<template>
    <el-config-provider :locale="locale">
        <div class="container mx-auto mt-10">
            <toolbox :title="filter.title" :lead="filter.lead" :dates="filter.dates"
                @update="payload => setField(payload)" @search="values => fetchEstimations({ ...values })"></toolbox>
            <div class="flex flex-col gap-3 align-center w-full  px-10">
                <el-card class="box-card w-full" v-for="estimation in estimations">
                    <template #header>
                        <div class="card-header flex justify-between items-center">
                            <span>{{ estimation.globals.title || `Расчет #${estimation.globals.id}` }}</span>
                            <el-button class="button" type="text" @click="open_estimation(estimation.globals.id)"
                                :loading="routed_id === estimation.globals.id">
                                Перейти
                            </el-button>
                        </div>
                    </template>
                    <div>
                        <ul>
                            <li>Автор: {{ getName(estimation.globals.created_by) }}</li>
                            <li>Дата создания: {{ getDateTime(estimation.globals.created_at) }}</li>
                            <li v-if="estimation.globals.amo_lead_id">Привязанный лид: <a
                                    :href="estimation.globals.amo_lead_id">{{ estimation.globals.amo_lead_id }}</a>
                            </li>
                        </ul>
                    </div>
                </el-card>
            </div>
            <div class="mx-auto w-fit mt-3 mb-10">
                <el-pagination v-model:page-size="page_size" layout="prev, pager, next, sizes" :page-count="page_count"
                    :current-page="current_page" @current-change="page => fetchEstimations({ page })"
                    :page-sizes="[10, 25, 50, 75]" hide-on-single-page />
            </div>
        </div>
    </el-config-provider>
</template>