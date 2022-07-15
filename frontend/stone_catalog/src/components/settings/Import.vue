<script lang="ts" setup>
import axios from 'axios'
import { useRouter } from 'vue-router';
import { UploadFilled } from '@element-plus/icons-vue'

import { TokenHolder } from '../../../interfaces';

const router = useRouter()

const csrftoken_holder = <TokenHolder>document.querySelector('[name=csrfmiddlewaretoken]')

const xcrf = { 'X-CSRFToken': csrftoken_holder.value, 'Content-Type': 'multipart/form-data' }
const HEADERS = new Headers(xcrf)


const start_import = (file: { file: File }) => {
    var formData = new FormData();
    formData.append("file", file.file);
    axios.post("/price_list/import/",
        formData,
        {
            headers: xcrf
        }
    ).then((response) => {
        console.log({ response: response.data })
        router.push({ name: 'import_session', params: { table: JSON.stringify(response.data) } })
    })
}


</script>

<template>

    <el-upload class="upload-demo w-full" drag action="/price_list/import/" :headers="HEADERS"
        :on-success="start_import" :http-request="start_import">
        <el-icon class="el-icon--upload">
            <upload-filled />
        </el-icon>
        <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
        </div>
        <template #tip>
            <div class="el-upload__tip">
                csv/xls/xlsx/odf
            </div>
        </template>
    </el-upload>

</template>