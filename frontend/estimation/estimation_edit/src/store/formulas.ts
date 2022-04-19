import { defineStore } from 'pinia'


export const useStore = defineStore('formulas', {
    state: () => {
        return {
            price: [],
            salary: [],
            consumables: [],
        }
    },

})
