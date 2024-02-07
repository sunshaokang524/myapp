<script setup lang="ts">
import { get } from '../../api/api'
import { ref,onMounted } from 'vue'
import {getImg} from '../utile/index'
const imgList: any = ref([])
onMounted(()=>{
    get('/swipe').then((res: any) => {
    imgList.value = res.data.imgList
    console.log(imgList.value, '<===res')
})
})

</script>
<template>
    <div>
        <keep-alive>
        <div class="swipe" v-if="imgList.length > 0">
            <var-swipe class="swipe-example" :autoplay="2000">
                <var-swipe-item v-for="img in imgList" :key="img.text">
                    <img class="swipe-example-image" :src="getImg(img.url)">
                </var-swipe-item>
            </var-swipe>
        </div>
        </keep-alive>
    </div>
</template>
<style lang="scss">
.swipe {
    padding: 10px;
    padding-bottom: none;
}
.swipe-example{
   
    z-index: 1;
}
.swipe-example-image {
     border-radius: 5px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
}
</style>