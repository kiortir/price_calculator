import fields from './fieldsManifesto'
function addGroup(field) {
    return fields[field].content.reduce((obj, x) => {
        switch (fields[x].type) {
            case 'radio':
                obj[x] = Object.keys(fields[x].options)[0]
                break
            case 'tab-select':
                obj[x] = Object.keys(fields[x].options)[0]
                break
            case 'option':
                obj[x] = addGroup(x)
                break
            default:
                obj[x] = null
        }
        return obj
    }, {})
}

export default {
    // tabletop: {
    //     assembly: addGroup('assembly'),
    //     edge: addGroup('edge'),
    //     border: addGroup('border'),
    //     sink: addGroup('sink'),
    //     cookpanel: addGroup('cookpanel'),
    //     cutouts: addGroup('cutouts'),
    //     edge_options: addGroup('edge_options'),
    //     surface_options: addGroup('surface_options'),
    //     extra: addGroup('extra'),
    // },
    tabletop: ['assembly',
        'edge',
        'border',
        'sink',
        'cookpanel',
        'cutouts',
        'edge_options',
        'surface_options',
        'extra',]

}