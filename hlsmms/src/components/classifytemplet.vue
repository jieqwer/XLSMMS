<template>
  <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal">
    <el-menu-item index="/classList">
      <router-link to="/classList">分类管理</router-link>
    </el-menu-item>
    <el-menu-item index="/classAdd">
      <router-link to="/classAdd">添加分类</router-link>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
    
};
</script>

