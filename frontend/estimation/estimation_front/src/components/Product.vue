<script setup lang="ts">
import { ref } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import { useProductStore } from '../store/products'
import ProductEditVue from './ProductEdit.vue';
const store = useProductStore()


const edited_card_id = ref("")

</script>

<template>
    <div class='flex flex-col gap-3'>
        <div v-for="(product, id) in store.products">
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
        <product-edit-vue :key="edited_card_id" :edited_card_id="edited_card_id" @close="edited_card_id = ''" />
    </div>
</template>