import { defineStore } from 'pinia'
import { Modules } from '../interfaces'

export const useModuleStore = defineStore('modules', {
    state: () => {
        return {
            data: <Modules>{}
        }
    },
    getters: {
        modules: function () {
            const values = Object.values(this.data)
            const result = Array(values.length)
            values.forEach(value => {
                result[value._order] = value
            })
            return result
        }
    }
})
