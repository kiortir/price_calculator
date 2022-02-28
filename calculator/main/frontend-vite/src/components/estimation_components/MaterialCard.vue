<script>
export default {
    name: "MaterialCard",
    props: {
        _id: Number
    },
    emits: ['close', 'deleteCard','edit'],
    data() {
        return {
            edit: false
        };
    },
    computed: {
        material() {
            return this.$store.state.materials.values[this._id];
        },
    },
    methods: {
        
        deleteCard() {
            this.$emit('deleteCard')
        }
    },
    components: {  }
}
</script>

<template>
    <div
        class="w-full max-w-full h-fit max-h-full ring-1 ring-cyan rounded-lg text-unirock hover:bg-pink-300 hover:text-white"
        :class="[edit ? '' : '']"
        :ref="`material_card_${_id}`"
    >
        <div :ref="`material_card_${_id}_child`" class="preview">
            <div class="title rounded-t-lg flex flex-row divide-x-2 divide-gray-500 h-full">
                <div
                    class="select-all w-full text-2xl text-ellipsis overflow-hidden rounded-t-lg text-gray-700 my-auto p-2"
                >{{ material.name || 'Кварцевый агломерат' }}</div>
                <div
                    class="self-stretch flex w-fit hover:bg-red-500 active:bg-red-200/[0.5] active:text-blue-600 place-self-end"
                >
                    <button @click="deleteCard()" class="p-2">
                        <svg
                            class="h-7 w-7"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="8" y1="12" x2="16" y2="12" />
                        </svg>
                    </button>
                </div>
                <div
                    class="self-stretch flex w-fit hover:bg-pink-400 active:bg-pink-200/[0.5] active:text-blue-600 rounded-tr-lg place-self-end"
                    @click="$emit('edit')"
                >
                    <button class="w-full h-full p-2">
                        <svg
                            class="h-7 w-7 flex self-center"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                            <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                            <line x1="16" y1="5" x2="19" y2="8" />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="content select-none bg-white h-full text-black rounded-b-lg p-3 py-5">
                <ul>
                    <li>
                        <span>Цена листа:</span>
                        {{ material.price || '-' }} руб.
                    </li>
                    <li>
                        <span>Число листов:</span>
                        {{ material.count || '-' }} шт.
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>


<style scoped>
/* .card {
    transition: transform 1s linear;
} */

/* .edit-open-enter-active {
  transition: all 0.3s ease-out;
}

.edit-open-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.edit-open-enter-from,
.edit-open-leave-to {
  transform: translateX(20px);
  opacity: 0;
} */
</style>