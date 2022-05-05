import { defineStore } from 'pinia'
import { useConstantStore } from './constants';
import { useProductStore } from './products';
import { Product, FormulaElement, ProductOption, SelectorObject, priceField } from '../interfaces'


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

export const useLogisticStore = defineStore('logistics', {
    state: () => {
        return {
            standart: {
                distance: {
                    name: 'Расстояние',
                    value: 0
                },
                delivery_count: {
                    name: 'Число доставок',
                    value: 0
                },
                installation_count: {
                    name: 'Число установок',
                    value: 0
                },
                measurement_count: {
                    name: 'Число замеров',
                    value: 2
                },

                floor: {
                    name: 'Этаж',
                    value: 0,
                },
                lifted_details: {
                    name: 'Число деталей для подъема',
                    value: 0
                }
            },
            custom: <{ [id: string]: { field: string, value: number, hide: boolean } }>{}
        }
    },
    actions: {
        addCard() {
            this.custom[makeid(5)] = {
                field: "",
                value: 0,
                hide: false
            }
        }
    },
    getters: {
        constants() {
            return useConstantStore()
        },
        products() {
            return useProductStore()
        },
        lifting: function (): { [key in priceField]?: number } {
            return {
                price: this.standart.floor.value
                    * this.standart.lifted_details.value
                    * this.constants.logistics.manual_lift.price,
                salary: this.standart.floor.value
                    * this.standart.lifted_details.value
                    * this.constants.logistics.manual_lift.salary,
                consumables: this.standart.floor.value
                    * this.standart.lifted_details.value
                    * this.constants.logistics.manual_lift.consumables,
                name: `${this.standart.floor.value}-й этаж, ${this.standart.lifted_details.value} детал.`

            }
        },
        delivery: function (): { [key in priceField]?: number } {
            return {
                price: this.standart.delivery_count.value
                    * (this.constants.logistics.delivery.price
                        + this.constants.logistics.delivery.distance_modifier
                        * this.standart.distance.value),
                salary: 0,
                consumables: this.standart.delivery_count.value
                    * (this.constants.logistics.delivery.consumables
                        + this.constants.logistics.delivery.distance_modifier
                        * this.standart.distance.value),
                name: `${this.standart.delivery_count.value} шт., ${this.standart.distance.value ? this.standart.distance.value + ' км от МКАД' : ''}`

            }
        },
        installation: function (): { [key in priceField]?: number } {
            return {
                price: this.standart.installation_count.value
                    * ((this.products.installationTotal > 2
                        ? this.constants.logistics.installation?.price_var * this.products.installationTotal
                        : 0)
                        + this.constants.logistics.installation?.price_const
                        + this.constants.logistics.installation?.salary_distance_modifier
                        * this.standart.distance.value),
                salary: this.standart.installation_count.value
                    * ((this.products.installationTotal > 2
                        ? this.constants.logistics.installation?.salary_var * this.products.installationTotal
                        : 0)
                        + this.constants.logistics.installation?.salary_const
                        + this.constants.logistics.installation?.salary_distance_modifier
                        * this.standart.distance.value),
                consumables: this.standart.installation_count.value * this.constants.logistics.installation.consumables,
                name: `${this.products.installationTotal} шт.`
            }
        },
        measures: function (): { [key in priceField]?: number } {
            return {
                price: this.standart.measurement_count.value
                    * (this.constants.logistics.measurement?.price
                        + this.constants.logistics.measurement?.distance_modifier
                        * this.standart.distance.value),
                salary: 0,
                consumables: this.standart.measurement_count.value
                    * (this.constants.logistics.measurement?.price
                        + this.constants.logistics.measurement?.salary_distance_modifier
                        * this.standart.distance.value)
            }
        },
        hiddenSum: function (state): number {
            let result = 0
            for (const field of Object.values(state.custom)) {
                if (field.hide) {
                    result += field.value
                }
            }
            result += this.measures.price || 0
            return result
        },
        customSum: function (): number {
            let result = 0
            for (const field of Object.values(this.custom)) {
                if (!field.hide) {
                    result += field.value
                }
            }
            result += this.measures.price || 0
            return result
        },
        total: function (state): { [key in priceField]?: number } {
            const result = {
                price: 0,
                salary: 0,
                consumables: 0,
                discount10: 0,
                discount20: 0,
                discount30: 0,
            }
            result.price += this.installation.price! + this.delivery.price! + this.lifting.price!
            result.salary += this.installation.salary! + this.delivery.salary! + this.lifting.salary!
            result.consumables += this.installation.consumables! + this.delivery.consumables! + this.lifting.consumables!
            result.discount10 = result.discount20 = result.discount30 = result.price
            return result
        }

    }
})
