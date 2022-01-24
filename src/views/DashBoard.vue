<template>
  <loading :active="isLoading">
    <div class="loadingio-spinner-ripple-wu44vrvts1">
      <div class="ldio-2gn8nvj94zp">
        <div></div>
        <div></div>
      </div>
    </div>
  </loading>
  <Navbar></Navbar>
  <router-view/>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import { loginApi } from '../assets/api/loginApi'
export default ({
  data () {
    return {
      isLoading: false
    }
  },
  components: {
    Navbar
  },
  created () {
    this.isLoading = true
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')
    loginApi.checkLoginStatus(token).then((res) => {
      if (!res.data.success) {
        this.$router.push('/login')
      }
    })
    this.isLoading = false
  }
})
</script>
