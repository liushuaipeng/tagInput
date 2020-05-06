<template>
  <div id="app">
    <div class="home">
      <h3>单括号</h3>
      <div>
        <el-button size="small" @click="setTagInput1">设置值</el-button>
      </div>
      <tag-input v-model="tagInputValue1" :tagconfig="tagconfig"> </tag-input>
      <div>{{ tagInputValue1 }}</div>
      <el-divider></el-divider>
      <h3>双括号</h3>
      <tag-input
        v-model="tagInputValue2"
        :tagconfig="tagconfig"
        :left-symbol="'{{'"
        :right-symbol="'}}'"
      >
      </tag-input>
      <div>{{ tagInputValue2 }}</div>
      <el-divider></el-divider>
      <h3>双括号带校验配置 支持min，max，maxTags</h3>
      <tag-input
        v-model="tagInputValue3"
        :tagconfig="tagconfig"
        :left-symbol="'{{'"
        :right-symbol="'}}'"
        :prop="{ min: 6, max: 20, maxTags: 2 }"
      >
      </tag-input>
      <div>{{ tagInputValue3 }}</div>
    </div>
  </div>
</template>
<script>
import tagInput from "./tag-input.vue";
export default {
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
      tagInputValue1: {},
      tagInputValue2: {},
      tagInputValue3: {}
    };
  },
  methods: {
    setTagInput1() {
      this.tagInputValue1 = {
        text: "0{地点}12{地点}3{任务}45{地点}{地点}",
        tags: [
          { id: 2, name: "地点" },
          { id: 2, name: "地点" },
          { id: 2, name: "地点" },
          { id: 3, name: "任务" },
          { id: 2, name: "地点" }
        ]
      };
    }
  }
};
</script>
<style lang="less">
body {
  margin: 0;
}
.home {
  width: 900px;
  margin: 0 auto;
}
</style>
