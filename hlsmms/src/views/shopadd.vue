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
            <h3>商品添加</h3>
          </div>
          <div class="text item">
            <!-- 账号管理组件 -->
            <Shoptemplet></Shoptemplet>
            <!-- 账号管理下方内容 -->
            <el-tabs type="border-card" id="shopinpt">
              <el-form
                :model="ruleForm"
                status-icon
                :rules="rules1"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
                size="mini"
              >
                <el-form-item label="所属分类：" prop="shopclass" >
                  <el-select v-model="ruleForm.shopclass" placeholder="------选择分类-----">
                    <el-option label="超级管理员" value="超级管理员"></el-option>
                    <el-option label="普通管理员" value="普通管理员"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="条形码：" prop="bar">
                  <el-input type="text" v-model="ruleForm.bar" autocomplete="off"></el-input>
                  <el-button type="success" size="mini" plain>生成条形码</el-button>
                </el-form-item>
                <el-form-item label="商品名称：" prop="shopname">
                  <el-input type="text" v-model="ruleForm.shopname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品售价：" prop="sellprice">
                  <el-input type="text" v-model="ruleForm.sellprice" autocomplete="off"></el-input>元
                </el-form-item>
                <el-form-item label="市场价：" prop="bazaarprice">
                  <el-input type="text" v-model="ruleForm.bazaarprice" autocomplete="off"></el-input>元
                  <p class="cff">默认市场价为售价的1.2倍</p>
                  
                </el-form-item>
                <el-form-item label="商品进价：" prop="inprice">
                  <el-input type="text" v-model="ruleForm.inprice" autocomplete="off"></el-input>元
                </el-form-item>
                <el-form-item prop="inventory" label="入库数量：">
                  <el-input v-model="ruleForm.inventory"></el-input>
                </el-form-item>
                <el-form-item prop="heavy" label="商品重量：">
                  <el-input v-model="ruleForm.heavy"></el-input>
                  <p class="cff">计重商品重量为kg</p>
                </el-form-item>
                <el-form-item prop="company" label="商品单位：">
                  <el-input v-model="ruleForm.company"></el-input>
                </el-form-item>
                <el-form-item label="会员优惠：" prop="vip">
                  <el-radio v-model="ruleForm.vip" label="1">享受</el-radio>
                  <el-radio v-model="ruleForm.vip" label="2">不享受</el-radio>
                </el-form-item>
                <el-form-item label="是否促销：" prop="promotion">
                  <el-radio v-model="ruleForm.promotion" label="1">启用</el-radio>
                  <el-radio v-model="ruleForm.promotion" label="2">禁用</el-radio>
                </el-form-item>
                <el-form-item label="商品简介：" prop="introduction">
                  <el-input type="textarea" v-model="ruleForm.introduction"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
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
import Shoptemplet from "../components/shoptemplet.vue";

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateaddress = (rule, value, callback) => {
      if (value.province === "" || value.city === "") {
        callback(new Error("省份未选择"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        shopclass: "",
        bar: "",
        shopname: "",
        sellprice: "",
        bazaarprice: "",
        inprice: "",
        inventory: "",
        heavy: "",
        company: "",
        vip: "1",
        promotion: "1",
        introduction: ""
      },
      rules1: {
        shopclass: [
          { required: true, trigger: "blur", message: "所属分类必须选择" }
        ],
        bar: [{ required: true, trigger: "blur", message: "条形码必填" }],
        shopname: [{ required: true, trigger: "blur", message: "商品名称必填" }],
        sellprice: [{ required: true, trigger: "blur", message: "商品售价必填" }],
        bazaarprice: [{ required: true, trigger: "blur", message: "市场价必填" }],
        inprice: [{ required: true, trigger: "blur", message: "商品进价必填" }],
        inventory: [{ required: true, trigger: "blur", message: "入库数量必填" }],
        heavy: [{ required: true, trigger: "blur", message: "商品重量必填" }],
        company: [{ required: true, trigger: "blur", message: "商品单位必填" }],
        introduction: [{ required: true, trigger: "blur", message: "商品简介必填" }],

      }
    };
  },
  components: {
    //注册组件
    LeftMenu,
    RightTop,
    RightBottom,
    Shoptemplet
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













