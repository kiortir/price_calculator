function arrayMax(arr) {
    var len = arr.length, max = 0;
    while (len--) {
        if (Number(arr[len]) > max) {
            max = arr[len];
        }
    }
    return max
};

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
                name: null,
                price: null,
                count: null,
            }
        },
        removeCard(state, id) {
            delete state.values[id]
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
        changeField(state, { id, field, value }) {
            state.values[id][field] = value
        }
    },
    actions: {
        addCard({ state, commit }) {
            commit('add')
            return arrayMax(Object.keys(state.values))
        },
    },
}