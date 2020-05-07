# tagInputVue

> 一款可以输入标签的输入框的 vue 组件

### example

![图片展示](https://qcloudtest-1255506820.cos.ap-guangzhou.myqcloud.com/github/taginput/example.gif)
Demo：[https://liushuaipeng.cn/demo/tag-input-vue](https://liushuaipeng.cn/demo/tag-input-vue)

### install tag-input-vue

```
$ npm install tag-input-vue --save
```

### Use(如何引入)

```javascript
// 全局注册
import Vue from "vue";
import tagInput from "tag-input-vue";
// css可不引入，使用时重构样式（组件注重功能，没有过多的css）
import "tag-input-vue/dist/tag-input.css";
Vue.use(tagInput);
new Vue({});
```

> 在组件中使用

```vue
<template>
  <div class="tag-input-vue">
    <tag-input v-model="tagInputValue" :tagconfig="tagconfig"> </tag-input>
  </div>
</template>
<script>
// 组件内注册
import tagInput from "tag-input-vue";
// css可不引入，使用时重构样式（组件注重功能，没有过多的css）
import "tag-input-vue/dist/tag-input.css";
export default {
  // 组件内注册
  components: {
    tagInput
  },
  data() {
    return {
      tagconfig: [
        { id: 1, name: "日期" },
        { id: 2, name: "地点" },
        { id: 3, name: "任务" }
      ],
      tagInputValue: {}
    };
  }
};
</script>
```

### Input Attributes

| name 参数     | type 类型 | default 默认值         | describe 描述                             |
| ------------- | --------- | ---------------------- | ----------------------------------------- |
| v-model/value | Object    | { text: "", tags: [] } |                                           |
| tagconfig     | Array     | []                     | tags 配置                                 |
| left-symbol   | String    | {{                     | tag 在 input 中左标记                     |
| right-symbol  | String    | }}                     | tag 在 input 中右标记                     |
| prop          | Object    | {}                     | 可选配置：{ min: 6, max: 20, maxTags: 2 } |
