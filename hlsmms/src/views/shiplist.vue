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
            <h3>销售明细</h3>
          </div>
          <div class="text item" id="xian">
            <!-- 账号管理组件 -->
            <Shipmenttemplet></Shipmenttemplet>
            <!-- 账号管理下方内容 -->
            <el-tabs type="border-card">
              <el-row>
                <el-col :sapn="24">
                  <div class="block mb10">
                    <span class="demonstration">开始时间 ：</span>
                    <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
                    <span class="demonstration ml10">结束时间：</span>
                    <el-date-picker  v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
                  </div>
                </el-col>
                <el-col :span="1">
                  <div class="h40">关键字：</div>
                </el-col>
                <el-col :span="4">
                  <el-input placeholder="请输入内容" v-model="input10" clearable></el-input>
                </el-col>
                <el-col :span="5">
                  <div class="h40r">（商品名称,订单号，用户名称，会员卡号）</div>
                </el-col>
                <el-button type="success">查询</el-button>
              </el-row>

              <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column label="订单号">
                  <template slot-scope="scope">
                    <span>{{ scope.row.orderid }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="名称">
                  <template slot-scope="scope">
                    <span>{{ scope.row.shopname }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="数量">
                  <template slot-scope="scope">
                    <span>{{ scope.row.shopnum }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="实际售价售价（元）">
                  <template slot-scope="scope">
                    <span>{{ scope.row.sellprice }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="优惠（促销/会员）">
                  <template slot-scope="scope">
                    <span>{{ scope.row.salesprice }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="退款">
                  <template slot-scope="scope">
                    <span>{{ scope.row.bazaarprice }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="销售时间">
                  <template slot-scope="scope">
                    <span>{{ scope.row.datatime }}</span>
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
              <div class="block">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage4"
                  :page-sizes="[100, 200, 300, 400]"
                  :page-size="100"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="1000"
                ></el-pagination>
              </div>
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
      value1: "",
      value2: "",
      tableData: [
        {
          orderid: "12345678",
          shopname: "我的优乐美",
          shopnum: "3",
          sellprice: "6.00",
          salesprice: "2.00元/无",
          bazaarprice: "无退款",
          datatime: "2018-12-31",
        },
        {
          orderid: "23662135",
          shopname: "你的优乐美",
          shopnum: "4",
          sellprice: "4.00",
          salesprice: "1.00元/无",
          bazaarprice: "无/无",
          datatime: "2018-12-30",
        },
      ],
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>


<style>
/* scoped 作用域限定样式只在当前组件生效 */
</style>













