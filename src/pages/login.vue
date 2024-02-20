<template>
  <div class="login">
    <div ref="vantaRef" style="width: 100%; height: 100vh;" class="bgColor">
      <div class="glass-container" id="glass" v-show="signFlag">
        <var-input style="width:215px" blur-color="#fff" focus-color="#fff" text-color="#fff" placeholder="手机号"
          v-model="userPhone" />
        <var-input blur-color="#fff" focus-color="#fff" text-color="#fff" placeholder="密码" v-model="passWord"
          :type="pwFlag ? 'password' : 'text'"> <template #append-icon>
            <var-icon class="append-icon" name="minus-box-outline" @click="pwFlag = false" v-if="pwFlag" />
            <var-icon class="append-icon" name="minus-box" @click="pwFlag = true" v-else />
          </template>
        </var-input>
        <div class="btn" @click="login">登录</div>
        <span class="sign_text" @click="signFlag = false">注册账号</span>
      </div>
      <div v-show="!signFlag" class="glass-container-sign" id="glass">
        <var-input style="width:215px" blur-color="#fff" focus-color="#fff" text-color="#fff" placeholder="手机号"
          v-model="signPhone" />
        <var-input blur-color="#fff" focus-color="#fff" text-color="#fff" :type="pwFlag1 ? 'password' : 'text'"
          show-password placeholder="密码" v-model="signPassWord">
          <template #append-icon>
            <var-icon class="append-icon" name="minus-box-outline" @click="pwFlag1 = false" v-if="pwFlag1" />
            <var-icon class="append-icon" name="minus-box" @click="pwFlag1 = true" v-else />
          </template>
        </var-input>
        <var-input blur-color="#fff" focus-color="#fff" text-color="#fff" :type="pwFlag2 ? 'password' : 'text'"
          show-password placeholder="确认密码" v-model="signPassWord2"> <template #append-icon>
            <var-icon class="append-icon" name="minus-box-outline" @click="pwFlag2 = false" v-if="pwFlag2" />
            <var-icon class="append-icon" name="minus-box" @click="pwFlag2 = true" v-else />
          </template>
        </var-input>
        <div class="btn" @click="goSign">注册</div>
        <span class="sign_text" @click="signFlag = true">去登录</span>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as THREE from 'three'//导入样式
import CLOUDS from 'vanta/src/vanta.clouds'//导入动态样式逻辑
import { post } from '../../api/api'
import { getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter()
const { proxy }: any = getCurrentInstance();
// 背景
const vantaRef: any = ref(null);
// 登录
const userPhone = ref<string>()
const passWord = ref<string>()
const login = (): void => {
  post('/login',{phone:userPhone.value,passWord:passWord.value}).then((res:any)=>{
    if(res?.code==200){
      proxy.$Toast({
        content:res.message,hide:()=>{
          localStorage.setItem('Token',res.data.token)
          localStorage.setItem('Id',res.data.id)
          router.replace('/home')
        }
      })
    }else if (res?.code==406){
      proxy.$Toast({
        content: res.message, time: 3000,
      })
    }
  })

}
// 注册
const signFlag = ref<boolean>(true)


const signPhone = ref<string>()
// 定义一个signPassWord变量，用于存储密码
const signPassWord = ref<string>()
// 定义一个signPassWord2变量，用于存储重复密码
const signPassWord2 = ref<string>()
// 定义一个pwFlag变量，用于存储密码是否可见
const pwFlag = ref<boolean>(true)
// 定义一个pwFlag1变量，用于存储重复密码是否可见
const pwFlag1 = ref<boolean>(true)
// 定义一个pwFlag2变量，用于存储重复密码是否可见
const pwFlag2 = ref<boolean>(true)

const goSign = (): void => {
  let params = { userPhone: signPhone.value, passWord: signPassWord.value }
  post('/signIn', params).then(res => {
    if (res?.code == 200) {
      proxy.$Toast({
        content: res.message, time: 3000, hide: () => {
          signFlag.value = true
          signPhone.value = ''
          signPassWord.value = ''
          signPassWord2.value = ''
        }
      })
    }else if (res?.code==406){
      proxy.$Toast({
        content: res.message, time: 3000,
      })
    }
  })
}
onMounted(() => {
  const vantaEffect = CLOUDS({
    el: vantaRef.value,
    THREE: THREE
  })
  VANTA.CLOUDS({
    el: vantaRef.value,
    mouseControls: true,
    touchControls: true,
    gyroControls: true,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    color1: 1000000,
    color2: 16443110,
    backgroundColor: 0xdc2727,
    skyColor: 0x144da0,
    cloudShadowColor: 0x83157,
  });
})



</script>

<style scoped lang="scss">
.login {

  .glass-container {
    padding: 20px 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 230px;
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

  .glass-container-sign {
    padding: 20px 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 300px;
    //  height: 230px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    border-radius: 10px;
    backdrop-filter: blur(5px);
    background-color: rgba(0, 191, 255, 0.075);
    box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
    z-index: 1;
  }

  .bgColor {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btn {

    /* 居中 */
    transform: translate(0, 0);
    font-size: 14px;
    background: linear-gradient(90deg, #03a9f4, #f441a5, #09ec7b, #03a9f4);
    background-size: 400%;
    width: 200px;
    height: 40px;
    color: #fff;
    line-height: 40px;
    text-align: center;
    text-transform: uppercase;
    border-radius: 20px;
    z-index: 1;
  }

  .btn::before {
    content: "";
    position: absolute;
    left: -5px;
    right: -5px;
    top: -5px;
    bottom: -5px;
    background: linear-gradient(90deg, #03a9f4, #f441a5, #3bff93, #03a9f4);
    background-size: 400%;
    border-radius: 50px;
    filter: blur(20px);
    z-index: -1;
  }

  .btn:hover::before {
    animation: sun 8s infinite;
  }

  .btn:hover {
    animation: sun 8s infinite;
  }

  @keyframes sun {
    100% {
      background-position: -400% 0;
    }
  }

  .sign_text {
    font-size: 16px;
    letter-spacing: -30px;
    color: #0000009d;
    animation: showup 3s linear forwards;
  }

  @keyframes showup {
    0% {
      filter: blur(2px);
    }

    100% {
      letter-spacing: 10px;
      filter: blur(-12px);
    }
  }

}
</style>