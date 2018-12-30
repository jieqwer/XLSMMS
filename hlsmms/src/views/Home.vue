<template>
  <el-container id='outBox'>
    <!-- 左侧 -->
    <LeftMenu></LeftMenu>
    <!--  右侧 -->
    <el-container class="content" id="content"> 
      <!--  右上 -->
      <RightTop></RightTop>
      <!-- 内容 -->
      <el-main>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h3>系统信息</h3>
          </div>
          <div class="text item">
            <el-alert title="商品总数：5 。已销售总金额：890.00 。库存商品总价：1235.82 。" type="info" show-icon></el-alert>
            <el-alert title="导入数据" type="info" show-icon></el-alert>

            <el-row :gutter="40">
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <h3>销售排行</h3>
                    </div>
                    <div class="text item">
                      <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column prop="shopname" label="商品名称"></el-table-column>
                        <el-table-column prop="num" label="销量"></el-table-column>
                      </el-table>
                    </div>
                  </el-card>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <h3>缺货商品</h3>
                    </div>
                    <div class="text item">
                      <div class="text item">
                        <el-table :data="tableData1" style="width: 100%">
                          <el-table-column label="商品名称">
                            <template slot-scope="scope">
                              <span style="margin-left: 10px">{{ scope.row.shopname }}</span>
                            </template>
                          </el-table-column>
                          <el-table-column label="库存">
                            <template slot-scope="scope">
                              <span style="margin-left: 10px">{{ scope.row.num }}</span>
                            </template>
                          </el-table-column>
                          <el-table-column label="操作">
                            <template slot-scope="scope">
                              <el-button
                                @click.native.prevent="addRow(scope.$index, tableData1)"
                                type="text"
                                size="small"
                              >入库</el-button>
                            </template>
                          </el-table-column>
                        </el-table>
                      </div>
                    </div>
                  </el-card>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-main>
      <!-- 版权 -->
      <RightBottom></RightBottom>
    </el-container>
  </el-container>
</template>

<script>
import LeftMenu from "../components/leftMenu.vue";
import RightTop from "../components/rightTop.vue";
import RightBottom from "../components/rightBottom.vue";
export default {
  name: "home",
  data() {
    return {
      tableData: [
        { shopname: "测试商品1", num: 20 },
        { shopname: "测试商品2", num: 30 },
        { shopname: "测试商品3", num: 40 },
        { shopname: "测试商品4", num: 50 }
      ],
      tableData1: [{ shopname: "我的优乐美", num: 20 }]
    };
  },
  components: {
    LeftMenu,
    RightTop,
    RightBottom
  }
};
</script>

<style>

</style>
