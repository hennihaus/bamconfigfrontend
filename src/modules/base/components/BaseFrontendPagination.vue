<template>
  <div class="container">
    <div class="ui middle aligned selection divided list">
      <template v-for="item in pages">
        <slot :item="item" name="item" />
      </template>

      <slot name="message" />
    </div>

    <div v-if="hasPages" class="ui pagination menu">
      <template v-for="number in pageNumbers" :key="number">
        <RouterLink
          :to="{ name: component, params: { pageNumber: number } }"
          :class="{ active: number === currentPage }"
          class="item"
        >
          {{ number }}
        </RouterLink>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseFrontendPagination",
  props: {
    pageNumber: {
      type: String,
      required: false,
      default: null,
    },
    component: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      required: false,
      default: 8,
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    hasPages() {
      return this.totalPages > 1;
    },
    currentPage() {
      if (!+this.pageNumber) {
        return 1;
      }
      if (+this.pageNumber < 1) {
        return 1;
      }
      if (+this.pageNumber > this.totalPages) {
        return this.totalPages;
      }
      return +this.pageNumber;
    },
    pages() {
      const index = this.currentPage * this.itemsPerPage - this.itemsPerPage;
      return this.items.slice(index, index + this.itemsPerPage);
    },
    pageNumbers() {
      return [...Array(this.totalPages).keys()]
        .map((number) => number + 1)
        .filter((number) => {
          if (number === 1) {
            return true;
          }
          if (number === this.totalPages) {
            return true;
          }
          return Math.abs(number - this.currentPage) < 2;
        });
    },
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 52px;
}

.pagination {
  align-self: start;
  justify-self: center;
}
</style>
