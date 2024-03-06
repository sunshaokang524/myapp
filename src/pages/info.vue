<script setup lang="ts">
import {get} from '../../api/api'
import { ref } from 'vue';
const infoList:any =ref([]) 
get("/getInfo", { id: localStorage.getItem("Id") }).then((res:any) => {
    infoList.value=  res.data[0].infoList

});
</script>
<template>

    <div  class="info">
        <div class="info-box">
            <div class="glass-container" id="glass" ></div>
            <div class="glass-container" id="glass" ></div>
            <div class="glass-container" id="glass" ></div>
            <div class="glass-container" id="glass" ></div>
            <div class="glass-container" id="glass" ></div>
            <div class="glass-container" id="glass" ></div>
            <div class="glass-container" id="glass" ></div>
            <div class="glass-container" id="glass" ></div>
            <div class="glass-container" id="glass" ></div>
            <div class="glass-container" id="glass" ></div>
            <div class="glass-container" id="glass" ></div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.info {
    display: flex;
    justify-content: center;
}
.info-box {
  height: 100vh;

  overflow: hidden;
  overflow-y: scroll;
   
}
.glass-container {
    margin-top: 30px;
    padding: 20px 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 350px;
    height: 100px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    border-radius: 10px;
    backdrop-filter: blur(5px);
    background-color: rgba(0, 191, 255, 0.075);
    box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;

  }
</style>