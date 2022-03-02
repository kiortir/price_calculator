<script>
export default {
    name: 'Number',
    props: {
        content: Number || String,
        field: String
    },
    emits: ['update'],
    data() {
        return {
        }
    },
    computed: {
        currentTab() {
            return this.$route.query.tab
        },
        id() {
            return this.$route.query.editcardid
        },
        fields() {
            return this.$store.state.fields
        },
        value: {
            get() {
                return this.content
            },
            set(v) {
                this.$refs.numInput.focus()
                if (v >= 0) {
                    this.changeField(v)
                }
                else {
                    this.changeField(0)
                }
            }
        }
    },
    methods: {
        changeField(value) {
            this.$emit('update', value)
            // this.$store.commit(`${this.currentTab}/changeField`, { id: this.id, field: this.field, value })
        },
        // unfocus(e) {
        //     console.log(e)
        //     document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Enter' }));
        // }
    }
}
</script>

<template>
    <div class="flex flex-col">
        <div class="text-xl">
            <label :for="`${currentTab}-${id}-${field}`">
                <slot></slot>
            </label>
        </div>
        <div class="flex flex-row gap-3 flex-wrap">
            <div
                class="flex ring-1 ring-blue-300 rounded-lg divide-x divide-slate-400 min-w-auto flex-auto"
            >
                <input
                    ref="numInput"
                    type="number"
                    :id="`${currentTab}-${id}-${field}`"
                    v-model.number="value"
                    class="rounded-l-lg appearance-none flex grow min-w-content w-0 max-w-full px-1"
                    :class="[value === '' || value === undefined || value === null ? 'show-unfilled' : '']"
                />
                <div
                    class="measurement bg-pink-100 rounded-r-lg text-end h-full text-lg px-2"
                >{{ fields[field].measurement }}</div>
            </div>
            <div
                class="controls flex flex-row h-full ring-1 ring-unirock rounded-lg divide-x divide-unirock/[0.3]"
            >
                <div
                    v-on:mouseup="value--"
                    class="minus flex basis-1/2 py-1 px-2 place-center text-unirock hover:bg-pink-200 active:bg-unirock active:text-white rounded-l-lg"
                >
                    <button tabindex="-1" class="w-full">
                        <svg
                            class="h-6 w-6 mx-auto"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </button>
                </div>
                <div
                    v-on:mouseup="value++"
                    class="plus py-1 px-2 flex basis-1/2 self-center text-unirock hover:bg-pink-200 active:bg-unirock active:text-white rounded-r-lg"
                >
                    <button tabindex="-1" class="w-full">
                        <svg
                            class="h-6 w-6 mx-auto"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
input[type="number"] {
    -moz-appearance: textfield;
}
</style>