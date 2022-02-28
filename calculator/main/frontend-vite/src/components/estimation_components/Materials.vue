<script>
import { wrapGrid } from 'animate-css-grid'
import MaterialCard from "./MaterialCard.vue"
export default {
    name: 'Materials',
    emits: ['close', 'edit', 'delete'],
    data() {
        return {
            deleting: false
        }
    },
    computed: {
        materials() {
            return this.$store.state.materials.values
        },
    },
    methods: {
        
    },
    mounted() {
        wrapGrid(this.$refs.material_grid, { sttager: 10, duration: 300, easing: 'easeInOut', });
    },
    components: {
        MaterialCard
    }
}
</script>

<template>
    <div class>
        <div
            ref="material_grid"
            class="grid sm:grid-cols-1 md:grid-cols-2 px-[0.3em] gap-4 gap-y-4 md:gap-y-4 relative"
        >
            <material-card
                v-for="index in Object.keys(materials)"
                :id="`materials-card-${index}`"
                :_id="Number(index)"
                :key="index"
                :class="[index == this.$route.query.editid ? 'bg-red-200' : 'bg-orange-200']"
                @close="$emit('close')"
                @edit="$emit('edit', index)"
                @deleteCard="$emit('delete', index)"
                class="card"
            ></material-card>
        </div>
        <!-- <div class="addCard mt-5 h-12 bottom-0 w-full sticky "><button class="h-full w-full bg-unirock" @click="$store.commit('materials/addCard')">+</button></div> -->
    </div>
</template>

<style scoped>
.card {
    -webkit-transition: background-color 200ms linear;
    -ms-transition: background-color 200ms linear;
    transition: background-color 200ms linear;
}
</style>