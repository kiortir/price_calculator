<script>
import String from './String.vue'
import Number from './Number.vue'
import VSelect from './VSelect.vue'
import Radio from './Radio.vue'
import TabSelect from './TabSelect.vue'
export default {
    name: 'Option',
    props: {
        content: Object,
        field: String,
        parent: Array,
    },
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
        }
        // filled: {
        //     get() {
        //         return Object.values(this.content).reduce((v, y) => {
        //             return (v == false || y == null) ? false : true
        //         })
        //     },
        // }
    },
    methods: {
        changeOptionField(field, value) {
            let group
            if (this.parent !== undefined) {
                if (Array.isArray(this.parent) && this.parent.length > 0) {
                    group = this.parent.slice().concat([this.field])
                }
            }
            else {
                group = this.field
            }
            this.$store.commit(`${this.currentTab}/changeOptionField`, { id: this.id, field, group, value })
        }
    },
    components: {
        String,
        Number,
        VSelect,
        Radio,
        TabSelect
    }
}
</script>

<template>
    <div class>
        <div class="text-2xl my-1">
            <label :for="`${this.$route.query.tab}-${this.$route.query.editid}-${field}`">
                <slot></slot>
            </label>
        </div>
        <div
            class="flex flex-col gap-2"
            :id="`${this.$route.query.tab}-${this.$route.query.editid}-${field}`"
        >
            <component
                class
                v-for="(value, key) in content"
                :key="key"
                :is="fields[key].type"
                :content="value"
                :field="key"
                :parent="Array.isArray(parent) ? parent.slice().concat(field) : [field]"
                @update="changeOptionField(key, $event)"
            >
                <span class="text-base align-middle">{{ fields[key].title }}</span>
            </component>
        </div>
    </div>
</template>