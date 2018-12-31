<template>
  <el-container id="outBox">
    <!-- 左侧 -->
    <LeftMenu></LeftMenu>
    <!-- 右侧 -->
    <el-container class="content">
      <!-- 顶部 -->
      <RightTop></RightTop>
      <!-- 中间 -->
      <el-main>
        <el-card class="box-card" id="tables">
          <div slot="header" class="clearfix">
            <h3>商品入库</h3>
          </div>
          <div class="text item">
            <!-- 账号管理组件 -->
            <Inventorytemplet></Inventorytemplet>
            <!-- 账号管理下方内容 -->
            <el-tabs type="border-card" id="shopinpt">
              <el-form
                :model="ruleForm"
                status-icon
                :rules="rules1"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
                label-position="top"
              >
                <el-form-item label="商品条形码：" prop="bar">
                  <el-input type="text" v-model="ruleForm.bar" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="数量：" prop="num">
                  <el-input type="text" v-model="ruleForm.num" autocomplete="off"></el-input>
                  <p class="cff">计重商品单位为千克</p>
                </el-form-item>
                <el-form-item label="进价：" prop="price">
                  <el-input type="text" v-model="ruleForm.price" autocomplete="off"></el-input>元
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">入库</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-tabs>
          </div>
        </el-card>
      </el-main>
      <!-- 底部 -->
      <RightBottom></RightBottom>
    </el-container>
  </el-container>
</template>

<script>
//引入导航组件
import LeftMenu from "../components/leftMenu.vue";
import RightTop from "../components/rightTop.vue";
import RightBottom from "../components/rightBottom.vue";
import Inventorytemplet from "../components/inventorytemplet.vue";

export default {
  data() {
    return {
      ruleForm: {
        bar: "",
        num: "",
        price: ""
      },
      rules1: {
        bar: [{ required: true, trigger: "blur", message: "条形码必填" }],
        num: [{ required: true, trigger: "blur", message: "数量必填" }],
        price: [{ required: true, message: "价格必填", trigger: "blur" }]
      }
    };
  },
  components: {
    //注册组件
    LeftMenu,
    RightTop,
    RightBottom,
    Inventorytemplet
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>


<style>
/* scoped 作用域限定样式只在当前组件生效 */
</style>













