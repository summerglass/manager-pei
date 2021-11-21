<script>
export default {
  name: 'welcome',
  methods: {},
}
</script>

<template>
  <div>
    <div><h1>欢迎来到主页面</h1></div>
    <router-link to="/login">去登陆</router-link>
  </div>
</template>

<style scoped>
login a {
  color: #42b983;
}
</style>
