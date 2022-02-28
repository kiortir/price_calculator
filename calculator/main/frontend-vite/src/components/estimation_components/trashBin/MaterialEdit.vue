<script>
export default {
    name: 'MaterialEdit',
    data() {
        return {
        }
    },
    props: {
        _id: Number
    },
    emits: [
        'close'
    ],
    computed: {
        material() {
            return this.$store.state.materials.values[this._id];
        },
    },
}
</script>

<template>
    <div class>
        <!-- <div class="screen-block bg-gray-200/[0.5] z-50 fixed"></div> -->
        <div
            class="edit bg-white ring-2 ring-unirock rounded-lg p-5 w-full container relative mx-auto z-50"
        >
            <form>
                <label class="block">
                    <span
                        class="block text-sm text-left font-medium text-slate-700 mb-5"
                        @click="$emit('close')"
                    >Название</span>
                    <input
                        type="text"
                        :value="material.name"
                        @change="$store.commit('materials/updateCard', { id: _id, field: 'name', value: $event.target.value })"
                        class="text-black mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                    />
                </label>
            </form>
        </div>
    </div>
</template>

<style scoped>
/* .screen-block {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
} */
</style>