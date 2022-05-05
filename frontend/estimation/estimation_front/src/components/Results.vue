<script setup lang="ts">
import Price from './price.vue'
import SalaryVue from './Salary.vue';
import { useGrid } from 'vue-screen';
const grid = useGrid('tailwind')
</script>

<template>

    <el-tabs type="border-card" class="w-full" stretch>
        <el-tab-pane label="Итог">
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

    </el-tabs>


</template>