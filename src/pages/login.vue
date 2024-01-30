<template>
  <div class="login">
    <var-app-bar title="标题" title-position="center" round  color="linear-gradient(90deg, rgba(72,176,221,1) 0%, rgba(0,208,161,1) 100%)"/>

    登录
  </div>
</template>

<script >
//  const regToToast = new Map([
//         [/^00/, "不能小于1元"],
//         [/^[.]/, "请正确输入还款金额!"],
//         [/(\.[0-9]{3,})$/, "请正确输入还款金额"], // 最多两位小数
//       ]);
//       for (let [key, msg] of regToToast) {
//         if (!key.test(_value)) continue;
//         this.showToast(msg);
//         return this.setInputValue(
//           msg === "请正确输入还款金额" ? Math.floor(_value * 100) / 100 : ""
//         );
//       }
</script>

<style scoped>
.login{}
</style>