import { defineStore } from 'pinia'


export const useStore = defineStore('constants', {
    state: () => {
        return {
            material: {
                delivery: {
                    price: 0,
                },
                overprice: {
                    percent: 0,
                    lte: 0
                }
            },
            logistics: {
                delivery: {
                    price: 0,
                    salary: 0,
                    consumables: 0,
                    distance_modfier: 0,
                },
                installation: {
                    price_const: 0,
                    price_var: 0,
                    salary_const: 0,
                    salary_var: 0,
                    consumables: 0,
                    distance_modfier: 0,
                },
                measurement: {
                    price: 0,
                    salary: 0,
                    consumables: 0,
                    distance_modfier: 0,
                    template: 0,
                },
                manual_lift: {
                    price: 0,
                    salary: 0,
                    consumables: 0,
                },
                disassembly: {
                    price: 0,
                    salary: 0,
                    consumables: 0,
                },

            },
        }
    },

})