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
            <h3>库存管理</h3>
          </div>
          <div class="text item" id="xian">
            <!-- 账号管理组件 -->
            <Inventorytemplet></Inventorytemplet>
            <!-- 账号管理下方内容 -->
            <el-tabs type="border-card">
              <el-row>
                <el-col :span="3">
                  <el-select v-model="value" placeholder="------------选择分类----------">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="1">
                  <div class="h40">关键字：</div>
                </el-col>
                <el-col :span="4">
                  <el-input placeholder="请输入内容" v-model="input10" clearable></el-input>
                </el-col>
                <el-col :span="3">
                  <div class="h40r">（商品名称，条形码）</div>
                </el-col>
                <el-button type="success">查询</el-button>
              </el-row>

              <el-table :data="tableData" stripe style="width: 100%">
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
                <el-table-column label="进价（元）">
                  <template slot-scope="scope">
                    <span>{{ scope.row.sellprice }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="入库">
                  <template slot-scope="scope">
                    <span>{{ scope.row.inventory }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="库存">
                  <template slot-scope="scope">
                    <span>{{ scope.row.inventorall }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="已售">
                  <template slot-scope="scope">
                    <span>{{ scope.row.marketall }}</span>
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
import Inventorytemplet from "../components/inventorytemplet.vue";

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
          bar: "12345678",
          shopname: "我的优乐美",
          sellprice: "2.00",
          inventory: "0（缺）",
          inventorall: "10",
          marketall: "20"
        },
        {
          bar: "82655678",
          shopname: "我的优乐美1",
          sellprice: "6.00",
          inventory: "5）",
          inventorall: "10",
          marketall: "5"
        }
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
    Inventorytemplet
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













