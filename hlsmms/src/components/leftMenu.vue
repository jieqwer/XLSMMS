<template>
  <el-aside width="230px">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      text-color="#fff"
      active-text-color="#ffd04b"
      :unique-opened="isOpened"
    >
      <div class="_letfTop">
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
     
        </el-dialog>
        <p>华联超市管理系统</p>
        <p>
          你好，
          <span>admin</span>
          <a id="portrait">
            <img src="../../../hlsmmsserver/upload/1.jpg" @click="dialogVisible = true" alt>
          </a>
        </p>
        <p>
          <router-link to="/">管理首页</router-link>|
          <a @click="loginOut()">退出系统</a>
        </p>
      </div>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>分类管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/classlist">
            <router-link to="/classlist">分类管理</router-link>
          </el-menu-item>
          <el-menu-item index="/classadd">
            <router-link to="/classadd">添加分类</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-goods"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/shoplist">
            <router-link to="/shoplist">商品管理</router-link>
          </el-menu-item>
          <el-menu-item index="/shopadd">
            <router-link to="/shopadd">添加商品</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-sold-out"></i>
          <span>进货管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/inventorylist">
            <router-link to="/inventorylist">库存情况</router-link>
          </el-menu-item>
          <el-menu-item index="/inventoryadd">
            <router-link to="/inventoryadd">添加库存</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-rank"></i>
          <span>出货管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/shiplist">
            <router-link to="/shiplist">销售列表</router-link>
          </el-menu-item>
          <el-menu-item index="/shipout">
            <router-link to="/shipout">商品出库</router-link>
          </el-menu-item>
          <el-menu-item index="/shipback">
            <router-link to="/shipback">商品退货</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-edit-outline"></i>
          <span>统计管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/statisticsx">
            <router-link to="/statisticsx">销售统计</router-link>
          </el-menu-item>
          <el-menu-item index="/statisticsj">
            <router-link to="/statisticsj">进货统计</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">
          <i class="el-icon-star-off"></i>
          <span>账号管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/userlist">
            <router-link to="/userlist">账号管理</router-link>
          </el-menu-item>
          <el-menu-item index="/useradd">
            <router-link to="/useradd">添加账号</router-link>
          </el-menu-item>
          <el-menu-item index="/pwdedit">
            <router-link to="/pwdedit">修改密码</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="7">
        <template slot="title">
          <i class="el-icon-star-on"></i>
          <span>会员管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/viplist">
            <router-link to="/viplist">账号管理</router-link>
          </el-menu-item>
          <el-menu-item index="/vipadd">
            <router-link to="/vipadd">添加账号</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="8">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/">
            <router-link to="/">系统信息</router-link>
          </el-menu-item>
          <el-menu-item index="8-2">
            <router-link to="/">系统配置</router-link>
          </el-menu-item>
          <el-menu-item index="8-3">
            <router-link to="/">权限管理</router-link>
          </el-menu-item>
          <el-menu-item index="8-5">
            <router-link to="/">添加管理组</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>


<script>
export default {
  data() {
    return {
      isOpened: true,
      dialogVisible: false,
      dialogVisible1: false,
      imageUrl: "",
      dialogImageUrl: ""
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    addRow() {},
    loginOut() {
      //发起ajax到后端路由去执行清除cookie的操作
      this.axios
        .get("http://127.0.0.1:888/users/loginOut")
        .then(result => {
          //根据是否清除成功处理业务逻辑
          if (result.data.isOk) {
            this.$message({
              message: "退出成功！ 欢迎下次登录!",
              type: "success"
            });
            this.$router.push("/login");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  }
};
</script>

