<script setup lang="ts">
import Price from './Price.vue'
import SalaryVue from './Salary.vue';
import SpendingsVue from './Spendings.vue';
import { useGrid } from 'vue-screen';
const grid = useGrid('tailwind')
</script>

<template>

    <el-tabs type="border-card" class="w-full" stretch>
        <el-tab-pane label="Итог">
            <!-- <price key="price"></price> -->
            <el-scrollbar height="" max-height="90vh" class="w-full" v-if="grid.md">
                <price class="pr-3"></price>
            </el-scrollbar>
            <div v-else>
                <price></price>
            </div>
        </el-tab-pane>
        <el-tab-pane label="Зарплата">
            <el-scrollbar height="" max-height="90vh" class="w-full" v-if="grid.md">
                <salary-vue class="pr-3"></salary-vue>
            </el-scrollbar>
            <div v-else>
                <salary-vue></salary-vue>
            </div>
        </el-tab-pane>
        <el-tab-pane label="Затраты" disabled>
            <el-scrollbar height="" max-height="90vh" class="w-full" v-if="grid.md">
                <spendings-vue class="pr-3"></spendings-vue>
            </el-scrollbar>
            <div v-else>
                <spendings-vue></spendings-vue>
            </div>
        </el-tab-pane>

    </el-tabs>


</template>