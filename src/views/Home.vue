<template>
  <div class="home">
    <router-link to="/form">
      <el-button>新建（屁屁妮点这里）</el-button>
    </router-link>
    <h3>单括号</h3>
    <div><el-button size="small" @click="setTagInput1">设置值</el-button></div>
    <tag-input v-model="tagInputValue1" :tagconfig="tagconfig"> </tag-input>
    <div>{{ tagInputValue1 }}</div>
    <el-divider></el-divider>
    <h3>双括号</h3>
    <tag-input v-model="tagInputValue2" :tagconfig="tagconfig" :braces="true">
    </tag-input>
    <div>{{ tagInputValue2 }}</div>
    <el-divider></el-divider>
    <h3>双括号带校验配置 支持min，max，maxTags</h3>
    <tag-input
      v-model="tagInputValue3"
      :tagconfig="tagconfig"
      :braces="true"
      :prop="{ min: 6, max: 20, maxTags: 2 }"
    >
    </tag-input>
    <div>{{ tagInputValue3 }}</div>
  </div>
</template>

<script>
import tagInput from "@/components/tagInput.vue";
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
  },
  watch: {
    tagInputValue1() {
      console.log("tagInputValue1", this.tagInputValue1);
    }
  }
};
</script>
<style lang="less" scoped>
.home {
  width: 900px;
  margin: 0 auto;
}
</style>
