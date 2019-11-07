<template>
  <div class="bus">
    <el-select
      v-model="formData.service"
      placeholder="请选择服务"
      @change="handleChange"
    >
      <el-option label="广告" value="广告"> </el-option>
      <el-option label="音频" value="音频"> </el-option>
      <el-option label="视频" value="视频"> </el-option>
      <el-option label="图片" value="图片"> </el-option>
    </el-select>
    <router-link to="/form">返回列表</router-link>
  </div>
</template>

<script>
export default {
  computed: {
    formData() {
      return this.$store.state.formData;
    }
  },
  methods: {
    handleChange(val) {
      this.$store.commit("updateFormData", this.formData);
    }
  }
};
</script>

<style>
</style>