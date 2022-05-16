export interface FormulaElement {
    type: string
    name?: string
    reference?: string
    value?: string | number
}

export interface Value {
    price: number | null
    salary: number | null
    consumables: number | null
}

export interface Option {
    key: string
    value: Value
}

export interface Field {
    type: string
    name: string
    code: string
    options?: Option[]
    value?: number
}

export interface Module {
    name: string
    code: string
    fields: {
        [id: string]: Field
    }
    formula: {
        price: FormulaElement[]
        salary: FormulaElement[]
        consumables: FormulaElement[]
    }
    settings: {
        [key: string]: string
    }
}