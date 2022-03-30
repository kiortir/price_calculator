import StoneInfo from './Stone'
import ColMap from './ColMap'
export default interface Manufacturer {
    id: number,
    name: string,
    card_color?: string,
    stones: StoneInfo[],
    surface_configurations: Array<string>,
    slab_configurations: Array<string>,
    thickness_configurations: Array<string>,
    schema: Array<ColMap>,
    applied_currency: {
        source: string,
        value: number
    },
    multipliers: number
}