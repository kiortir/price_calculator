<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';

import axios from 'axios'

import SideBar from './Sidebar.vue'
import Prices from './Prices.vue'

import { Manufacturer } from '../../../interfaces';

const route = useRoute()
const router = useRouter()
const material = ref(route.params.material)

const manufacturers = ref<Manufacturer[]>([])

axios
    .get('api/manufacturers/?material=' + material.value)
    .then(response => {
        const manufacturers_response = response.data
        if (!manufacturers_response.length) {
            router.replace({ path: '/' })
        }
        else {
            manufacturers.value = manufacturers_response
            let manufacturer
            if (route.query.manufacturer) {
                manufacturer = route.query.manufacturer
            }
            else {
                manufacturer = manufacturers_response[0].name
                router.push({ query: { manufacturer } })
            }
            console.log(route.query.manufacturer)
            getStones(manufacturer)

        }
    })

const getStones = (manufacturer: string) => {
    axios
        .get('stones/?manufacturer=' + manufacturer)
        .then(response => {
            console.log({ data: response.data })
        })
}



</script>

<template>
    <div class="mt-10">
        <el-container>
            <el-aside width="250px">
                <SideBar :manufacturers="manufacturers" />
            </el-aside>
            <el-main>
                <Prices></Prices>
            </el-main>
        </el-container>
    </div>
</template>