<template>
  <Navbar></Navbar>
  <router-view/>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import { loginApi } from '../assets/api/loginApi'
export default ({
  components: {
    Navbar
  },
  created () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')
    loginApi.checkLoginStatus(token).then((res) => {
      if (!res.data.success) {
        this.$router.push('/login')
      }
    })
  }
})
</script>
