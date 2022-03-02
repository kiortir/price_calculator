<script>
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle,
    DialogDescription,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from "@headlessui/vue/dist/index";
// import fields from '../../store/fieldsManifesto.js'
import String from './fieldTemplates/String.vue'
import Number from './fieldTemplates/Number.vue'
import VSelect from './fieldTemplates/VSelect.vue'
import TabSelect from './fieldTemplates/TabSelect.vue'
import Option from './fieldTemplates/Option.vue'
import VSwitch from './fieldTemplates/VSwitch.vue'

export default {
    emits: ['close'],
    components: {
        Dialog,
        DialogOverlay,
        DialogTitle,
        DialogDescription,
        TransitionRoot,
        TransitionChild,
        String,
        Number,
        VSelect,
        Option,
        VSwitch,
        TabSelect,
        Disclosure,
        DisclosureButton,
        DisclosurePanel,
    },
    data() {
        return {
            // fields,
            isInteractive: true,
            transition_forward: true,
        }
    },
    mounted() {
        document.addEventListener('keydown', (event) => {
            if (event.ctrlKey && event.key === 'ArrowRight') {
                event.preventDefault()
                this.switchTab()
            }
            else if (event.ctrlKey && event.key === 'ArrowLeft') {
                event.preventDefault()
                this.disableInteractivity()
                this.switchTab(-1)
            }
            else if (event.key === ' ' && event.shiftKey) {
                event.preventDefault()
                if (event.ctrlKey) {
                    this.disableInteractivity()
                    this.switchTab(-1)
                }
                else {
                    document.activeElement.blur();
                    if (this.currentIsFilled.filled) {
                        this.switchTab()
                    }
                    else {
                        let edit_el = this.$refs.editBody.$el
                        let inputs = edit_el.getElementsByClassName('show-unfilled')
                        for (let element of inputs) {
                            element.classList.add('bg-pink-100/[0.8]')
                            setTimeout(() => {
                                element.classList.remove('bg-pink-100/[0.8]')
                            }, 2000)

                        }
                    }
                }
            }
        })
    },
    watch: {
        currentIsFilled(after, before) {
            if (this.isInteractive && after.filled && ((after.tab === before.tab) || (after.tab == 'p_type')) && !before.filled && document.activeElement.tagName !== 'INPUT') {
                this.switchTab()
            }
        }
    },
    computed: {
        fields() {
            return this.$store.state.fields
        },
        tabs() {
            let tab_names = Object.keys(this.data)
            return tab_names.sort((a, b) => { return this.order(a) - this.order(b) })
        },
        currentIsFilled() {
            let filled
            try {
                filled = this.fill_status[this.editTab]
            } catch (error) {
                filled = false
            }
            return {
                tab: this.editTab,
                filled
            }
        },

        elementId() {
            return this.$route.query.editcardid
        },
        data() {
            return this.$store.state[this.$route.query.tab || 'materials'].values[this.$route.query.editcardid] || {}
        },
        editTab() {
            return this.$route.query.editfield || 'p_type'
        },
        component_data() {
            let tab = this.editTab.split('__')[0]
            return {

                component: this.fields[tab].type,
                field: this.editTab,
                content: this.data[this.editTab],
                title: this.fields[tab].title,
                allow_multiple: this.fields[tab].allow_multiple
            }
        },
        fill_status() {
            return Object.assign({}, ...Object.entries(this.data).map((items, _) => {
                let [key, value] = items
                return {
                    [key]: this.isFilled(key)
                }
            }))

        }
    },
    methods: {
        isFilled(key) {

            let obj = this.data[key] //|| key
            if (obj === undefined) {
                obj = key
            }
            if (typeof obj === 'object' && obj !== null) {

                let container = Object.values(obj).map(e => {

                    if (typeof e === 'object' && e !== null) {

                        return this.isFilled(e)
                    }
                    else { return e }
                })
                return ![null, '', false].some(r => container.includes(r))
            }
            else {
                return ![null, '', false].includes(obj)
            }

        },
        closeEdit() {
            this.enableInteractivity()
            this.$emit('close')
        },
        updateField(field, value) {
            this.$store.commit(`${this.$route.query.tab}/changeField`, { id: this.elementId, field, value })
        },
        interactiveTab(tab) {
            this.transition_forward = this.tabs.indexOf(this.editTab) < this.tabs.indexOf(tab)
            let query = Object.assign({}, this.$route.query, { editfield: tab })
            this.$router.push({ query });
        },
        disableInteractivity() {
            this.isInteractive = false

        },
        enableInteractivity() {
            this.isInteractive = true
        },
        switchTab(v = 1) {
            let keys = this.tabs
            let max = keys.length
            let next_index = keys.indexOf(this.editTab) + v
            if (next_index < 0) {
                next_index = 0
            }
            if (max === next_index) {
                next_index = 0
            }
            this.interactiveTab(keys[next_index])

        },
        cloneOption() {
            this.$store.dispatch('products/cloneField', { id: this.elementId, field: (this.editTab || 100) })
            this.$refs.optiondisclosure.$el.classList.add('ring-2', 'bg-sky-100')
            setTimeout(() => {
                this.$refs.optiondisclosure.$el.classList.remove('ring-2', 'bg-sky-100')
            }, 50)
        },
        removeOption() {
            this.switchTab(-1);
            this.$store.dispatch('products/removeOption', { id: this.elementId, field: this.editTab })

        },
        order(tab) {
            tab = tab.split('__')[0]
            return this.$store.state.fields[tab].priority || 500
        }

    }
};
</script>




<template>
    <TransitionRoot appear :show="elementId > 0" as="template">
        <Dialog as="div" class @close="closeEdit()">
            <div class>
                <div class="min-h-screen px-4 text-center fixed lg:inset-0 z-40">
                    <TransitionChild
                        as="template"
                        enter="duration-200 ease-out"
                        enter-from="opacity-0"
                        enter-to="opacity-100"
                        leave="duration-100 ease-in"
                        leave-from="opacity-100"
                        leave-to="opacity-0"
                    >
                        <DialogOverlay class="fixed inset-0 bg-black opacity-30" />
                    </TransitionChild>

                    <span class="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

                    <TransitionChild
                        as="template"
                        enter="duration-200 ease-out"
                        enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100"
                        leave="duration-100 ease-in"
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95"
                    >
                        <div
                            class="overflow-y-auto overflow-x-hidden inline-block w-full fixed lg:relative top-0 left-0 lg:top-auto lg:left-auto h-screen lg:max-h-[90vh] lg:md:max-w-[45vw] lg:min-h-[70vh] p-6 text-left lg:align-middle transition-all transform bg-white shadow-xl lg:rounded-2xl"
                        >
                            <DialogTitle
                                as="h3"
                                class="text-lg font-medium leading-6 mb-4 text-gray-900 flex flex-row gap-3 place-items-center"
                            >
                                <span class="flex my-auto">Редактировать карточку</span>
                                <div class="flex flex-grow">
                                    <v-switch
                                        class="self-center"
                                        tabindex="-1"
                                        :value="isInteractive"
                                        @change="isInteractive = !isInteractive"
                                    ></v-switch>
                                </div>

                                <button
                                    tabindex="-1"
                                    class="text-unirock hover:bg-pink-100 hover:ring-1 ring-inset ring-unirock/[0.6] active:bg-unirock active:text-white rounded-full p-1"
                                    @click="closeEdit()"
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
                            </DialogTitle>
                            <div>
                                <div class="edit-block flex flex-col gap-5 divide-y">
                                    <Disclosure
                                        as="div"
                                        v-show="data.p_type != null"
                                        class="h-fit flex flex-col flex-shrink flex-wrap order-2"
                                        v-slot="{ open }"
                                    >
                                        <DisclosureButton
                                            class="flex flex-row ring-1 gap-1 rounded-md"
                                            ref="optiondisclosure"
                                        >
                                            <span class="flex-grow text-left px-3 my-auto">Опции</span>
                                            <span>
                                                <svg
                                                    :class="open ? 'transform rotate-[270deg]' : ''"
                                                    class="h-7 w-7 text-unirock"
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
                                                    <polyline points="15 6 9 12 15 18" />
                                                </svg>
                                            </span>
                                        </DisclosureButton>
                                        <transition
                                            enter-active-class="transition duration-100 ease-out"
                                            enter-from-class="transform scale-95 opacity-0"
                                            enter-to-class="transform scale-100 opacity-100"
                                            leave-active-class="transition duration-75 ease-out"
                                            leave-from-class="transform scale-100 opacity-100"
                                            leave-to-class="transform scale-95 opacity-0"
                                        >
                                            <DisclosurePanel class="text-gray-500 mt-2 max-h-48 overflow-y-auto overflow-x-hidden disable-scrollbars p-1 border-t border-slate-200">
                                                <div class>
                                                    <TransitionGroup
                                                        name="list"
                                                        tag="div"
                                                        class="gap-2 tabs-block rounded-xl divide-x flex-row flex flex-wrap"
                                                    >
                                                        <div
                                                            class="basis-content lg:basis-1/6 flex flex-row flex-grow gap-2 select-none shadow-sm text-sm edit-chapter rounded-xl ring-1 ring-inset p-2"
                                                            v-for="key in tabs"
                                                            :key="key"
                                                            :class="[key == editTab ? 'bg-sky-500/[0.3]' : 'hover:bg-sky-100', fill_status[key] ? 'text-cyan-800 text-[0.75em]' : 'text-center']"
                                                            @click="disableInteractivity(); interactiveTab(key)"
                                                        >
                                                            <span
                                                                class="m-auto flex-grow"
                                                            >{{ fields[key.split('__')[0]].title }} {{ key.split('__')[1] ? '#' + key.split('__')[1] : '' }}</span>
                                                            <span
                                                                class="m-auto justify-self-end"
                                                                v-show="fill_status[key]"
                                                            >
                                                                <svg
                                                                    class="h-4 w-4 text-cyan-700"
                                                                    width="24"
                                                                    height="24"
                                                                    viewBox="0 0 24 24"
                                                                    stroke-width="2"
                                                                    stroke="currentColor"
                                                                    fill="none"
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                >
                                                                    <path
                                                                        stroke="none"
                                                                        d="M0 0h24v24H0z"
                                                                    />
                                                                    <circle cx="12" cy="12" r="9" />
                                                                    <path d="M9 12l2 2l4 -4" />
                                                                </svg>
                                                            </span>
                                                        </div>
                                                    </TransitionGroup>
                                                </div>
                                            </DisclosurePanel>
                                        </transition>
                                    </Disclosure>
                                    <div class="order-3 flex-grow">
                                        <Transition
                                            :name="transition_forward ? 'slide-f' : 'slide-b'"
                                            mode="out-in"
                                        >
                                            <component
                                                :is="component_data.component"
                                                :key="editTab"
                                                :field="component_data.field"
                                                :content="component_data.content"
                                                @update="updateField(component_data.field, $event)"
                                                ref="editBody"
                                            >
                                                <div class="flex flex-row items-center mb-2 gap-3">
                                                    <div class="flex-grow">
                                                        <span
                                                            class="text-xl"
                                                        >{{ component_data.title }} {{ editTab.split('__')[1] ? '#' + editTab.split('__')[1] : '' }}</span>
                                                    </div>
                                                    <button
                                                        v-if="editTab.split('__')[1]"
                                                        class="ring-2 rounded-sm ring-black text-right hover:text-unirock hover:ring-unirock active:ring-blue-400 active:text-blue-400"
                                                        @click="removeOption()"
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
                                                            <circle cx="12" cy="12" r="9" />
                                                            <line x1="9" y1="12" x2="15" y2="12" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        v-if="component_data.allow_multiple"
                                                        class="ring-2 rounded-sm ring-black text-right hover:text-unirock hover:ring-unirock active:ring-blue-400 active:text-blue-400"
                                                        @click="cloneOption()"
                                                    >
                                                        <svg
                                                            class="h-6 w-6 my-auto"
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
                                                            <circle cx="12" cy="18" r="2" />
                                                            <circle cx="7" cy="6" r="2" />
                                                            <circle cx="17" cy="6" r="2" />
                                                            <path
                                                                d="M7 8v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2 -2v-2"
                                                            />
                                                            <line x1="12" y1="12" x2="12" y2="16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </component>
                                        </Transition>
                                    </div>
                                </div>

                                <div
                                    class="buttons absolute bottom-0 left-0 flex flex-row place-content-between w-full p-6"
                                >
                                    <div class @mouseup="disableInteractivity(); switchTab(-1);">
                                        <button
                                            tabindex="-1"
                                            class="ring-2 ring-unirock ring-inset text-unirock hover:bg-pink-100 active:bg-unirock active:text-white rounded-full p-1"
                                        >
                                            <svg
                                                class="h-8 w-8"
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
                                                <line x1="5" y1="12" x2="9" y2="16" />
                                                <line x1="5" y1="12" x2="9" y2="8" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div class @mouseup="switchTab(1);">
                                        <button
                                            tabindex="-1"
                                            class="ring-2 ring-unirock ring-inset text-unirock hover:bg-pink-100 active:bg-unirock active:text-white rounded-full p-1"
                                        >
                                            <svg
                                                class="h-8 w-8"
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
                                                <line x1="15" y1="16" x2="19" y2="12" />
                                                <line x1="15" y1="8" x2="19" y2="12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<style scoped>
.slide-f-enter-active,
.slide-f-leave-active {
    transition: transform 0.1s linear;
}

.slide-f-enter-from {
    transform: translateX(100%);
}
.slide-f-leave-to {
    transform: translateX(-100%);
}
.slide-b-enter-active,
.slide-b-leave-active {
    transition: transform 0.1s linear;
}

.slide-b-enter-from {
    transform: translateX(-100%);
}
.slide-b-leave-to {
    transform: translateX(100%);
}

.list-move,
.list-enter-active,
.list-leave-active {
    transition: all .2s ease-out;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
}

.disable-scrollbars::-webkit-scrollbar {
  background: transparent; /* Chrome/Safari/Webkit */
  width: 0px;
}
    
.disable-scrollbars {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* IE 10+ */
}
</style>
