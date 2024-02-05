<script setup>
import { post,get } from '../../api/api'
get('/test',{token:''}).then(res=>{
    console.log(res,'<===res')
})
</script>
<template>
    <div>
   
       
    </div>
</template>