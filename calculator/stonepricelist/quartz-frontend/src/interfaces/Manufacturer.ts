import StoneInfo from './Stone'
import ColMap from './ColMap'
export default interface Manufacturer {
    id: number,
    name: string,
    card_color?: string,
    stones: StoneInfo[],
    surface_configurations: string[]
    slab_configurations: string[]
    thickness_configurations: string[]
    schema: ColMap[],
    applied_currency: {
        source: string,
        value: number
    },
    multipliers: number,
    additional_info: {
        images: Array<{
            thumbnail: string
            image: string
            text: string
        }>
        text: string
        cut_price: number
    }
}