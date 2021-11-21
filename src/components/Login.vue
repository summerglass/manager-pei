<script>
export default {
  name: 'login',
  methods: {
    goHome () {
      this.$router.push('/welcome')
    },
  },
  mounted () {
    console.log('1111')
    this.$storage.setItem("user", { name: "张三", age: 18 })
  }
}
</script>

<template>
  <div>
    <div>欢迎来到登陆界面</div>
    <button @click="goHome">去首页</button>
  </div>
</template>

<style scoped>
login a {
  color: #42b983;
}
</style>
