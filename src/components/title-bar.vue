<script setup  lang="ts">
import { defineProps } from 'vue'
import {useRouter} from 'vue-router'
const router = useRouter()
const goBack=()=>{
    router.go(-1)
}
let props =defineProps({
    title:{
        default:'主页',
        type:String
    },
    showBack:{
      default:true,
      type:Boolean
    }
})
</script>
<template>
<div>
    <var-app-bar v-bind="$attrs" :title="props.title" title-position="center"   color="linear-gradient(90deg, rgb(121 121 121 / 33%) 0%, rgb(0 208 161 / 0%) 100%)">
        <template #left v-if="showBack">
            <var-button
              color="transparent"
              text-color="#fff"
              round
              text
              @click="goBack"
            >
              <var-icon name="chevron-left" :size="24" />
            </var-button>
          </template>
    </var-app-bar>
</div>
</template>