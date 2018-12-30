<template>
  <el-container class="_box">
    <!-- 左侧 -->
    <LeftMenu></LeftMenu>
    <!--  右侧 -->
    <el-container class="content"> 
      <!--  右上 -->
      <RightTop></RightTop>
      <!-- 内容 -->
      <el-main>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h3>密码修改</h3>
          </div>
          <div class="text item">
        
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
