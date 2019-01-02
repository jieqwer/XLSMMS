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
            <h3>添加分类</h3>
          </div>
          <div class="text item">
            <!-- 账号管理组件 -->
            <Classtemplet></Classtemplet>
            <!-- 账号管理下方内容 -->
            <el-tabs type="border-card">
              <el-form
                :model="ruleForm"
                status-icon
                :rules="rules1"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
                label-position="top"
              >
                <el-form-item label="所属分类：" prop="group">
                  <el-select v-model="ruleForm.group" placeholder="--顶级分类--">
                    <el-option
                      v-for="item in options"
                      :key="item.tid"
                      :label="item.tclassname"
                      :value="item.tclassname"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="分类名称：" prop="username">
                  <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="状态：" prop="state">
                  <el-radio v-model="ruleForm.state" label="1">启用</el-radio>
                  <el-radio v-model="ruleForm.state" label="2">禁用</el-radio>
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
import Classtemplet from "../components/classifytemplet.vue";

export default {
  data() {
    return {
      ruleForm: {
        username: "",
        group: "",
        state: "1"
      },
      rules1: {
        username: [
          { required: true, trigger: "blur", message: "分类名称必须填写" }
        ],
        group: [{ required: true, trigger: "change", message: "请选择父级分类" }],
        state: [
          { required: true, message: "请选择分类状态", trigger: "change" }
        ]
      },
      options: [
        {
          tid: "",
          tclassname: ""
        }
      ]
    };
  },
  components: {
    //注册组件
    LeftMenu,
    RightTop,
    RightBottom,
    Classtemplet
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post(
              "http://127.0.0.1:888/users/classadd",
              this.qs.stringify(this.ruleForm)
            )
            .then(result => {
              if (result.data.isOk) {
                //添加成功
                this.$message({
                  message: result.data.msg,
                  type: "success"
                });
                setTimeout(() => {
                  this.$router.push("/classlist");
                }, 100);
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
    gettclass() {
      //封装获取商品列表方法
      this.axios
        .get("http://127.0.0.1:888/users/gettclass")
        .then(result => {
          this.options = result.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    //实例创建后的钩子
    this.gettclass(); //调用获取顶级分类方法
  }
};
</script>


<style>
/* scoped 作用域限定样式只在当前组件生效 */
</style>













