import { defineStore } from 'pinia'

export const useRootStore = defineStore('root', {
    state: () => {
        return {
            pricelist_id: null,
            is_locked: false
        }
    }
})
