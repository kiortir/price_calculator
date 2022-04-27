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
    const formula = <{ [key in priceField]: [] }>moduleStore.data[id].formula
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
                    if (field.type === 'selector') {
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
    }
    return results
}

export const useProductStore = defineStore('products', {
    state: () => {
        return {
            products: <{ [id: string]: Product }>{},
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
                    const option_name = moduleStore.data[option_id.split('_')[0]].name
                    option_prices.push({
                        name: option_name,
                        price: <{ [key in priceField]: number }>option_price
                    })
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
            const price_getter = this.product_price
            for (const product_id in state.products) {
                result.push(price_getter(product_id))
            }
            return result
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
