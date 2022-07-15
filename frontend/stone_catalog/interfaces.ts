export interface Collection {

}

export interface MaterialAddon {
    name: string
}

export interface Material {
    id: number;
    name: string;
    addons?: MaterialAddon[]
}


export interface Manufacturer {
    name: string;
    id: number;
    collections?: Collection[];
    material?: Material
}


export interface TokenHolder extends Element {
    value: string
}