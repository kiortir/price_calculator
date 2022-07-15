<script setup lang="ts">
import { Manufacturer } from '../../../interfaces';

const props = defineProps<{
    manufacturers: Manufacturer[]
}>()
</script>

<template>
    <el-scrollbar>
        <div class="flex flex-col border-r-2 h-screen sticky top-0 overflow-y-auto">
            <div class="p-5" v-for="manufacturer in manufacturers" :key="manufacturer.id">
                {{ manufacturer.name }}
            </div>
        </div>
    </el-scrollbar>
</template>