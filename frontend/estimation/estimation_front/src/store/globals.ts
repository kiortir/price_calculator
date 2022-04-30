import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('globals', {
    state: () => {
        return {
            pricelist_id: 0,
            title: "Новый расчет",
            amo_lead_id: "",
            iteration_group: 0,
            iteration_version: 0,
            estimation_id: null
        }
    }
})
