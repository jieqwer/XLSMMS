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
            <h3>用户列表</h3>
          </div>
          <div class="text item">
            <!-- 账号管理组件 -->
            <Usertemplet></Usertemplet>
            <!-- 账号管理下方内容 -->
            <el-tabs type="border-card">
              <el-table :data="tableData" style="width: 100%">
                <el-table-column label="ID">
                  <template slot-scope="scope">
                    <span>{{ scope.row.userid }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="姓名">
                  <template slot-scope="scope">
                    <span>{{ scope.row.username }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="用户组">
                  <template slot-scope="scope">
                    <span>{{ scope.row.usergroup }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="日期">
                  <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span>{{ scope.row.addDate|formatDate}}</span>
                  </template>
                </el-table-column>

                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.row.userid)">
                      <i class="el-icon-edit"></i> 编辑
                    </el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row.userid)">
                      <i class="el-icon-delete"></i> 删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tabs>
          </div>
        </el-card>
      </el-main>
      <!-- 底部 -->
      <RightBottom></RightBottom>

      <el-dialog title="修改提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules1"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          label-position="right"
        >
          <el-form-item label="账号" prop="username">
            <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="userpwd">
            <el-input type="password" v-model="ruleForm.userpwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户组" prop="usergroup">
            <el-select v-model="ruleForm.usergroup" placeholder="请选择用户组">
              <el-option label="超级管理员" value="超级管理员"></el-option>
              <el-option label="普通管理员" value="普通管理员"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
        </span>
      </el-dialog>
    </el-container>
  </el-container>
</template>

<script>
//引入导航组件
import LeftMenu from "../components/leftMenu.vue";
import RightTop from "../components/rightTop.vue";
import RightBottom from "../components/rightBottom.vue";
import Usertemplet from "../components/usertemplet.vue";
import moment from "moment";

export default {
  data() {
    return {
      tableData: [
        {
          userid: "",
          username: "",
          usergroup: "",
          addDate: ""
        }
      ],
      dialogVisible: false,
      ruleForm: {
        username: "",
        userpwd: "",
        usergroup: ""
      },
      rules1: {
        username: [
          { required: true, trigger: "blur", message: "用户名必须填写" },
          {
            min: 5,
            max: 18,
            message: "用户名长度在 5 到 18 个字符",
            trigger: "blur"
          }
        ],
        userpwd: [
          { required: true, trigger: "blur", message: "密码必须填写" },
          {
            min: 6,
            max: 12,
            message: "密码长度在 6 到 12 个字符",
            trigger: "blur"
          }
        ],
        usergroup: [
          { required: true, trigger: "change", message: "请选择用户组" }
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
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    getusers() {
      //封装获取用户列表方法
      this.axios
        .get("http://172.16.4.178:888/users/getusers")
        .then(result => {
          // console.log(result.data);
          this.tableData = result.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post(
              "http://172.16.4.178:888/users/updateuser",
              this.qs.stringify(this[formName])
            )
            .then(result => {
              if (result.data.isOk) {
                //添加成功
                this.$message({
                  message: result.data.msg,
                  type: "success"
                });
                this.dialogVisible = false; //模态框显示
                this.getusers(); //刷新列表
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
    handleEdit(userid) {
      //数据回显
      this.axios
        .get("http://172.16.4.178:888/users/getuserbyid?id=" + userid)
        .then(oldresult => {
          let oldresults = oldresult.data[0];
          console.log(oldresult);
          
          this.dialogVisible = true; //模态框显示
          this.ruleForm = oldresults; //复赋值表单数据
        })
        .catch(error => {
          this.$message.error("出错了" + error.message);
        });
    },
    handleDelete(userid) {
      //删除数据
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .get("http://172.16.4.178:888/users/delusers?id=" + userid)
            .then(result => {
              let results = result.data;
              if (results.isOk) {
                this.$message({
                  message: results.msg,
                  type: "success"
                });
                this.getusers(); //调用获取用户方法
              } else {
                this.$message.error("出错了" + results.msg);
              }
            })
            .catch(error => {
              this.$message.error("出错了" + error.message);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      console.log(userid);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  },
  created() {
    //实例创建后的钩子
    this.getusers(); //调用获取用户方法
  },
  filters: {
    formatDate(olddate) {
      //过滤日期
      return moment(olddate).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>


<style>
/* scoped 作用域限定样式只在当前组件生效 */
</style>













