import { Store as PiniaStore } from "pinia"

export type priceField = 'price' | 'salary' | 'consumables' | 'discount10' | 'discount20' | 'discount30'
export type configSettings = 'thickness' | 'surface' | 'slab_size'

export interface StoneConfiguration extends Object {
    id: number
    thickness: string
    slab_size: string
    surface: string
    rub_price: number
}

export interface Stone {
    id: number
    name: string
    code?: string
    manufacturer: string
    configurations: StoneConfiguration[]
    count: number
    cut_price: number
    settings: {
        [key in configSettings]?: string
    }
}

export interface ProductOption {

    [field_id: string]: string | number | undefined

}

export interface Product {
    template: string
    data: {
        options: {
            [id: string]: ProductOption
        },
        logistic_values: {
            [id: string]: {}
        }
    }

}
export interface FormulaElement {
    name: string
    type: string
    reference?: string
    value?: string | number

}

export interface SelectorObject {
    key: string
    value: {
        [key in priceField]: number
    }
}

export interface ModuleField {
    name: string
    type: string
    placeholder?: string
    options?: SelectorObject[]
    tooltip: string
}

export interface Module {
    code: string
    name: string
    fields: {
        [field_code: string]: ModuleField
    }
    formula: {
        [key in priceField]: FormulaElement[]
    },
    settings: {
        [key: string]: boolean
    }
}

export interface Modules {
    [id: string]: Module
}

export interface Store extends PiniaStore {
    addCard: () => {}
}

type standart_logistics = 'floor' | 'distance' | 'delivery_count' | 'lifted_details' | 'measurement_count' | 'installation_count'

export interface EstimationAPI {
    state: {
        stones: Stone[]
        products: Product[]
        logistics: {
            standart: {
                [key in standart_logistics]: {
                    name: string
                    value: number
                    _order: number
                }
            }
            custom: {
                [key: string]: {
                    hide: boolean
                    field: string
                    value: number
                }
            }
        }
    }
    globals: {
        id: number
        created_at: string
        title: string
        amo_lead_id: string
        iteration_group: number
        iteration_version: number
        is_active: boolean
        pricelist: number
        created_by: {
            first_name: string
            last_name: string
            username: string
            id: number
        }

    }
}