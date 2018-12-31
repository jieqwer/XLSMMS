<template>
  <div id="loginbox">
    <!-- 卡片组件： 登录的外框 -->
    <el-card class="box-card" id="login">
      <div slot="header" class="clearfix">
        <h2 class>用户登录</h2>
      </div>
      <div class="text item">
        <!-- 表单组件：登录的表单 -->
        <el-form
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="username">
            <el-input type="text" v-model="ruleForm2.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
// 暴露一个模块： 登录组件
export default {
  data() {
    return {
      ruleForm2: {
        pass: "",
        username: ""
      },
      rules2: {
        username: [
          //required: true 必填     trigger: 'blur' 失去焦点的事件触发     message: "出错信息"
          { required: true, trigger: "blur", message: "用户名必须填写" },
          //min: 6 最小长度   max: 18 最大长度
          {
            min: 5,
            max: 18,
            message: "用户名长度在 5 到 18 个字符",
            trigger: "blur"
          }
        ],
        pass: [
          { required: true, trigger: "blur", message: "密码必须填写" },
          {
            min: 6,
            max: 12,
            message: "密码长度在 6 到 12 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    //提交表单的方法
    submitForm(formName) {
      //调用组件的验证方法提交表单是验证
      this.$refs[formName].validate(valid => {
        //valid参数表示验证的结果，true表示验证通过，false验证失败
        if (valid) {
          this.axios.defaults.withCredentials = true;
          this.axios
            .post(
              "http://127.0.0.1:888/users/login",
              this.qs.stringify(this[formName])
            )
            .then(result => {
              if (result.data.isOk) {
                //添加成功
                this.$message({
                  message: result.data.msg,
                  type: "success"
                });
                setTimeout(() => {
                  this.$router.push("/");
                }, 100);
              } else {
                //添加失败
                this.$message.error(result.data.msg);
              }
            })
            .catch(error => {
              this.$message.error("服务器错误:" + error.message);
            });
        } else {
          alert("× 信息不完整，登录失败!");
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
#loginbox {
  background: url("../assets/img/webwxgetmsgimg.jpg") no-repeat 100%;
}
.img1 {
  width: 100%;
  position: fixed;
  height: 1080px;
}
#loginbox:after {
  content: "";
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: inherit;
  filter: blur(10px);
  z-index: 1;
}
#login {
  width: 452px;
  height: 310px;
  /* 让盒子水平和垂直绝对居中 */
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 5;
}

#login .el-card__body {
  padding: 20px !important;
}
.el-form-item__label {
  text-align: center !important;
}
</style>


