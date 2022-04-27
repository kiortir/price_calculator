<script setup lang="ts">
import { useRoute } from 'vue-router'
import axios from 'axios'
import { ref, watch, onMounted } from 'vue'
import { CircleCheck, DocumentCopy } from '@element-plus/icons-vue'

interface CSRFMeta extends Element {
  value: string
}

const csrftoken_holder = <CSRFMeta>document.querySelector('[name=csrfmiddlewaretoken]');
const csrftoken = csrftoken_holder.value

const route = useRoute()

const loading = ref(false)
const error = ref()

const default_pricelist_id = ref()
const pricelists = ref()

const fetch = () => {
  loading.value = true
  axios.get('/estimation/api/pricelist/').
    then(response => {
      pricelists.value = response.data.data
      default_pricelist_id.value = response.data.default
      loading.value = error.value = false
    })
}
const set_pricelist_loading = ref()
const setDefaultPricelist = (id: number) => {
  set_pricelist_loading.value = id
  axios({
    method: 'patch',
    url: '/estimation/api/pricelist/',
    data: { id },
    headers: { "X-CSRFToken": csrftoken }
  }).then(response => {
    if (response.status === 200) {
      default_pricelist_id.value = id
      set_pricelist_loading.value = null
    }

  })
}

onMounted(() => {
  fetch()
})

</script>

<template>

  <div class="container mx-auto mt-10 font-sans flex flex-col gap-3">
    <div class="filter-panel rounded-sm p-1 ring-1">zzz</div>
    <div class="pricelist-container flex min-h-[40vh]">
      <div class="place-self-center text-center mx-auto h-full text-gray-500" v-if="pricelists && !pricelists.length">
        <el-empty description="Ни одного прайс-листа не было найдено(" />
        <router-link class="underline underline-offset-2 text-lg hover:text-blue-600" to="/new">Создайте первый!
        </router-link>
      </div>
      <div v-else class="content w-full flex flex-col gap-2 ">
        <div class="addnew w-full">
          <router-link to="/new">
            <el-button type="primary" class="w-full" size="large">Добавить новый</el-button>
          </router-link>
        </div>
        <el-card class="box-card even:bg-sky-100/50" shadow="hover" v-for="pricelist in pricelists" :key="pricelist.id">
          <template #header>
            <div class="card-header flex flex-row justify-between">

              <div class="my-auto flex flex-col md:flex-row gap-2">
                <span class="my-auto">Прайс лист от {{
                  new Date(pricelist.created_at).toLocaleString('ru', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                  })
                }}</span>
                <span class="self-end md:self-start flex flex-row gap-1 text-green-600"
                  v-if="pricelist.id === default_pricelist_id">
                  <span class="self-middle flex">
                    <el-icon class="my-auto">
                      <circle-check />
                    </el-icon>По умолчанию
                  </span>
                </span>
              </div>
              <div>
                <el-button class="button" type="success" :loading="set_pricelist_loading === pricelist.id"
                  v-if="pricelist.id !== default_pricelist_id" @click="setDefaultPricelist(pricelist.id)">
                  <span>Сделать основным</span>
                </el-button>

                <el-button class="button" type="primary" :icon="DocumentCopy">
                  <router-link :to="{ name: 'new_pricelist', params: { from: pricelist.id } }">
                    <span>Создать на основе</span>
                  </router-link>
                </el-button>

              </div>
            </div>
          </template>
          <div class="">Создатель: {{
            pricelist.created_by.first_name || pricelist.created_by.last_name
              ? [pricelist.created_by.first_name, pricelist.created_by.last_name].join(' ')
              : pricelist.created_by.username
          }}</div>
        </el-card>
      </div>
    </div>


  </div>
</template>

<style scoped>
</style>
