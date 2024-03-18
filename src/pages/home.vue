<script setup lang="ts">
  // @ts-ignore
import test from "../components/test/test.vue";
</script>
<template>
  <div class="home">
    <test></test>
    <div class="glass-container">
      西西弗斯无声的全部快乐就在于：他的命运是属于他的。他的岩石是他的事情。同样，当荒谬的人深思他的痛苦时，他就使一切偶像哑然失声。荒谬的人知道，他是自己生活的主人。我把西西弗斯留在山脚下！我们总是看到他身上的重负。而西西弗斯告诉我们，最高的虔诚是否认诸神并且搬掉石头。他也认为自己是幸福的。这个从此没有主宰的世界对他来讲既不是荒漠，也不是沃土。这块巨石上的每一颗粒，这黑黝黝的高山上的每一矿砂唯有对西西弗斯才形成一个世界。他爬上山顶所要进行的斗争本身就足以使一个人心里感到充实
      ——加缪
    </div>
  </div>
</template>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
}
.glass-container {
  box-sizing: border-box;

  width: 90%;
  min-height: 300px;
  line-height: 28px;
  padding: 20px;
  color: white;
  display: flex;
  font-size: 16px;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border-radius: 28px;
  backdrop-filter: blur(19px);
  background-color: rgba(240, 241, 241, 0.227);
  box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
  border: 0px rgba(255, 255, 255, 0.4) solid;
  border-bottom: 0px rgba(40, 40, 40, 0.35) solid;
  border-right: 0px rgba(40, 40, 40, 0.35) solid;
}
</style>
