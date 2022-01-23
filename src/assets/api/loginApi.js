import axios from 'axios'
export const loginApi = {
  login,
  checkLoginStatus,
  logout
}

function login (user) {
  const api = `${process.env.VUE_APP_API}admin/signin`
  return new Promise((resolve, reject) => {
    axios.post(api, user)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

function checkLoginStatus (token) {
  axios.defaults.headers.common.Authorization = token
  const api = `${process.env.VUE_APP_API}api/user/check`
  return new Promise((resolve, reject) => {
    axios.post(api)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

function logout () {
  const api = `${process.env.VUE_APP_API}logout`
  return new Promise((resolve, reject) => {
    axios.post(api)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
