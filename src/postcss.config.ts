// // const px2rem = require("postcss-px2rem");
// import px2rem from "postcss-px2rem"
// const postcss = px2rem({
//   remUnit: 16, //基准大小 baseSize，需要和rem.js中相同
// });

// module.exports = {
//   css: {
//     loaderOptions: {
//       postcss: {
//         plugins: [postcss],
//       },
//     },
//   },
// };


module.exports = {
  plugins: {
      // postcss-pxtorem 插件的版本需要 >= 5.0.0
      // 适用版本 5.1.1
      // npm install postcss-pxtorem@5.1.1 -D
      'postcss-pxtorem': {
         // @ts-ignore
          rootValue({ file }) { // 判断是否是vant的文件 如果是就使用 37.5为根节点字体大小
              // 否则使用75 因为vant使用的设计标准为375 但是市场现在的主流设置尺寸是750
              return file.indexOf('vant') !== -1 ? 37.5 : 75;
          },
          // 配置哪些文件中的尺寸需要转化为rem *表示所有的都要转化
          propList: ['*'],
      },
  },
};
