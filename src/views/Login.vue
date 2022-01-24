<template>
  <loading :active="isLoading">
    <div class="loadingio-spinner-ripple-wu44vrvts1">
      <div class="ldio-2gn8nvj94zp">
        <div></div>
        <div></div>
      </div>
    </div>
  </loading>
  <div class="container mt-5">
    <form class="row justify-content-center" @submit.prevent="SignIn">
      <div class="col-md-6">
        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
        <div class="mb-2">
          <label for="inputEmail" class="sr-only">Email address</label>
          <input
            type="email"
            id="inputEmail"
            class="form-control"
            placeholder="Email address"
            required
            autofocus
            v-model="user.username"
          />
        </div>
        <div class="mb-2">
          <label for="inputPassword" class="sr-only">Password</label>
          <input
            type="password"
            id="inputPassword"
            class="form-control"
            placeholder="Password"
            required
            v-model="user.password"
          />
        </div>

        <div class="text-end mt-4">
          <button class="btn btn-lg btn-primary btn-block" type="submit">
            登入
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { loginApi } from '../assets/api/loginApi'
export default {
  data () {
    return {
      user: {
        username: null,
        password: null
      },
      isLoading: false
    }
  },
  methods: {
    SignIn () {
      this.isLoading = true
      loginApi.login(this.user).then((res) => {
        if (res.data.success) {
          const { token, expired } = res.data
          document.cookie = `token = ${token}; expires =${new Date(expired)}`
          this.$router.push('/dashboard/products')
        }
      })
      this.isLoading = false
    }
  }
}
</script>
