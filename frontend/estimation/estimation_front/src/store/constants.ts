import { defineStore } from 'pinia'

export const useConstantStore = defineStore('constants', {
    state: () => {
        return {
            modules: [
                {
                    name: 'Монтаж',
                    fields: {
                        mount_size: {
                            name: 'Погонаж для монтажа',
                            type: 'variable'
                        }
                    }
                }
            ],
            logistics: {
                "delivery": {
                    "price": 0, "salary": 0, "consumables": 0, "distance_modifier": 0, "salary_distance_modifier": 0
                },
                "disassembly": {
                    "price": 0, "salary": 0, "consumables": 0
                },
                "manual_lift": {
                    "price": 0, "salary": 0, "consumables": 0
                },
                "measurement": {
                    "price": 0, "salary": 0, "template_price": 0, "template_salary": 0, "consumables": 0, "distance_modifier": 0, "salary_distance_modifier": 0
                },
                "installation": {
                    "price_var": 0, "salary_var": 0, "consumables": 0, "price_const": 0, "salary_const": 0, "distance_modifier": 0, "salary_distance_modifier": 0
                }
            },
            material: { "delivery": { "price": 0, "consumables": 0 }, "overprice": { "lte": 0, "percent": 0 } },
            templates: {},
            templates_list: []
        }
    }
})
