<template>
  <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal">
    <el-menu-item index="/viplist">
      <router-link to="/viplist">账号管理</router-link>
    </el-menu-item>
    <el-menu-item index="/vipadd">
      <router-link to="/vipadd">添加账号</router-link>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
    
};
</script>

