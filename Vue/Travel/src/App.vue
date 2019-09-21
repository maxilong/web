<template>
  <div id="app">
    <!-- 缓存路由不会重复执行  ,除了Detail -->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

</style>
