<template>
  <el-dialog title="新增组件" :visible="showDialog" :show-close="false" width="35%" @before-close="handleClose">
    <el-form ref="form" :model="form" :rules="form.isCreate ? rules1 : rules2" label-width="120px">
      <el-form-item prop="isCreate" label="操作">
        <el-switch v-model="form.isCreate" active-text="新增组件" inactive-text="新增分类" @change="isCreateChange"></el-switch>
      </el-form-item>
      <template v-if="form.isCreate">
        <el-form-item prop="name" label="组件名称" key="create1">
          <el-input v-model="form.name" placeholder="请输入组件名称"></el-input>
        </el-form-item>
        <el-form-item prop="cname" label="组件中文名称" key="create2">
          <el-input v-model="form.cname" placeholder="请输入组件中文名称"></el-input>
        </el-form-item>
        <el-form-item prop="category" label="组件类型" key="create3">
          <el-select v-model="form.category" placeholder="请选择组件类型" style="width: 100%">
            <el-option v-for="(cate, index) in categories" :key="index" :label="cate.label" :value="cate.value" />
          </el-select>
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item prop="cateName" label="分类名称" key="cate1">
          <el-input v-model="form.cateName" placeholder="请输入分类名称"></el-input>
        </el-form-item>
      </template>
      <el-form-item class="btns-wrapper">
        <el-button type="primary" :loading="loading" @click="onSubmit">立即创建</el-button>
        <el-button :loading="loading" @click="showDialog = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { getCompCategories, putComp, putCompCategories } from '../api/index'
import { Message } from 'element-ui'
export default {
  data() {
    const validatorName = function(rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入组件名称'))
        return
      }
      const reg = /[a-zA-Z]{1,}(-[0-9a-zA-Z]+)*/
      if (!reg.test(value)) {
        callback(new Error('只能为(数字、字母、-)的组合'))
      }
      callback()
    }
    return {
      form: {
        name: '',
        cname: '',
        category: '',
        cateName: '',
        isCreate: true
      },
      showDialog: false,
      categories: [],
      loading: false,
      rules1: {
        name: [
          { required: true, message: '请输入组件名称', trigger: 'blur' },
          { validator: validatorName, trigger: 'blur' }
        ],
        category: [{ required: true, message: '请选择组件类型', trigger: 'blur' }]
      },
      rules2: {
        cateName: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
      }
    };
  },
  methods: {
    handleClose(done) {
      this.form = {
        name: '',
        cname: '',
        category: '',
        cateName: '',
        isCreate: true
      }
      done()
    },
    isCreateChange(val) {
      if (val) {
        this.form.cateName = ''
      }
      this.form.name = ''
      this.form.cname = ''
      this.form.category = ''
    },
    async getData() {
      const { data } = await getCompCategories()
      this.categories = data || []
    },
    show() {
      this.showDialog = true
      this.getData()
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          const form = {}
          let api = putCompCategories
          if (this.form.isCreate) {
            Object.assign(form, {
              name: this.form.name,
              cname: this.form.cname,
              category: this.form.category
            })
            api = putComp
          } else {
            Object.assign(form, {
              cateName: this.form.cateName
            })
          }
          api(form).then(({ code, message }) => {
            if (code === 200) {
              Message({ message, type: 'success' })
              this.showDialog = false
            } else {
              Message({ message, type: 'error' })
            }
          }).finally(() => {
            this.loading = false
          })
        }
      })
    }
  }
};
</script>
<style scoped>
.btns-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
