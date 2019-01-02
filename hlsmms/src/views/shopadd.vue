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
                <el-form-item label="所属分类：" prop="shopclass">
                  <el-select v-model="ruleForm.shopclass" placeholder="------选择分类-----">
                    <el-option
                      v-for="item in options"
                      :key="item.cid"
                      :label="item.classname"
                      :value="item.classname"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="条形码：" prop="bar">
                  <el-input type="text" v-model="ruleForm.bar" autocomplete="off"></el-input>
                  <el-button type="success" size="mini" plain @click="getcode()">生成条形码</el-button>
                </el-form-item>
                <el-form-item label="商品名称：" prop="shopname">
                  <el-input type="text" v-model="ruleForm.shopname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品进价：" prop="inprice">
                  <el-input
                    type="text"
                    v-model="ruleForm.inprice"
                    @blur="updatePrice()"
                    autocomplete="off"
                  ></el-input>元
                </el-form-item>
                <el-form-item label="商品售价：" prop="sellprice">
                  <el-input type="text" v-model="ruleForm.sellprice" autocomplete="off"></el-input>元
                </el-form-item>
                <el-form-item label="市场价：" prop="bazaarprice">
                  <el-input type="text" v-model="ruleForm.bazaarprice" autocomplete="off"></el-input>元
                  <p class="cff">默认市场价为售价的1.2倍</p>
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
                  <el-radio v-model="ruleForm.vip" label="0">不享受</el-radio>
                </el-form-item>
                <el-form-item label="是否促销：" prop="promotion">
                  <el-radio v-model="ruleForm.promotion" label="1">启用</el-radio>
                  <el-radio v-model="ruleForm.promotion" label="0">禁用</el-radio>
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
    return {
      ruleForm: {
        shopclass: "",
        bar: "",
        shopname: "",
        sellprice: "0",
        bazaarprice: "0",
        inprice: "0",
        inventory: "0",
        heavy: "",
        company: "",
        vip: "1",
        promotion: "0",
        introduction: ""
      },
      rules1: {
        shopclass: [
          { required: true, trigger: "change", message: "所属分类必须选择" }
        ],
        bar: [{ required: true, trigger: "blur", message: "条形码必填" }],
        shopname: [
          { required: true, trigger: "blur", message: "商品名称必填" }
        ],
        sellprice: [
          { required: true, trigger: "blur", message: "商品售价必填" }
        ],
        bazaarprice: [
          { required: true, trigger: "blur", message: "市场价必填" }
        ],
        inprice: [{ required: true, trigger: "blur", message: "商品进价必填" }],
        inventory: [
          { required: true, trigger: "blur", message: "入库数量必填" }
        ],
        heavy: [{ required: true, trigger: "blur", message: "商品重量必填" }],
        company: [{ required: true, trigger: "blur", message: "商品单位必填" }],
        introduction: [
          { required: true, trigger: "blur", message: "商品简介必填" }
        ]
      },
      options: [
        {
          cid: "",
          classname: ""
        }
      ]
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
          this.axios
            .post(
              "http://127.0.0.1:888/users/shopadd",
              this.qs.stringify(this.ruleForm)
            )
            .then(result => {
              if (result.data.isOk) {
                //添加成功
                this.$message({
                  message: result.data.msg,
                  type: "success"
                });
                this.$confirm(result.data.msg + "，是否继续添加商品?", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                })
                  .then(() => {
                    this.ruleForm = {
                      shopclass: "",
                      bar: "",
                      shopname: "",
                      sellprice: "0",
                      bazaarprice: "0",
                      inprice: "0",
                      inventory: "0",
                      heavy: "",
                      company: "",
                      vip: "1",
                      promotion: "0",
                      introduction: ""
                    };
                  })
                  .catch(() => {
                    this.$router.push("/shoplist");
                  });
              } else {
                //添加失败
                this.$message.error(result.data.msg);
              }
            })
            .catch(error => {
              console.error("服务器错误返回的信息", error);
            });
        } else {
          alert("× 您输入的信息有误!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getcode() {
      this.ruleForm.bar = new Date().getTime();
    },
    getclass() {
      //封装获取商品列表方法
      this.axios
        .get("http://127.0.0.1:888/users/getclass")
        .then(result => {
          this.options = result.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //自动更新价格: 进货价*5=市场价    销售价=市场价*0.9
    updatePrice() {
      this.ruleForm.bazaarprice = this.ruleForm.inprice * 5;
      this.ruleForm.sellprice = this.ruleForm.bazaarprice * 0.9;
    }
  },
  created() {
    //实例创建后的钩子
    this.getclass(); //调用获取顶级分类方法
  }
};
</script>


<style>
/* scoped 作用域限定样式只在当前组件生效 */
</style>













