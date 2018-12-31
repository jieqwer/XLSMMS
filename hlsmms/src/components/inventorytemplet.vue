<template>
  <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal">
    <el-menu-item index="/inventorylist">
      <router-link to="/inventorylist">库存情况</router-link>
    </el-menu-item>
    <el-menu-item index="/inventoryadd">
      <router-link to="/inventoryadd">添加库存</router-link>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
    
};
</script>

