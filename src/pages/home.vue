<script setup lang="ts">
import { get } from '../../api/api'
import { ref,onMounted } from 'vue'
// import {getImg} from '../utile/index'
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