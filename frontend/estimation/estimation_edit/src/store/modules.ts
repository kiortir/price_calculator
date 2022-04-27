import { defineStore } from 'pinia'
import { Module } from '../interfaces'

export const useModuleStore = defineStore('modules', {
    state: () => {
        return {
            modules: <{ [index: string]: Module }>{}
        }
    },
    actions: {
        addModule(moduleData: Module) {
            this.modules.push(moduleData)
        }
    }

})
