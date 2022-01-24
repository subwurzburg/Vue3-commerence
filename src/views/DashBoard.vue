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
  <div class="container-fluid mt-3 position-relative">
    <ToastMessage></ToastMessage>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import { loginApi } from '../assets/api/loginApi'
import emitter from '../assets/methods/emitter'
import ToastMessage from '../components/ToastMessage.vue'
export default ({
  data () {
    return {
      isLoading: false
    }
  },
  components: {
    Navbar,
    ToastMessage
  },
  // Provide 把父層的東西給子層(所有子層)、接收用inject接收
  provide () {
    return {
      emitter
    }
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
