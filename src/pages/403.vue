<template>
  <div class="page">
    <div class="error-code">403</div>
    <div class="tips">抱歉你暂无权限访问该页面</div>
  </div>
</template>

<script>
export default {
  name: '403'
};
</script>

<style scoped lang="less">
.page {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .error-code {
    font-size: 300px;
    line-height: 350px;
  }
  .tips {
    color: #999999;
    margin-bottom: 40px;
  }
  .action-area {
    width: 200px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
}
</style>
