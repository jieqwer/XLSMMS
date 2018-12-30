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
import Usertemplet from "../components/usertemplet.vue";
import moment from "moment"

export default {
  data() {
    return {
      tableData: [
        {
          userid:"",
          username:"",
          usergroup:"",
          addDate:"",
        }
      ]
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
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
  created() {
    this.axios
      .get("http://127.0.0.1:888/users/getusers")
      .then(result => {
        console.log(result.data);
        this.tableData=result.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  filters:{
    formatDate(olddate){
        return moment(olddate).format('YYYY-MM-DD HH:mm:ss' );
    }
  }
};
</script>


<style>
/* scoped 作用域限定样式只在当前组件生效 */
</style>













