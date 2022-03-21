<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

import { useRoute, useRouter } from 'vue-router'
import { useGrid } from 'vue-screen'
import ManufacturerTabs from './ManufacturerTabs.vue';
import ManufacturerTableVue from './ManufacturerTable.vue';
import ManufacturerInfoVue from './ManufacturerInfo.vue';
import DialogVue from './Dialog.vue';


const route = useRoute()
const router = useRouter()
let showManufacturers = ref(false)
let showInfo = ref(false)
let currentTab = ref("Avant")

let currentManufacturerTab = computed<string>({
  get() {
    return <string>route.query.manufacturer || 'Avant'
  },
  set(val: string) {
    const new_query = Object.assign({}, { manufacturer: val })
    router.push({ query: new_query })
  }
})
const table_c = ref({})
function search_focus() {
  console.log(table_c.value)
  table_c.value.stonesearch.focus()
}
// onMounted(() => {
//   let search_focus = () => {
//     console.log(table_c.value)
//   }
// })

const grid = useGrid('tailwind')

</script>

<template>
  <div class="flex flex-col xl:flex-row mx-auto h-full">
    <div
      class="manufacturer-nav mb-2 xl:mb-0 sticky flex flex-col min-w-[250px] xl:h-screen top-0 overflow-y-auto border-slate-600 z-20"
    >
      <div class="gap-y-2 flex-col flex pt-[1px] bg-white xl:h-screen">
        <div class="xl:hidden">
          <div class="nav flex flex-row gap-2 place-items-center border-b p-3 h-12 w-full">
            <div class="text-xl flex-grow text-left">{{ currentTab }}</div>
            <div
              type="button"
              class="show-manufacturers rounded-full p-1"
              @click="showInfo = !showManufacturers"
            >
              <svg
                class="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
            <div
              type="button"
              id="mobile-func-header"
              class="show-manufacturers rounded-full p-1"
              @click="showManufacturers = !showManufacturers"
            >
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
            </div>
          </div>
        </div>
        <ManufacturerTabs
          v-if="grid.xl"
          :tab="currentTab"
          @update="(tab: string) => currentTab = tab"
        />
        <DialogVue v-else :open="showManufacturers" @set-is-open="(val) => showManufacturers = val">
          <template #title>Производители</template>
          <template #body>
            <KeepAlive>
              <ManufacturerTabs
                v-slot:body
                :tab="currentTab"
                :key="currentTab"
                @update="(tab: string) => { currentTab = tab; showManufacturers = false }"
              ></ManufacturerTabs>
            </KeepAlive>
          </template>
        </DialogVue>
      </div>
    </div>

    <ManufacturerTableVue ref="table_c" :manufacturer="currentTab" :key="currentTab" />
    <ManufacturerInfoVue
      class="info flex-col flex-grow sticky top-0 right-0 flex w-fit xl:h-screen overflow-y-auto"
      :manufacturer="currentTab"
      :key="currentTab"
      v-if="grid.xl"
    >
      <p class="text-2xl font-semibold mb-5">Дополнительная информация</p>
    </ManufacturerInfoVue>
    <DialogVue v-else :open="showInfo" @set-is-open="(val) => showInfo = val">
      <template #title>Дополнительная информация</template>
      <template #body>
        <KeepAlive>
          <ManufacturerInfoVue
            class="info flex-col flex-grow w-fit"
            :manufacturer="currentTab"
            :key="currentTab"
          />
        </KeepAlive>
      </template>
    </DialogVue>
    <a
      href="#top"
      class="xl:hidden fixed bottom-7 right-3 p-3 bg-blue-500 rounded-full"
      @click="() => search_focus()"
    >
      <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </a>
  </div>
</template>

<style scoped>
</style>
