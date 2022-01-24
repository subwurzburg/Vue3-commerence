<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar w/ text</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/dashboard/products" class="nav-link">產品</router-link>
          </li>
          <li class="nav-item">
             <router-link to="/dashboard/orders" class="nav-link">訂單</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">優惠券</a>
          </li>
        </ul>
        <span class="navbar-text" @click.prevent="logout">
          logout
        </span>
      </div>
    </div>
  </nav>
</template>

<script>
import { loginApi } from '../assets/api/loginApi'
export default ({
  data () {
    return {
    }
  },
  methods: {
    logout () {
      loginApi.logout().then((res) => {
        if (res.data.success) {
          this.$router.push('/login')
        }
      })
    }
  }
})
</script>
