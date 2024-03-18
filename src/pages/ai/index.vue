<template>
<div class="Ai-Chat">
    123456
</div>  
</template>

<script setup>
import { post } from '../../../api/api';
import axios from 'axios';
let params ={
        "header": {
            "app_id": "4c13f3ff",
        
        },
        "parameter": {
            "chat": {
                "domain": "generalv3.5",
                "temperature": 0.5,
                "max_tokens": 1024, 
            }
        },
        "payload": {
            "message": {
          
                "text": [
                    {"role":"system","content":"你现在扮演李白，你豪情万丈，狂放不羁；接下来请用李白的口吻和用户对话。"}, 
                    {"role": "assistant", "content": "....."},  

                    {"role": "user", "content": "你会做什么"} ,
                ]
        }
    }
}
axios.post('wss://spark-api.xf-yun.com/v3.5/chat',params).then(res=>{
    console.log(res,'<=====ai')
})
</script>

<style>

</style>