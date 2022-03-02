<script>

export default {
    name: 'String',
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
            return this.$route.query.editid
        }
    },
    methods: {
        capitalize(str) {
            return str
                .split(' ')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        },

        changeField(value) {
            let capitalized = this.capitalize(value)
            this.$emit('update', capitalized)
            // this.$store.commit(`${this.currentTab}/changeField`, { id: this.id, field: this.field, value:capitalized })
        }
    }
}
</script>

<template>
    <div class>
        <div class="text-xl mb-3">
            <label :for="`${currentTab}-${id}-${field}`">
                <slot></slot>
            </label>
        </div>
        <input
            :id="`${currentTab}-${this.$route.query.editid}-${field}`"
            :value="content"
            @input="changeField($event.target.value)"
            class="ring-orange-400 ring-1 rounded-lg p-1 px-2 w-full"
            :class="[value === '' || value === undefined || value === null ? 'show-unfilled' : '']"
        />
    </div>
</template>