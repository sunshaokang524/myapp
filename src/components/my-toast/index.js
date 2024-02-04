import toast from "./my-toast.vue";
import { createApp } from "vue";
const Toast = (option) => {
    
  const rootNode = document.createElement("div");
  console.log(document.body.childNodes)
  document.body.childNodes[1].appendChild(rootNode);
  const app = createApp(toast, {
    ...option,
   
  });
  console.log(rootNode,'<===toast')
  return app.mount(rootNode);
};
Toast.install = app => {
    // 注册全局属性，类似于 Vue2 的 Vue.prototype
    app.config.globalProperties.$Toast = options => Toast(options).show();
  };
  Toast.show = options => Toast(options).show();
  console.log(Toast,'ToastToast')
  export default Toast;

