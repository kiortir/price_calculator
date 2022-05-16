import { defineStore } from 'pinia'
import { Product, FormulaElement, ProductOption, SelectorObject, priceField } from '../interfaces'
import { useModuleStore } from './modules'

function makeid(length: number): string {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

interface OptionPrice {
    name: string
    price: { [key in priceField]: number }
}


interface ProductPrice {
    id: string,
    name: string,
    prices: OptionPrice[]
}

const fieldValue = (field_id: string, values: ProductOption) => {
    const moduleStore = useModuleStore()
    const id = field_id.split('_')[0]
    console.log({ field_id: id })
    const formula = <{ [key in priceField]: [] }>moduleStore.data[id]?.formula
    const settings = moduleStore.data[id].settings
    const fields = moduleStore.data[id].fields
    const results = <{
        [key in priceField]: number
    }>{}
    for (const [type, value] of Object.entries(formula)) {
        if (!value.length) {
            results[<priceField>type] = 0
            continue
        }
        const eval_string = value.map((el: FormulaElement) => {
            switch (el.type) {
                case 'operator': {
                    return el.value
                }
                case 'field': {
                    if (!el.reference) {
                        return 0
                    }
                    const current_value = values[el.reference]
                    if (!current_value) {
                        return 0
                    }
                    const field = fields[el.reference || '']
                    if (field.type === 'selector' || field.type === 'radio') {
                        if (!(field.options)) {
                            return 0
                        }
                        const selected_option: SelectorObject = field.options.filter(option => (option.key === current_value))[0] || {}
                        return selected_option.value[<priceField>type] || 0
                    }
                    else {
                        return values[el.reference]
                    }
                }
                case 'constant': {
                    return el.value
                }
            }
        }).join('')
        try {
            results[<priceField>type] = eval(eval_string)
        }
        catch (e) {
            return 0
        }
        const price = results.price
        if (settings.discountable) {
            results[<priceField>'discount10'] = Math.ceil(price * 0.9)
            results[<priceField>'discount20'] = Math.ceil(price * 0.8)
            results[<priceField>'discount30'] = Math.ceil(price * 0.7)
        }
        else {
            results[<priceField>'discount10'] = price
            results[<priceField>'discount20'] = price
            results[<priceField>'discount30'] = price
        }
    }
    return results
}

export const useProductStore = defineStore('products', {
    state: () => {
        return {
            products: <{ [id: string]: Product }>{},
            discount: ""
        }
    },
    actions: {
        addCard() {
            this.products[makeid(5)] = {
                template: "",
                data: {
                    options: {},
                    logistic_values: {}
                }
            }

        },
        deleteCard(id: string) {
            delete this.products[id]
        },
        clearCard(id: string) {
            this.products[id].data = {
                options: {},
                logistic_values: {}
            }
        }
    },
    getters: {
        product_price: function (state): Function {
            return function (product_id: string): ProductPrice {
                const moduleStore = useModuleStore()
                const product = state.products[product_id]
                const options = product.data.options
                const option_prices: OptionPrice[] = []
                for (const option_id in options) {
                    const option = options[option_id]
                    const option_price = fieldValue(option_id, option)
                    if (!option_price.price) {
                        continue
                    }
                    const option_name = moduleStore.data[option_id.split('_')[0]].name
                    const option_fields = options[option_id]
                    const new_option_fields = <{
                        [key: string]: { name?: string, value?: string | number, measurement?: string }
                    }>{}
                    for (const option_field_id of Object.keys(option_fields)) {
                        new_option_fields[option_field_id] = {}
                        new_option_fields[option_field_id]!.name = moduleStore.data[option_id.split('_')[0]].fields[option_field_id].name
                        new_option_fields[option_field_id]!.measurement = moduleStore.data[option_id.split('_')[0]].fields[option_field_id].placeholder

                        new_option_fields[option_field_id]!.value = option_fields[option_field_id]
                    }
                    option_prices.push({
                        name: option_name,
                        price: <{ [key in priceField]: number }>option_price,
                        fields: new_option_fields
                    })
                    console.log(option_fields)
                }
                return {
                    id: product_id,
                    name: product.template,
                    prices: option_prices
                }
            }
        },
        prices: function (state): ProductPrice[] {
            const result = []
            const getPrice = this.product_price
            for (const product_id in state.products) {
                const price = getPrice(product_id)
                if (price.prices.length) { result.push(price) }
            }
            return result
        },
        total: function (): { [key in priceField]?: number } {
            const total = { price: 0, discount10: 0, discount20: 0, discount30: 0, salary: 0, consumables: 0, raw: 0 }
            for (const product of this.prices) {
                product.prices.forEach(module => {
                    const module_prices = module.price
                    const module_raw_price = module_prices.price || 0
                    total.price += module_raw_price
                    total.raw = total.price
                    total.salary += module_prices.salary || 0
                    total.consumables += module_prices.consumables || 0
                    total.discount10 += module_prices.discount10 || module_raw_price
                    total.discount20 += module_prices.discount20 || module_raw_price
                    total.discount30 += module_prices.discount30 || module_raw_price

                })
            }
            return total
        },
        installationTotal: function (): number {
            return Object.keys(this.products).length
                ? Object.values(this.products)
                    .map(product => (Number(product.data.logistic_values.mount_size) || 0))
                    .reduce((x, y) => x + y) || 0
                : 0
        }
    }
})
