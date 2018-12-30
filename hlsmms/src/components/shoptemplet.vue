<template>
  <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal">
    <el-menu-item index="/shopList">
      <router-link to="/shopList">商品管理</router-link>
    </el-menu-item>
    <el-menu-item index="/shopadd">
      <router-link to="/shopadd">添加商品</router-link>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
    
};
</script>

