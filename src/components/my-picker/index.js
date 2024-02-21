import picker from "./my-picker.vue";
import { createApp } from "vue";
const Picker = (option) => {
    
  const rootNode = document.createElement("div");
  document.body.childNodes[1].appendChild(rootNode);
  const app = createApp(picker, {
    ...option,
   
  });

  return app.mount(rootNode);
};
Picker.install = app => {
    // 注册全局属性，类似于 Vue2 的 Vue.prototype
    app.config.globalProperties.$Picker = options => Picker(options).show();
  };
  Picker.show = options => Picker(options).show();

  export default Picker;

