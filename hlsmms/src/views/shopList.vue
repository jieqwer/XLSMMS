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
            <h3>商品列表</h3>
          </div>
          <div class="text item" id="xian">
            <!-- 账号管理组件 -->
            <Shoptemplet></Shoptemplet>
            <!-- 账号管理下方内容 -->
            <el-tabs type="border-card">
              <el-form :inline="true" :model="formSearch" class="demo-form-inline">
                <el-row>
                  <el-col :span="3">
                    <el-select v-model="value" clearable placeholder="------------选择分类----------">
                      <el-option
                        v-for="item in formSearch.classname"
                        :key="item.cid"
                        :label="item.classname"
                        :value="item.classname"
                      ></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="1">
                    <div class="h40">关键字：</div>
                  </el-col>
                  <el-col :span="4">
                    <el-input placeholder="请输入内容" v-model="formSearch.keywords" clearable></el-input>
                  </el-col>
                  <el-col :span="3">
                    <div class="h40r">（商品名称，条形码）</div>
                  </el-col>
                  <el-button type="success" @click="onSearch()">查询</el-button>
                </el-row>
              </el-form>

              <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column label="商品id">
                  <template slot-scope="scope">
                    <span>{{ scope.row.pid }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="商品条形码">
                  <template slot-scope="scope">
                    <span>{{ scope.row.bar }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="商品名称">
                  <template slot-scope="scope">
                    <span>{{ scope.row.shopname }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="所属分类">
                  <template slot-scope="scope">
                    <span>{{ scope.row.shopclass }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="售价（元）">
                  <template slot-scope="scope">
                    <span>{{ scope.row.sellprice }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="促销价（元）">
                  <template slot-scope="scope">
                    <span>{{ scope.row.sellprice*0.9}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="市场价（元）">
                  <template slot-scope="scope">
                    <span>{{ scope.row.bazaarprice }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="库存">
                  <template slot-scope="scope">
                    <span>{{ scope.row.inventory }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="库存总额（元）">
                  <template slot-scope="scope">
                    <span>{{ scope.row.sellprice*scope.row.inventory }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="销售总额（元）">
                  <template slot-scope="scope">
                    <span>{{ scope.row.sellprice*scope.row.inventory }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="管理">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.row.pid)">
                      <i class="el-icon-edit"></i>
                    </el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row.pid)">
                      <i class="el-icon-delete"></i>
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="block">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[1,3,5,6,10,50]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total"
                ></el-pagination>
              </div>
            </el-tabs>
          </div>
        </el-card>
      </el-main>
      <!-- 底部 -->
      <RightBottom></RightBottom>

      <el-dialog
        title="修改提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
        id="shopinpt"
      >
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
            <el-select v-model="ruleForm.shopclass" clearable placeholder="------选择分类-----">
              <el-option
                v-for="item in formSearch.classname"
                :key="item.cid"
                :label="item.classname"
                :value="item.classname"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="条形码：" prop="bar">
            <el-input type="text" v-model="ruleForm.bar" autocomplete="off"></el-input>
            <el-button type="success" size="mini" @click="getcode()" plain>生成条形码</el-button>
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
import Shoptemplet from "../components/shoptemplet.vue";

export default {
  data() {
    return {
      formSearch: {
        classname: [
          {
            cid: "",
            classname: ""
          }
        ],
        keywords: ""
      },
      value: "",

      tableData: [
        {
          pid: "",
          bar: "",
          shopname: "",
          shopclass: "",
          sellprice: "",
          bazaarprice: "",
          inventory: ""
        }
      ],
      dialogVisible: false,
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
      input10: "",
      currentPage: 1, //当前在那页，默认值
      pageSize: 6, //每页大小，默认值
      total: 0 //总记录数量
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
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleEdit(pid) {
      //数据回显
      this.axios
        .get("http://127.0.0.1:888/users/getshopbyid?id=" + pid)
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
    handleDelete(pid) {
      //删除数据
      this.$confirm("此操作将永久删除该商品信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .get("http://127.0.0.1:888/users/delshops?id=" + pid)
            .then(result => {
              let results = result.data;
              if (results.isOk) {
                this.$message({
                  message: results.msg,
                  type: "success"
                });
                this.getshops(); //调用获取用户方法
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post(
              "http://127.0.0.1:888/users/updateshop",
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
                this.getshops(); //刷新列表
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
    //改变每页大小的方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      //把改变后的值赋值给数据属性
      this.pageSize = val;
      this.getshops();
    },
    //改变当前页的方法
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      //把改变后的值赋值给数据属性
      this.currentPage = val;
      this.getshops();
    },
    getshops() {
      //封装获取商品列表方法
      this.axios
        .get(
          //传入分页参数: pageSize每页大小，当前在第几页currentPage
          `http://127.0.0.1:888/users/getshops?classname=${
            this.value
          }&keywords=${this.formSearch.keywords}&pagesize=${
            this.pageSize
          }&currentpage=${this.currentPage}`
        )
        .then(result => {
          //把查询到的商品信息的数组对象赋值给表格数据属性
          //{"total":total,"goodsArray":goodsArray}
          this.tableData = result.data.goodsArray;

          //把后端返回的total总记录数赋值给total属性
          this.total = result.data.total;
        })
        .catch(err => {
          console.error(err.message);
        });
    },
    getclass() {
      //封装获取商品列表方法
      this.axios
        .get("http://127.0.0.1:888/users/getclass")
        .then(result => {
          this.formSearch.classname = result.data;
          console.log(result.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    getcode() {
      this.ruleForm.bar = new Date().getTime();
    },
    updatePrice() {
      //进价、售价、市场价关系
      this.ruleForm.bazaarprice = this.ruleForm.inprice * 5;
      this.ruleForm.sellprice = this.ruleForm.bazaarprice * 0.9;
    },
    onSearch() {
      //查询方法
      //1）前端——点击搜索按钮就把 商品分类和关键词 发送到后端api
      // console.log(this.value)
      this.getshops();
    }
  },
  created() {
    //实例创建后的钩子
    this.getshops(); //调用获取用户方法
    this.getclass(); //调用获取分类方法
  },
  filters: {
    pricec(val) {
      return val * 0.9;
    }
  }
};
</script>


<style>
/* scoped 作用域限定样式只在当前组件生效 */
</style>













