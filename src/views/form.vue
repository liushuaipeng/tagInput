<template>
  <div class="form">
    <el-form size="small" :model="formData" label-width="100px">
      <el-form-item label="姓名">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="商家">
        <el-input v-model="formData.bus" disabled>
          <el-button @click="$router.push('/bus')" slot="append">
            点此选择商家
          </el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="服务">
        <el-input v-model="formData.service" disabled>
          <el-button @click="$router.push('/service')" slot="append">
            点此选择服务
          </el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  computed: {
    formData() {
      return this.$store.state.formData;
    }
  },
  watch: {
    formData: {
      handler(val) {
        this.$store.commit("updateFormData", val);
      },
      deep: true
    }
  },
  methods: {
    submit() {
      console.log(this.formData);
    }
  }
};
</script>

<style>
.form {
  padding: 100px 200px;
}
</style>