<template>
  <div class="toast-container position-absolute top-0 end-0 start-0 mx-auto">
      <Toast v-for="(item) in msg" :key="item" :msg="item"></Toast>
  </div>
</template>

<script>
import Toast from './Toast.vue'
export default {
  components: {
    Toast
  },
  data () {
    return {
      msg: []
    }
  },
  inject: ['emitter'],
  mounted () {
    this.emitter.on('new-msg', (msg) => {
      const { style = 'success', title, content } = msg
      this.msg.push({ style, title, content })
    })
  }
}
</script>
