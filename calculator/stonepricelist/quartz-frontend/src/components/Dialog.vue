<template>
    <TransitionRoot
        appear
        :show="props.open"
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
    >
        <Dialog :open="props.open" @close="setIsOpen">
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
                                class="text-2xl font-medium leading-6 mb-4 text-gray-900 flex flex-row gap-3 place-items-center"
                            >
                                <div class="flex flex-grow">
                                    <slot name="title" />
                                </div>
                                <div class="flex align-middle" @click="setIsOpen(false)">
                                    <button class="h-full rounded-full focus:outline-none">
                                        <svg
                                            class="h-6 w-6 text-gray-300"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <line x1="18" y1="6" x2="6" y2="18" />
                                            <line x1="6" y1="6" x2="18" y2="18" />
                                        </svg>
                                    </button>
                                </div>
                            </DialogTitle>
                            <div class="dialog-body border-t border-slate-700">
                                <slot name="body" />
                            </div>
                        </div>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle,
    DialogDescription,
} from "@headlessui/vue";

const props = defineProps<{
    open: boolean
}>()
const emit = defineEmits<{
    (e: 'setIsOpen', value: boolean): void
}>()

function setIsOpen(value: boolean) {
    emit('setIsOpen', value)
}


</script>