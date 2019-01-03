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
            <h3>进货数据统计</h3>
          </div>
          <div class="text item">
            <el-tabs type="border-card">
              <!-- 显示echarts报表的dom盒子 -->
              <div id="main" style="width: 90%;height:420px;"></div>
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
//引入echarts
import echarts from "echarts";
export default {
  data() {
    return {};
  },
  components: {
    //注册组件
    LeftMenu,
    RightTop,
    RightBottom
  },
  mounted() {
    // 4-1. 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));

    // 4-2. 指定图表的配置项和数据
    var option = {
       color: ['#3ed'],
      //标题
      title: {
        text: "商品销量报表"
      },
      //工具提示
      tooltip: {},
      //工具箱
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      //图例
      legend: {
        data: ["数量"]
      },
      //X轴数据
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子", "零食"]
      },
      //Y轴数据
      yAxis: {},
      series: [
        {
          name: "数量",
          type: "line",
          data: [5, 20, 36, 10, 10, 20, 120]
        }
      ]
    };

    // 4-3. 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }
};
</script>


<style>
/* scoped 作用域限定样式只在当前组件生效 */
</style>













