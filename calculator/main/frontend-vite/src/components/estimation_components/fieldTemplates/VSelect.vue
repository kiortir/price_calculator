<template>
    <Listbox v-model="option" as="div" class="mt-1 relative" v-slot="{ open }">
        <ListboxLabel>
            <slot></slot>
        </ListboxLabel>
        <ListboxButton
            as="div"
            class="p-1 ring-1 ring-slate-300 rounded-md w-full z-10 flex flex-row content-center select-none gap-1"
        >
            <div class="pl-1 my-auto" tabindex="0">
                <svg
                    class="h-5 w-5 text-unirock transition"
                    :class="[open ? 'rotate' : '']"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </div>
            <div class="h-fit">{{ options[option] }}</div>
        </ListboxButton>

        <!-- Use Vue's built-in <transition> component to add transitions. -->
        <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-out"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
        >
            <ListboxOptions
                v-show="open"
                static
                as="div"
                class="z-20 absolute mt-1 w-full flex flex-col flex-grow divide-y rounded-md ring-1 ring-blue-500 max-h-[50vh] overflow-y-auto"
            >
                <ListboxOption
                    as="template"
                    v-for="(option, value) in options"
                    :key="value"
                    :value="value"
                    v-slot="{ active, selected, disabled }"
                    :disabled="value == 'null'"
                >
                    <div
                        class="flex p-2 bg-white"
                        :class="[disabled ? 'text-gray-500' : '', active ? 'bg-blue-100' : '', selected ? 'bg-cyan-100' : '']"
                    >{{ option }}</div>
                </ListboxOption>
            </ListboxOptions>
        </transition>
    </Listbox>
</template>

<script>

import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    ListboxLabel
} from '@headlessui/vue/dist/index'

export default {
    name: 'VSelect',
    components: { Listbox, ListboxButton, ListboxOptions, ListboxOption, ListboxLabel },
    props: ['content', 'field'],
    emits: ['update',],
    data() {
        return {
            isMounted: false,
        }
    },
    mounted() { this.isMounted = true },
    computed: {
        fields() {
            return this.$store.state.fields
        },
        options() {
            return this.fields[this.field].options
        },

        option: {
            get() {
                return this.content
            },
            set(value) {
                this.$emit('update', value)
                // this.$store.commit(`${this.$route.query.tab}/changeField`, { id: this.$route.query.editid, field: this.field, value })
            }
        }
    }


}
</script>

<style scoped>
.rotate {
    transform: rotate(90deg);
}
.list-button {
    transition: transform 0.1s linear;
}
</style>