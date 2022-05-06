import { defineStore } from 'pinia'
import { useLogisticStore } from './logistics'
import { useConstantStore } from './constants'
import { priceField, Stone } from '../interfaces'

interface FlatPrice {
    [name: string]: {
        [key in priceField]?: number
    }
}

function getEnding(count: number) {
    if (count === 1) {
        return ''
    }
    if (count % 1) {
        return 'а'
    }
    const lastdigit = count % 10
    if ((10 <= count && count <= 20) || [0, 5, 6, 7, 8, 9].some(digit => digit === lastdigit)) {
        return 'ов'
    }
    else {
        return 'а'
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
                const name = `${stone.manufacturer + (stone.code ? ' ' + stone.code : '')} ${stone.name}, ${stone.count} лист${getEnding(stone.count)}`
                if (Object.values(stone.settings).some(val => !val)) {
                    result[name] = { price: 0, salary: 0, consumables: 0 }
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
                    result[name] = { price: 0, salary: 0, consumables: 0 }
                    continue
                }

                const cut_price = stone.cut_price * Math.ceil(stone.count % 1)
                const alleged_overprice = config[0].rub_price * constants.overprice.percent / 100
                const overprice = Math.min(alleged_overprice, constants.overprice.lte)
                const same_manufacturer_stones = this.stones.filter(s => s.manufacturer === stone.manufacturer).length
                const delivery = {
                    price: constants.delivery.price / same_manufacturer_stones,
                    consumables: constants.delivery.consumables / same_manufacturer_stones// !Заменить на расходник
                }
                result[name] = {
                    price: Math.ceil(((config[0].rub_price + overprice) * stone.count + cut_price * 1.5 + delivery.price) || 0),
                    consumables: config[0].rub_price * stone.count + cut_price + delivery.consumables
                }
                // valid_results.push(stone.name)
            }

            return result
        },
        prices: function () {
            const hidden = useLogisticStore().hiddenSum
            const valid_results = []
            const prices = JSON.parse(JSON.stringify(this.raw_prices)) || {}
            for (const [key, value] of Object.entries(prices)) {
                if (value.price > 0) {
                    valid_results.push(key)
                }
            }
            const hidden_spread = Math.ceil(hidden / (valid_results.length || 1))

            valid_results.forEach(name => {
                prices[name].price += hidden_spread
            })
            return prices
        },
        total: function () {
            const total = { price: 0, discount10: 0, discount20: 0, discount30: 0, salary: 0, consumables: 0, raw:0 }
            Object.values(this.prices).forEach(stone => {
                total.price += stone.price
                total.discount10 += stone.price
                total.discount20 += stone.price
                total.discount30 += stone.price
                total.consumables += stone.consumables
                total.raw += stone.price
            })
            return total
        }

    }
})
