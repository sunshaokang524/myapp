<template>
  <div class="my-picker">
    <var-overlay v-model:show="over_show">
      <var-picker
        class="picker_live"
        cascade
        :columns:any="columns"
        @confirm:any="handleChange"
      />
    </var-overlay>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
const props=defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  selected:{
    type:Function,
    default:(val:any)=>{
        console.log(val)
    }
  }
});
const over_show = ref<boolean>(false);
const show = () => {
  over_show.value = true;
};
const handleChange = (value: any, index: number) => {
    props.selected(value)
console.log(value, index);
}
defineExpose({
  show,
});
</script>

<style lang="scss">
.picker_live {
  position: fixed;
  bottom: 0;
}
</style>