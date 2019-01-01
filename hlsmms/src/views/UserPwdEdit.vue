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
            <h3>密码修改</h3>
          </div>
          <div class="text item">
            <!-- 模板的内容 -->
            <!-- 账号管理组件 -->
            <Usertemplet></Usertemplet>
            <!-- 账号管理下方内容 -->
            <el-tabs type="border-card">
              <el-form
                :model="ruleForm2"
                status-icon
                :rules="rules2"
                ref="ruleForm2"
                label-width="100px"
                class="demo-ruleForm"
                label-position="top"
              >
                <el-form-item label="原密码" prop="oldpass">
                  <el-input type="text" v-model="ruleForm2.oldpass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                  <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                  <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                  <el-button @click="resetForm('ruleForm2')">重置</el-button>
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
import Usertemplet from "../components/usertemplet.vue";

export default {
  data() {
    var validatePass1 = (rule, value, callback) => {
      if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        oldpass: "",
        pass: "",
        checkPass: ""
      },
      rules2: {
        oldpass: [
          { required: true, trigger: "blur", message: "原密码必须填写" }
        ],
        pass: [
          { required: true, trigger: "blur", message: "密码必须填写" },
          {
            min: 6,
            max: 12,
            message: "密码长度在 6 到 12 个字符",
            trigger: "blur"
          },
          { validator: validatePass1, trigger: "blur" }
        ],
        checkPass: [
          { required: true, trigger: "blur", message: "确认密码必须填写" },
          {
            min: 6,
            max: 12,
            message: "确认密码长度在 6 到 12 个字符",
            trigger: "blur"
          },
          { validator: validatePass1, trigger: "blur" }
        ]
      }
    };
  },
  components: {
    //注册组件
    LeftMenu,
    RightTop,
    RightBottom,
    Usertemplet
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post(
              "http://127.0.0.1:888/users/updatepwd",
              this.qs.stringify(this[formName])
            )
            .then(result => {
              if (result.data.isOk) {
                //添加成功
                this.$message({
                  message: result.data.msg,
                  type: "success"
                });
                this.$router.push("/login");
              } else {
                //添加失败
                this.$message.error(result.data.msg);
              }
            })
            .catch(error => {
              console.error("服务器错误", error);
            });
        } else {
          alert("× 您输入的信息有误!");
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













