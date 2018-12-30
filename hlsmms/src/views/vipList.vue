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
          <div class="text item" id="xian">
            <!-- 账号管理组件 -->
            <Viptemplet></Viptemplet>
            <!-- 账号管理下方内容 -->
            <el-tabs type="border-card">
              <el-row>
                <el-col :span="1">
                  <div class="h40">搜索：</div>
                </el-col>
                <el-col :span="4">
                  <el-input placeholder="请输入内容" v-model="input10" clearable></el-input>
                </el-col>
                <el-col :span="4">
                  <div class="h40r">会员名，会员卡，电话，手机</div>
                </el-col>
                <el-button type="success" round>查询</el-button>
              </el-row>

              <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column label="会员卡号">
                  <template slot-scope="scope">
                    <span>{{ scope.row.membershipCard }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="会员姓名">
                  <template slot-scope="scope">
                    <span>{{ scope.row.username }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="会员等级">
                  <template slot-scope="scope">
                    <span>{{ scope.row.grade }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="会员积分">
                  <template slot-scope="scope">
                    <span>{{ scope.row.integral }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="折扣">
                  <template slot-scope="scope">
                    <span>{{ scope.row.discount }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="手机号">
                  <template slot-scope="scope">
                    <span>{{ scope.row.phone }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="座机号">
                  <template slot-scope="scope">
                    <span>{{ scope.row.tel }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
                      <i class="el-icon-edit"></i> 编辑
                    </el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)"
                    >
                      <i class="el-icon-delete"></i> 删除
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
import Viptemplet from "../components/viptemplet.vue";

export default {
  data() {
    return {
      tableData: [
        {
          membershipCard: "12345678",
          username: "王小虎",
          grade: "铜牌会员",
          integral: "218",
          discount: "50%",
          phone: "18281112810",
          tel: "63888834"
        },
        {
          membershipCard: "10298756",
          username: "王大虎",
          grade: "铜牌会员",
          integral: "28",
          discount: "60%",
          phone: "18281112810",
          tel: "63888834"
        },
        {
          membershipCard: "12345678",
          username: "王刀虎",
          grade: "金牌会员",
          integral: "18",
          discount: "20%",
          phone: "18281112810",
          tel: "63888834"
        },
        {
          membershipCard: "87654321",
          username: "王龙虎",
          grade: "铜牌会员",
          integral: "8",
          discount: "70%",
          phone: "18281112810",
          tel: "63888834"
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
    Viptemplet
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













