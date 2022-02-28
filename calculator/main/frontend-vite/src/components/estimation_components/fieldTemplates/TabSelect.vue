<template>
    <RadioGroup v-model="radio">
        <RadioGroupLabel>
            <slot></slot>
        </RadioGroupLabel>
        <div class="optionlist flex flex-row items-stretch divide-x rounded-md ring-1">
            <RadioGroupOption
                v-for="title, option in fields[field].options"
                v-slot="{ checked, active }"
                :value="option"
                as="template"
            >
                <button
                    class="first:rounded-l-md last:rounded-r-md p-1 flex flex-grow hover:bg-blue-100"
                    :class="[checked ? 'bg-blue-200' : '']"
                >
                    <span class="mx-auto">{{ title }}</span>
                </button>
            </RadioGroupOption>
        </div>
    </RadioGroup>
</template>

<script>
import {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
} from '@headlessui/vue/dist/index'
export default {
    name: 'TabSelect',
    components: {
        RadioGroup,
        RadioGroupLabel,
        RadioGroupOption,
    },
    emits: ['update'],
    props: {
        content: String,
        field: String,
    },
    data() {
        return {
        }
    },
    computed: {
        radio: {
            get() {
                return this.content
            },
            set(val) {
                this.$emit('update', val)
            }
        },
        currentTab() {
            return this.$route.query.tab
        },
        id() {
            return this.$route.query.editcardid
        },
        fields() {
            return this.$store.state.fields
        },
    }
}
</script>
