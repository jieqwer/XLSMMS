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
            <h3>商品出库</h3>
          </div>
          <div class="text item" id="xian">
            <!-- 账号管理组件 -->
            <Shipmenttemplet></Shipmenttemplet>
            <!-- 账号管理下方内容 -->
            <el-tabs type="border-card" id="outinpt">
              <el-row>
                <el-form
                  :model="ruleForm"
                  status-icon
                  :rules="rules1"
                  ref="ruleForm"
                  label-width="100px"
                  class="demo-ruleForm"
                  label-position="top"
                  size="small"
                >
                  <el-form-item label="商品条形码：" prop="bar">
                    <el-input type="text" v-model="ruleForm.bar" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="数量：" prop="num">
                    <el-input type="text" v-model="ruleForm.num" autocomplete="off"></el-input>计算商品重量为千克
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">加入订单</el-button>
                    <el-button @click="resetForm('ruleForm')">重新出货</el-button>
                  </el-form-item>
                </el-form>
              </el-row>
              <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column label="名称">
                  <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="数量">
                  <template slot-scope="scope">
                    <span>{{ scope.row.num }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="单价">
                  <template slot-scope="scope">
                    <span>{{ scope.row.danprice }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="总价（元）">
                  <template slot-scope="scope">
                    <span>{{ scope.row.allprice }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="优惠总价（元）">
                  <template slot-scope="scope">
                    <span>{{ scope.row.discountsprice }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="管理">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
                      <i class="el-icon-edit"></i>
                    </el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)"
                    >
                      <i class="el-icon-delete"></i>
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="block font14">
                总价：0元，优惠：0元。
                <span class="cred">小计：0元</span>
              </div>
              <el-form
                :model="ruleForm1"
                status-icon
                :rules="rules2"
                ref="ruleForm1"
                label-width="100px"
                class="demo-ruleForm"
                label-position="top"
              >
                <el-form-item label="会员卡号：" prop="vipnum">
                  <el-input type="text" v-model="ruleForm1.vipnum" autocomplete="off"></el-input>
                  <p>填写会员卡卡号</p>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm1')">确认提交</el-button>
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
import Shipmenttemplet from "../components/shipmenttemplet.vue";

export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      tableData: [
        {
          name: "优乐美",
          num: "2",
          danprice: "2.00",
          allprice: "4.00",
          discountsprice: "0.00"
        }
      ],
      ruleForm: {
        bar: "",
        num: ""
      },
      ruleForm1: {
        vipnum: ""
      },
      rules1: {
        bar: [{ required: true, trigger: "blur", message: "条形码必填" }],
        num: [{ required: true, trigger: "blur", message: "数量必填" }]
      },
      rules2: {
        vipnum: [{ required: true, trigger: "blur", message: "会员卡号必填" }]
      },
      input10: "",
      currentPage4: 4
    };
  },
  components: {
    //注册组件
    LeftMenu,
    RightTop,
    RightBottom,
    Shipmenttemplet
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
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













