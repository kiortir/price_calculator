<script setup lang="ts">
import { Field } from '../interfaces';
defineProps<{
    field: Field
}>()

</script>


<template>
    <div>
        <el-input v-model="field.placeholder" placeholder="ед.измерения"></el-input>
    </div>
</template>