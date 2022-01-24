<template>
  <loading :active="isLoading">
    <div class="loadingio-spinner-ripple-wu44vrvts1">
      <div class="ldio-2gn8nvj94zp">
        <div></div>
        <div></div>
      </div>
    </div>
  </loading>
  <div class="text-end">
      <button class="btn btn-primary" type="button" @click="openModal(true)">
        增加產品
      </button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td>{{item.category}}</td>
        <td>{{item.title}}</td>
        <td class="text-right">
          {{currency(item.origin_price)}}
        </td>
        <td class="text-right">
          {{currency(item.price)}}
        </td>
        <td>
          <span class="text-success" v-if="item.is_enabled">啟用</span>
          <span class="text-danger" v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="openDelModal(item)">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <Pagination :pages="pagination" @emitPages="getProduct"></Pagination>
  <Modal ref="Modal" :product="tempProduct" @update-product="updateProduct"></Modal>
  <DelModal ref="DelModal" :product="tempProduct" @del-product="delProduct"></DelModal>
</template>

<style lang="scss">
</style>

<script>
import { ProductApi } from '../assets/api/ProductApi.js'
import Modal from '../components/ProductModal.vue'
import DelModal from '../components/DelProductModal.vue'
import Pagination from '../components/Pagination.vue'
import { Reg } from '../assets/reg/Reg.js'
// if I don't want to import a lot of plugin , and I can use mixins
/*
  mixins:[xxx] => xxx is export file
*/
export default ({
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false
    }
  },
  components: {
    Modal,
    DelModal,
    Pagination
  },
  // Dashboard 父層傳進emitter
  inject: ['emitter'],
  methods: {
    currency (num) {
      return Reg.currency(num)
    },
    getProduct (page) {
      this.isLoading = true
      ProductApi.getProducts(page || 1).then((res) => {
        if (res.data.success) {
          this.products = res.data.products
          this.pagination = res.data.pagination
        }
        this.isLoading = false
      })
    },
    openModal (isNew, item) {
      if (isNew) {
        this.tempProduct = {}
        this.isNew = true
      } else {
        this.tempProduct = { ...item }
        this.isNew = false
      }
      this.$refs.Modal.showModal()
    },
    openDelModal (item) {
      this.tempProduct = { ...item }
      this.$refs.DelModal.showModal()
    },
    notification (res) {
      if (res.data.success) {
        this.emitter.emit('new-msg', {
          style: 'success',
          title: '更新成功'
        })
      } else {
        this.emitter.emit('new-msg', {
          style: 'danger',
          title: '更新失敗',
          content: res.data.message.join('、')
        })
      }
    },
    updateProduct (item) {
      this.tempProduct = item
      this.isLoading = true
      if (!this.isNew) {
        ProductApi.reviseProduct(item.id, { data: this.tempProduct }).then((res) => {
          this.$refs.Modal.hideModal()
          this.getProduct()
          this.notification(res)
        })
      } else {
        ProductApi.addProduct({ data: this.tempProduct }).then((res) => {
          this.$refs.Modal.hideModal()
          this.getProduct()
          this.notification(res)
        })
      }
      this.isLoading = false
    },
    delProduct (item) {
      this.tempProduct = item
      this.isLoading = true
      ProductApi.delProduct(this.tempProduct.id).then((res) => {
        if (res.data.success) {
          this.$refs.DelModal.hideModal()
          this.getProduct()
        }
      })
      this.isLoading = false
    }
  },
  created () {
    this.getProduct()
  }
})
</script>
