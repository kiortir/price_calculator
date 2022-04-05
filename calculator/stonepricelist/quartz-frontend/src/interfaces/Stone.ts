export default interface StoneInfo extends Object {
    _code?: string
    _name: string
    _slab_size: string
    _price?: number
    [propName: string]: any
    configurations: [{
        price: number
    }]
}