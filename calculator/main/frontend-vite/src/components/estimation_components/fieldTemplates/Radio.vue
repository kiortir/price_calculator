<script>
export default {
    name: 'Radio',
    props: {
        content: String,
        field: String,
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
        radio: {
            get() {
                return this.content
            },
            set(v) {
                this.changeField(v)
            }
        },
        fields() {
            return this.$store.state.fields
        },
    },
    methods: {
        changeField(value) {
            this.$emit('update', value)
        }
    }
}
</script>

<template>
    <div class>
        <div class="text-xl">
            <label :for="`${currentTab}-${id}-${field}`">
                <slot></slot>
            </label>
        </div>
        <div :id="`${currentTab}-${id}-${field}`" class>
            <div v-for="title, option in fields[field].options" class="px-2">
                <input
                    :id="`${currentTab}-${this.$route.query.editid}-${field}-${option}`"
                    type="radio"
                    :value="option"
                    v-model="radio"
                />
                <label
                    class="ml-2 text-sm"
                    :for="`${currentTab}-${this.$route.query.editid}-${field}-${option}`"
                >{{ title }}</label>
            </div>
        </div>
    </div>
</template>