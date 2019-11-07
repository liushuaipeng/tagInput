<template>
  <div class="bus">
    <el-select
      v-model="formData.bus"
      placeholder="请选择商家"
      @change="handleChange"
    >
      <el-option label="抖音" value="抖音"> </el-option>
      <el-option label="快手" value="快手"> </el-option>
      <el-option label="美图" value="美图"> </el-option>
      <el-option label="滴滴" value="滴滴"> </el-option>
      <el-option label="阿里" value="阿里"> </el-option>
      <el-option label="百度" value="百度"> </el-option>
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