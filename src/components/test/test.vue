<template>
  <div class="content">
    <h2 :data-text="text">{{text}}</h2>
  </div>
</template>

<script setup>
defineProps({
  text:{
    type:String,
    default:'Sisyphus'
  }
})
</script>

<style lang="scss" scoped>
.content{
  z-index: 10;
}
h2 {
  position: relative;
  font-size: 14vw;
  color: #ffffff5d;
  -webkit-text-stroke: 0.3vw #383d52;

}
h2::before {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  -webkit-text-stroke: 0vw #383d52;
  color: #ffffff;
  border-right: 1px solid #ffffff;
  overflow: hidden;
  animation: animate 6s linear infinite;
}
@keyframes animate {
  0%,
  10%,
  100% {
    width: 0;
  }
  70%,
  90% {
    width: 100%;
  }
}
</style>
