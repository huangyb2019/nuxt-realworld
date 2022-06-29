<template>
  <nav v-if="totalPageArr.length">
    <ul class="pagination">
      <li
        v-for="(_, index) in totalPageArr"
        :key="index"
        class="page-item"
        :class="{ active: Number(index) === Number(currentPage) }"
      >
        <button class="page-link" @click="handleSetPage(index)">
          {{ index + 1 }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { LIMIT_LIST_ITEM } from '@/constants'

export default {
  name: 'PaginationCom',
  props: {
    totalCount: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      state: {
        currentPage: 0,
      },
    }
  },
  computed: {
    totalPageArr() {
      const length = this.totalCount / LIMIT_LIST_ITEM
      return Array.from({ length }, (_, i) => this.state.currentPage + i)
    },
  },
  methods: {
    handleSetPage() {},
  },
}
</script>
