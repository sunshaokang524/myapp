<template>
    <!-- 加一点动画效果 -->
    <transition name="toast" @after-leave="onAfterLeave">
      <div class="toast" v-if="isShow" :style="{ width: toastWidth }">
        <!-- 手动点击隐藏弹窗 -->
        <div v-if="time < 0" class="cancel" @click="hidden"></div>
        <div v-if="content && type !== 'icon'" class="content" :style="{ textAlign }">{{ content }}</div>
      </div>
    </transition>
  </template>
  <script setup>
    import { ref, computed } from "vue";
  
    const props = defineProps({
      //文案内容，默认success
      content: {
        type: String,
        default: "success",
      },
      //显示时间，默认2s，传小于0的值不自动消失，需要手动关闭
      time: {
        type: Number,
        default: 2000,
      },
      //宽度，默认310px，这里考虑传入的宽度可以用字符串也可以用数值，所以没有定义类型
      width: {
        default: 400,
      },
      //弹窗文案文本对齐方式，默认center
      textAlign: {
        type: String,
        default: "center",
      },
      //类型,默认图标（√），传'warn'显示（！），传其他值则不显示icon，传'icon'不显示文本
      type: {
        type: String,
        default: "success",
      },
      //接收的函数方法
      hide: {
        type: Function,
        default: () => {},
      },
    });
    // 弹窗显隐控制
    const isShow = ref(false);
    // 宽度控制，由于设计稿宽度是750px的宽度，这里通过计算属性，根据设备屏幕宽度自适应显示弹窗的宽度
    const toastWidth = computed(() => (parseInt(props.width.toString()) / 750) * document.documentElement.clientWidth + "px");
    // 显示弹窗方法
    const show = () => {
      isShow.value = true;
      if (props.time >= 0) {
        setTimeout(() => {
          isShow.value = false;
        }, props.time);
      }
    };
    // 隐藏弹窗方法
    const hidden = () => {
      isShow.value = false;
    };
    // 弹窗关闭后等动画结束再调用卸载逻辑
    const onAfterLeave = () => {
      props.hide();
    };
    // 将显示弹窗方法暴露出去
    defineExpose({
      show,
    });
  </script>
  
  <style lang="scss" scoped>
    .toast-enter-active,
    .toast-leave-active {
      transition: opacity 0.3s ease-out;
    }
    .toast-enter-from,
    .toast-leave-to {
      opacity: 0;
    }
    .toast {
      position: fixed;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 99;
      background: #333333ad;
      border-radius: 10px;
      text-align: center;
      .cancel {

        position: absolute;
        top: 10px;
        right: 10px;
        width: 40px;
        height: 40px;
        &::before {
          content: "";
          position: absolute;
          top: -10px;
          right: -10px;
          bottom: -10px;
          left: -10px;
        }
      }

      .content {
        font-size: 16px;
        color: #ffffff;
        line-height: 30px;
        text-align: initial;
        padding: 10px;
      }
    }
  </style>
  