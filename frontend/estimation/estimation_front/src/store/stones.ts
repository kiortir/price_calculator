import { defineStore } from 'pinia'
import { useLogisticStore } from './logistics'
import { useConstantStore } from './constants'
import { priceField, Stone } from '../interfaces'

interface FlatPrice {
    [name: string]: {
        [key in priceField]?: number
    }
}

export const useStore = defineStore('stones', {
    state: () => {
        return {
            stones: <Stone[]>[],
        }
    },
    actions: {
        addCard(data: Stone) {
            data.settings = {
                thickness: undefined,
                slab_size: undefined,
                surface: undefined
            }
            data.cut_price = 1000
            data.count = 1
            this.stones.push(data)
        },
        deleteCard(index: number) {
            this.stones.splice(index, 1);
        }
    },
    getters: {
        raw_prices: function (): {} {

            const constants = useConstantStore().material
            const result: FlatPrice = {}
            // const valid_results = []
            for (const stone of Object.values(this.stones)) {
                if (Object.values(stone.settings).some(val => !val)) {
                    result[stone.name] = { price: 0, salary: 0, consumables: 0 }
                    continue
                }
                const config = stone.configurations.filter(configuration => {
                    for (const key in stone.settings) {
                        if (stone.settings[key] !== configuration[key]) {
                            return false
                        }
                    }
                    return true
                })
                if (config.length === 0) {
                    result[stone.name] = { price: 0, salary: 0, consumables: 0 }
                    continue
                }
                const cut_price = stone.cut_price * Math.ceil(stone.count % 1)
                const alleged_overprice = config[0].rub_price * constants.overprice.percent
                const overprice = alleged_overprice < constants.overprice.lte ? alleged_overprice : constants.overprice.lte
                result[stone.name] = {
                    price: (((config[0].rub_price + overprice) * stone.count + cut_price * 1.5 + constants.delivery.price) || 0),
                    consumables: config[0].rub_price * stone.count + cut_price + constants.delivery.price // !Заменить на расходник!!
                }
                // valid_results.push(stone.name)
            }

            return result
        },
        prices: function () {
            const hidden = useLogisticStore().hiddenSum
            const valid_results = []
            const prices = JSON.parse(JSON.stringify(this.raw_prices)) || {}
            console.log(prices)
            for (const [key, value] of Object.entries(prices)) {
                console.log({ value })
                if (value.price > 0) {
                    valid_results.push(key)
                }
            }
            const hidden_spread = Math.ceil(hidden / (valid_results.length || 1))
            console.log(valid_results)

            valid_results.forEach(name => {
                prices[name].price += hidden_spread
            })
            return prices
        },
        total: function () {
            const total = { price: 0, discount10: 0, discount20: 0, discount30: 0, salary: 0, consumables: 0 }
            Object.values(this.prices).forEach(stone => {
                total.price += stone.price
                total.discount10 += stone.price
                total.discount20 += stone.price
                total.discount30 += stone.price
                total.consumables += stone.consumables
            })
            return total
        }

    }
})
