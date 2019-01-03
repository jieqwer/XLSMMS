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
            <h3>分类列表</h3>
          </div>
          <div class="text item">
            <!-- 账号管理组件 -->
            <Classtemplet></Classtemplet>
            <!-- 账号管理下方内容 -->
            <el-tabs type="border-card">
              <el-table :data="tableData" style="width: 100%">
                <el-table-column label="父级分类名称">
                  <template slot-scope="scope">
                    <span>{{ scope.row.tid }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="子分类名称">
                  <template slot-scope="scope">
                    <span>{{ scope.row.classname}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="管理">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.row.cid)">
                      <i class="el-icon-edit"></i> 编辑
                    </el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row.cid)">
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
          label-position="top"
        >
          <el-form-item label="所属分类：" prop="tid">
            <el-select v-model="ruleForm.tid" placeholder="--顶级分类--">
              <el-option
                v-for="item in options"
                :key="item.tid"
                :label="item.tclassname"
                :value="item.tclassname"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类名称：" prop="classname">
            <el-input type="text" v-model="ruleForm.classname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="状态：" prop="cstatus">
            <el-radio v-model="ruleForm.cstatus" label="1">启用</el-radio>
            <el-radio v-model="ruleForm.cstatus" label="0">禁用</el-radio>
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
import Classtemplet from "../components/classifytemplet.vue";

export default {
  data() {
    return {
      tableData: [
        {
          classname: "",
          tid: ""
        }
      ],
      dialogVisible: false,
      ruleForm: {
        classname: "",
        tid: "",
        cstatus: "1"
      },
      rules1: {
        classname: [
          { required: true, trigger: "blur", message: "分类名称必须填写" }
        ],
        tid: [{ required: true, trigger: "change", message: "请选择父级分类" }],
        cstatus: [
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
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleEdit(cid) {
      //数据回显
      this.axios
        .get("http://172.16.4.178:888/users/getclassbyid?id=" + cid)
        .then(oldresult => {
          let oldresults = oldresult.data[0];
          console.log(oldresult);
          this.dialogVisible = true; //模态框显示
          this.ruleForm = oldresults; //复赋值表单数据
          this.gettclass();
        })
        .catch(error => {
          this.$message.error("出错了" + error.message);
        });
    },
    handleDelete(cid) {
      //删除子分类
      //删除数据
      this.$confirm("此操作将永久删除该商品信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .get("http://172.16.4.178:888/users/delclasss?id=" + cid)
            .then(result => {
              let results = result.data;
              if (results.isOk) {
                this.$message({
                  message: results.msg,
                  type: "success"
                });
                this.getclasslist(); //调用获取用户方法
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
    },
    getclasslist() {
      //封装获取商品列表方法
      this.axios
        .get("http://172.16.4.178:888/users/getclasslist")
        .then(result => {
          this.tableData = result.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    gettclass() {
      //封装获取商品列表方法 排除禁用
      this.axios
        .get("http://172.16.4.178:888/users/gettclass")
        .then(result => {
          this.options = result.data;
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
              "http://172.16.4.178:888/users/updateclass",
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
                this.getclasslist(); //刷新列表
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
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  },
  created() {
    this.getclasslist();
  }
};
</script>


<style>
/* scoped 作用域限定样式只在当前组件生效 */
</style>













