<script setup lang="ts">
defineProps<{
    settings: object
}>()

</script>

<template>
    <div class="settings text-xl">Настройки</div>
    <el-form :model="settings" class="pl-3">
        <el-form-item label="Можно делать скидку">
            <el-switch v-model="settings.discountable"></el-switch>
        </el-form-item>
        <el-form-item label="Можно дублировать">
            <el-switch v-model="settings.duplicable"></el-switch>
        </el-form-item>
    </el-form>

</template>