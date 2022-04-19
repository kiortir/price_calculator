import { defineStore } from 'pinia'
import { Module } from '../interfaces'

export const useStore = defineStore('modules', {
    state: () => {
        return {
            modules: <Module[]>[]
        }
    },
    actions: {
        addModule(moduleData: Module) {
            this.modules.push(moduleData)
        }
    }

})
