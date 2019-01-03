<template>
     <el-header>
        <div>
          <p>
            欢迎您
            <span v-text="username">admin</span>
          </p>
          <p>
            <a href>查看详细系统信息</a>
          </p>
        </div>
      </el-header>
</template>

<script>
export default {
    data() {
    return {
      username: ""
    };
  },
      created() {
    this.axios.defaults.withCredentials = true;
    // 发起ajax到后端路由获取cookie，cookie存在就放行，否则去登录页面
    this.axios
      .get("http://172.16.4.178:888/users/getCookie")
      .then(result => {
        // console.log("验证的结果", result);
        //如果登录成或者是访问的页面时登录页面就放行
        if (result.data.isOk) {
          this.username = result.data.username;
        }
      })
      .catch(err => {
        console.error("错误了!" + err.message);
      });
  }
}
</script>