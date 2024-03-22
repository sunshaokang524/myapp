<template>

  <div class="my-picker">
    <var-overlay v-model:show="over_show">
      <!-- @ts-ignore -->
      <var-picker
      v-if="area"
        class="picker_live"
        cascade
        ref="picker"
        :columns="area"
        @confirm="handleChange"
      />
    </var-overlay>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import area from '@varlet/ui/json/area.json'
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
console.log(props.columns,'4554');
const over_show = ref<boolean>(false);
const picker = ref<any>(null);
const show = () => {
  over_show.value = true;
};
show()
const handleChange:any= (value: any, index: number) => {
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