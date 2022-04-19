export interface StoneConfiguration extends Object {
    id: number
    thickness: string
    slab_size: string
    surface: string
    rub_price: number
}

export interface Stone extends Object {
    id: number
    name: string
    code?: string
    manufacturer: string
    configurations: StoneConfiguration[]
}