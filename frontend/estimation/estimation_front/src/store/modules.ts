import { defineStore } from 'pinia'
import { Modules } from '../interfaces'

export const useModuleStore = defineStore('modules', {
    state: () => {
        return {
            data: <Modules>{}
        }
    }
})
