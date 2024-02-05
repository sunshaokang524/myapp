import toast from "./my-toast.vue";
import { createApp } from "vue";
const Toast = (option) => {
    
  const rootNode = document.createElement("div");
  document.body.childNodes[1].appendChild(rootNode);
  const app = createApp(toast, {
    ...option,
   
  });

  return app.mount(rootNode);
};
Toast.install = app => {
    // 注册全局属性，类似于 Vue2 的 Vue.prototype
    app.config.globalProperties.$Toast = options => Toast(options).show();
  };
  Toast.show = options => Toast(options).show();

  export default Toast;

