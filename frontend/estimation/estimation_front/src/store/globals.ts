import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('globals', {
    state: () => {
        return {
            pricelist: null,
            title: "",
            amo_lead_id: "",
            iteration_group: null,
            iteration_version: null,
            id: null,
            selected_discount: 'price'
        }
    }
})
