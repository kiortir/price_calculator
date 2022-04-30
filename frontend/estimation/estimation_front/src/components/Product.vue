<script setup lang="ts">
import { ref } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import { useProductStore } from '../store/products'
import ProductEditVue from './ProductEdit.vue';
const store = useProductStore()


const edited_card_id = ref("")

</script>

<template>
    <div>
        <TransitionGroup name="list" tag="div" class='flex flex-col gap-3 px-1'>
            <div v-for="(product, id) in store.products" :key="id">
                <el-card class="box-card">
                    <template #header>
                        <div class="card-header flex flex-row items-center justify-between">
                            <span>{{ product.template || 'Новое изделие' }}</span>
                            <div>
                                <el-button :icon="Edit" circle @click="edited_card_id = id"></el-button>
                                <el-button :icon="Delete" @click="store.deleteCard(String(id))" circle></el-button>
                            </div>
                        </div>
                    </template>
                    <div v-if="Object.keys(product.data).length">
                        {{ product.data }}
                    </div>
                    <div v-else>
                        <el-empty description="Пока ничего нет(">
                            <el-button type="primary" @click="edited_card_id = id">Исправить!</el-button>
                        </el-empty>
                    </div>
                </el-card>
            </div>
        </TransitionGroup>
        <product-edit-vue :key="edited_card_id" :edited_card_id="edited_card_id" @close="edited_card_id = ''" />
    </div>
</template>

<style scoped>
.list-move,
/* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
    transition: all 0.4s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(50px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
    position: absolute;
}
</style>