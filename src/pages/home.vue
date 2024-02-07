<script setup lang="ts">
import {get } from '../../api/api'
import {ref} from 'vue'
interface ImgType {
    url?:string,
    text:string
}
const imgList:any = ref([])
get('/swipe').then((res:any)=>{
    imgList.value=res.data.imgList
    console.log(imgList.value,'<===res')
})
</script>
<template>
    <div>
        <div class="swipe" v-if="imgList.length>0">

            <var-swipe class="swipe-example">
                <var-swipe-item v-for="img in imgList" :key="img.text">
                    <img class="swipe-example-image" :src="img.url">
                  </var-swipe-item>
            </var-swipe>
        </div>
       
    </div>
</template>