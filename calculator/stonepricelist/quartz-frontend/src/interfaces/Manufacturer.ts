import Stone from './Stone'
import ColMap from './ColMap'
export default interface Manufacturer {
    id: number
    name: string
    card_color?: string
    stones: Array<Stone>
    surface_configurations?: Array<string>
    slab_configurations?: Array<string>
    thickness_configurations?: Array<string>
    schema: Array<ColMap>
}