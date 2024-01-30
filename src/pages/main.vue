<script setup lang="ts">
import {ref} from 'vue'
import {useRouter} from 'vue-router'
const router= useRouter()
const active =ref('home')
const changeFn =(path:any):void=>{
  router.push({
    name:path
  })

}
</script>
<template>
    <div>
        <titleBar :title="active" :showBack="false"/>
        <router-view></router-view>
        <var-bottom-navigation v-model:active="active" :fixed="true" @change="changeFn">
            <var-bottom-navigation-item name="home" label="home" icon="home" />
            <var-bottom-navigation-item name="about" label="about" icon="magnify" />
            <var-bottom-navigation-item name="info" label="info" icon="heart" />
            <var-bottom-navigation-item name="my" label="my" icon="account-circle" />
          </var-bottom-navigation>
    </div>
</template>