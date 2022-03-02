function arrayMax(arr) {
    var len = arr.length, max = 0;
    while (len--) {
        if (Number(arr[len]) > max) {
            max = arr[len];
        }
    }
    return max
};
function find_max(arr, field) {
    let max = 1

    for (let i = 0; i < arr.length; i++) {
        let [f, count] = arr[i].split('__')
        if (f === field && Number(count) > max) {
            max = count
        }
    }
    return ++max
}

function addGroup(refs, field) {
    return refs[field].content.reduce((obj, x) => {
        switch (refs[x].type) {
            case 'radio':
                obj[x] = Object.keys(refs[x].options)[0]
                break
            case 'tab-select':
                obj[x] = Object.keys(refs[x].options)[0]
                break
            case 'option':
                obj[x] = addGroup(refs, x)
                break
            default:
                obj[x] = null
        }
        return obj
    }, {})
}

import reference from './productFields.js'
function checkObjFill(obj) {
    let container = Object.values(obj).map(e => {
        if (typeof e === 'object' && e !== null) {
            return checkObjFill(e)
        }
        else { return e }
    })
    return ![null, '', false].some(r => container.includes(r))
}

export default {
    namespaced: true,
    state: () => {
        return {
            values: {}
        }
    },
    mutations: {
        add(state) {
            let id = arrayMax(Object.keys(state.values))
            state.values[++id] = {
                p_type: null,
            }
        },
        removeCard(state, id) {
            delete state.values[id]
        },
        extendCard(state, { id, new_field, field_id }) {
            state.values[id][field_id] = new_field
        },
        resetState(state) {
            state.values = {
                // 1: {
                //     name: null,
                //     price: null,
                //     count: null,
                // }
            }
        },
        setFields(state, { id, new_fields }) {
            state.values[id] = new_fields
        },
        changeField(state, { id, field, value }) {
            if (field == 'p_type') {
                this.dispatch('products/loadFields', { id, type: field, value })
            }
            state.values[id][field] = value
        },
        changeOptionField(state, { id, field, value, group }) {
            let next = state.values[id]
            if (group instanceof Array) {
                group.forEach(step => {
                    next = next[step]
                })
            }
            else {
                next = next[group]
            }
            next[field] = value
        },
        updateCard(state, { id, field, value }) {
            state.values[id][field] = value
        },
        deleteOption(state, { id, field }) {
            delete state.values[id][field]
        }
    },
    actions: {
        addCard({ state, commit }) {
            commit('add')

            return arrayMax(Object.keys(state.values))
        },
        loadFields({ rootState, commit }, { id, type, value }) {
            const ref = rootState.fields
            let new_fields = Object.assign({ p_type: type }, ...reference[value].map(v => { return { [v]: addGroup(ref, v) } }))
            commit('setFields', { id, new_fields })
        },
        cloneField({ state, rootState, commit }, { id, field }) {
            const ref = rootState.fields
            let [f, count] = field.split("__")
            let new_field = addGroup(ref, f)
            commit('extendCard', { id, new_field, field_id: `${f}__${find_max(Object.keys(state.values[id]), f) || 2}` })
        },
        removeOption({ commit }, { id, field }) {
            commit('deleteOption', { id, field })
        }
    },
}