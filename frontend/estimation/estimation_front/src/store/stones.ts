import { defineStore } from 'pinia'
import { Stone } from '../interfaces'

export const useStore = defineStore('stones', {
    state: () => {
        return {
            stones: <Stone[]>[],
        }
    },
    actions: {
        addCard(data: Stone) {
            // if (!data) {
            //     data = <Stone>{}
            // }
            this.stones.push(data)
        },
        deleteCard(index: number) {
            this.stones.splice(index, 1);
        }
    }
})
