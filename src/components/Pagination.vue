<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="pages.has_pre ? '' : 'disabled'">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="updatePage(pages.current_page-1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="(item) in pages.total_pages" :key="item" :class="item==pages.current_page ? 'active' : '' ">
        <a class="page-link" href="#" @click.prevent="updatePage(item)">
          {{ item }}
        </a>
      </li>
      <li class="page-item" :class="pages.has_next ? '' : 'disabled'">
        <a class="page-link" href="#" aria-label="Next" @click.prevent="updatePage(pages.current_page+1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pages'],
  methods: {
    updatePage (page) {
      console.log(page)
      this.$emit('emitPages', page)
    }
  }
}
</script>
