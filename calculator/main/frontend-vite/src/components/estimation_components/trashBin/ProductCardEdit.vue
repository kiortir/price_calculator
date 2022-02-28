<script>
// import fields from '../../store/fieldsManifesto.js'
import String from './fieldTemplates/String.vue'
import Number from './fieldTemplates/Number.vue'

export default {
    name: 'CardEdit',
    data() {
        return {
        }
    },
    emits: [
        'close'
    ],
    computed: {
        data() {
            return this.$store.state[this.$route.query.tab || 'materials'].values[this.$route.query.editid]
        },
        fields() {
            return this.$store.state.fields
        }
    },
    methods: {
    },
    components: {
        String,
        Number,
    }
}
</script>

<template>
    <div class="py-5 relative">
        <div class="title flex flex-row mb-3 text-2xl min-h-[50vh]">
            <div>
                <button
                    @click="$emit('close')"
                    class="rounded-full text-unirock hover:bg-unirock hover:text-white p-1"
                >
                    <svg
                        class="h-6 w-6"
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
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            </div>
        </div>
        <div class="flex flex-col gap-y-5">
            <component
                v-for="(value, field) in data"
                class="flex flex-col"
                :is="fields[field].type"
                :value="value"
                :field="field"
            >{{ fields[field].title }}</component>
        </div>
    </div>
</template>