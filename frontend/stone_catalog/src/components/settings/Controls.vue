<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()

const go = (tab: string) => {
    router.push(tab)
}

</script>

<template>
    <aside class="flex flex-col gap-5 px-3">

        <router-link :to="{ name: 'import' }">
            <el-button class="w-full">
                Импорт

            </el-button>
        </router-link>

        <router-link :to="{ name: 'general' }">
            <el-button class="w-full">
                Общие

            </el-button>
        </router-link>
    </aside>
</template>