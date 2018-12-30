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
            <h3>账号添加</h3>
          </div>
          <div class="text item">
            <!-- 账号管理组件 -->
            <Viptemplet></Viptemplet>
            <!-- 账号管理下方内容 -->
            <el-tabs type="border-card">
              <el-form
                :model="ruleForm"
                status-icon
                :rules="rules1"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
                size="mini"
              >
                <el-form-item label="真实姓名：" prop="username">
                  <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="会员卡号：" prop="membershipCard">
                  <el-input type="text" v-model="ruleForm.membershipCard" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="用户组：" prop="usergroup">
                  <el-select v-model="ruleForm.usergroup" placeholder="请选择用户组">
                    <el-option label="超级管理员" value="超级管理员"></el-option>
                    <el-option label="普通管理员" value="普通管理员"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="身份证号：" prop="idCard">
                  <el-input type="text" v-model="ruleForm.idCard" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="用户状态：" prop="state">
                  <el-radio v-model="ruleForm.state" label="1">启用</el-radio>
                  <el-radio v-model="ruleForm.state" label="2">禁用</el-radio>
                </el-form-item>
                <el-form-item label="手机号码：" prop="phone">
                  <el-input type="text" v-model="ruleForm.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="座机号码：" prop="tel">
                  <el-input type="text" v-model="ruleForm.tel" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="email" label="邮箱地址：">
                  <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item label="地区选择：" prop="address">
                  <el-col :span="11">
                    <el-select v-model="ruleForm.address.province" placeholder="--请选择省份--">
                      <el-option label="超级管理员" value="超级管理员"></el-option>
                      <el-option label="普通管理员" value="普通管理员"></el-option>
                    </el-select>
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11">
                    <el-select v-model="ruleForm.address.city" placeholder="--请选择城市--">
                      <el-option label="超级管理员" value="超级管理员"></el-option>
                      <el-option label="普通管理员" value="普通管理员"></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
                <el-form-item label="详细地址：" prop="detailedAddress">
                  <el-input type="text" v-model="ruleForm.detailedAddress" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮政编码：" prop="zipCode">
                  <el-input type="text" v-model="ruleForm.zipCode" autocomplete="off"></el-input>
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
import Viptemplet from "../components/viptemplet.vue";

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
        username: "",
        membershipCard: "",
        usergroup: "",
        idCard: "",
        state: "1",
        phone: "",
        tel: "",
        email: "",
        address: {
          province: "",
          city: ""
        },
        detailedAddress: "",
        zipCode: ""
      },
      rules1: {
        username: [
          { required: true, trigger: "blur", message: "真实姓名必须填写" },
          {
            min: 2,
            max: 4,
            message: "用户名长度在 2 到 4个字符",
            trigger: "blur"
          }
        ],
        usergroup: [
          { required: true, trigger: "change", message: "请选择用户组" }
        ],
        membershipCard: [
          { required: true, trigger: "blur", message: "会员卡号必须填写" },
          {
            min: 6,
            max: 10,
            message: "用户名长度在 6 到 10个字符",
            trigger: "blur"
          }
        ],
        idCard: [
          { required: true, trigger: "blur", message: "身份证号码必须填写" },
          {
            min: 18,
            max: 18,
            message: "身份证号码为18位",
            trigger: "blur"
          }
        ],
        state: [
          { required: true, message: "请选择用户状态", trigger: "change" }
        ],
        phone: [
          { required: true, trigger: "blur", message: "手机号码必须填写" },
          {
            min: 11,
            max: 11,
            message: "手机号码为11位",
            trigger: "blur"
          }
        ],
        tel: [
          { required: true, trigger: "blur", message: "座机号码必须填写" },
          {
            min: 11,
            max: 11,
            message: "座机号码为11位",
            trigger: "blur"
          }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        address: [{ validator: validateaddress, trigger: "blur" }],
        detailedAddress: [
          { required: true, trigger: "blur", message: "详细地址必须填写" }
        ],
        zipCode: [{ required: true, trigger: "blur", message: "邮编必须填写" }]
      }
    };
  },
  components: {
    //注册组件
    LeftMenu,
    RightTop,
    RightBottom,
    Viptemplet
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













