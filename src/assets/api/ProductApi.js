import axios from 'axios'
export const ProductApi = {
  getProducts,
  addProduct,
  reviseProduct,
  uploadPicture,
  delProduct
}

function getProducts () {
  const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products`
  return new Promise((resolve, reject) => {
    axios.get(api)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

function addProduct (data) {
  const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
  return new Promise((resolve, reject) => {
    axios.post(api, data)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

function reviseProduct (id, data) {
  const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${id}`
  return new Promise((resolve, reject) => {
    axios.put(api, data)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

function uploadPicture (picture) {
  const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`
  return new Promise((resolve, reject) => {
    axios.post(api, picture)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

function delProduct (id) {
  const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${id}`
  return new Promise((resolve, reject) => {
    axios.delete(api)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
