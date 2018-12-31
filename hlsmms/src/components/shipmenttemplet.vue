<template>
  <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal">
    <el-menu-item index="/shiplist">
      <router-link to="/shiplist">销售明细</router-link>
    </el-menu-item>
    <el-menu-item index="/shipout">
      <router-link to="/shipout">商品出库</router-link>
    </el-menu-item>
    <el-menu-item index="/shipback">
      <router-link to="/shipback">商品退货</router-link>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
    
};
</script>

