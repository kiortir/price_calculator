<script>
import fields from '../../store/fieldsManifesto.js'
import String from './fieldTemplates/String.vue'
import Number from './fieldTemplates/Number.vue'
import VSelect from './fieldTemplates/VSelect.vue'
import Option from './fieldTemplates/Option.vue'

export default {
    name: 'CardEdit',
    data() {
        return {
            fields
        }
    },
    emits: [
        'close'
    ],
    computed: {
        data() {
            return this.$store.state[this.$route.query.tab || 'materials'].values[this.$route.query.editid]
        },
        isDesktop() {
            return this.$store.getters.isDesktop
        }
    },
    methods: {
        updateField(field, value) {
            this.$store.commit(`${this.$route.query.tab}/changeField`, { id: this.$route.query.editid, field, value })
        },
        close() {
            if (!this.isDesktop) {
                document.getElementsByTagName('body')[0].classList.remove('noscroll')
            }
            this.$emit('close')
        }
    },
    mounted() {
        if (!this.isDesktop) {
            document.getElementsByTagName('body')[0].classList.add('noscroll')
        }
    },
    components: {
        String,
        Number,
        VSelect,
        Option,
    }
}
</script>

<template>
    <Teleport to="body" :disabled="isDesktop">
        <div
            class="py-5 fixed lg:static left-0 md:left-auto right-0 top-0 bg-white h-screen md:h-full z-50 px-3 md:px-0"
        >
            <div class="title flex flex-row mb-3 text-2xl">
                <div>
                    <button
                        @click="close()"
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
            <div class="flex flex-col gap-y-3 min-h-[50vh] divide-y divide-unirock px-1">
                <component
                    v-for="(value, field) in data"
                    :is="fields[field].type"
                    :field="field"
                    :content="value"
                    @update="updateField(field, $event)"
                >{{ fields[field].title }}</component>
            </div>
        </div>
    </Teleport>
</template>