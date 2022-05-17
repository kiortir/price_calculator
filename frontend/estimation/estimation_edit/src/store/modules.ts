import { defineStore } from 'pinia'
import { Module } from '../interfaces'

export const useModuleStore = defineStore('modules', {
    state: () => {
        return {
            modules: <{ [index: string]: Module }>{},
            modules_list: <string[]>[]
        }
    },
    getters:
    {
        ordered_modules: function () {
            const ordered = JSON.parse(JSON.stringify(this.modules))
            for (let i = 0; i < this.modules_list.length; i++) {
                const module = this.modules_list[i].code
                ordered[module]._order = i
                delete ordered[module].templates
            }
            return ordered
        }
    },
    actions: {
        delete(module_code: string) {
            const index = this.modules_list.findIndex(el => el.code === module_code)
            this.modules_list.splice(index, 1)
            delete this.modules[module_code]
        }
    }

})
