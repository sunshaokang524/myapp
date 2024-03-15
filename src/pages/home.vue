<script setup lang="ts">
// import { post } from '../../api/api';
// post('https://www.thepoemforyou.com/dist/#/newsDetail?id=3000', { username: 'admin', password: '123456' }).then(res => {
//     console.log(res);
// });
</script>
<template>
  <div class="home">
    <!-- <keep-alive> -->
      <div class="glass-container" id="glass">
        <div class="typewriter">
          <div class="typing">你好，世界（444444）</div>
        </div>
      </div>
    <!-- </keep-alive> -->
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
  margin-top: 50px;
  width: 90%;
  height: 200px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border-radius: 28px;
  backdrop-filter: blur(19px);
  background-color: rgba(3, 33, 43, 0.227);
  box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
  border: 0px rgba(255, 255, 255, 0.4) solid;
  border-bottom: 0px rgba(40, 40, 40, 0.35) solid;
  border-right: 0px rgba(40, 40, 40, 0.35) solid;
  .typewriter .typing {
   // width: 100%;
    //word-wrap: break-word;
    font-size: 20px;
    color: #fff;
    font-family: monospace;
    overflow: hidden;
    //font-size: 36px;
    /* 保证文字在动画之前隐藏 */
    border-right: 0.15em solid rgb(0, 140, 255);
    /* 使用边框实现光标 */
    white-space: nowrap;
    margin: 0 auto;
    letter-spacing: 0.15em;
    animation: typing 3.5s steps(30, end), blink-caret 0.5s step-end infinite;
  }
  @keyframes typing {
	from {
		width: 0
	}

	to {
		width: 100%
	}
}

@keyframes blink-caret {

	from,
	to {
		border-color: transparent
	}

	50% {
		border-color: orange
	}
}
}
</style>
