<template>
  <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal">
    <el-menu-item index="/userlist">
      <router-link to="/userlist">账号管理</router-link>
    </el-menu-item>
    <el-menu-item index="/userlist">
      <router-link to="/useradd">添加账号</router-link>
    </el-menu-item>
    <el-menu-item index="/userlist">
      <router-link to="/pwdedit">修改密码</router-link>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
    
};
</script>

