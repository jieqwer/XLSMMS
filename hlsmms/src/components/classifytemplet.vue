<template>
  <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal">
    <el-menu-item index="/classlist">
      <router-link to="/classlist">分类管理</router-link>
    </el-menu-item>
    <el-menu-item index="/classadd">
      <router-link to="/classadd">添加分类</router-link>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
    
};
</script>

