<template>
  <div class="container" :class="{ 'two-column-container': $slots.filters }">
    <div class="ui middle aligned selection divided list">
      <slot name="items" />
    </div>
    <div v-if="$slots.filters" class="filter-wrapper">
      <slot name="filters" />
    </div>
    <div v-if="hasPages" class="ui pagination menu">
      <RouterLink
        :to="{
          name: component,
          query: { ...$route.query, cursor: pagination.first },
        }"
        :class="{ active: isFirstPage }"
        class="item"
      >
        Start
      </RouterLink>
      <RouterLink
        v-if="pagination.prev"
        :to="{
          name: component,
          query: { ...$route.query, cursor: pagination.prev },
        }"
        class="item"
      >
        Vorherige
      </RouterLink>
      <RouterLink
        v-if="pagination.next"
        :to="{
          name: component,
          query: { ...$route.query, cursor: pagination.next },
        }"
        class="item"
      >
        Nächste
      </RouterLink>
      <RouterLink
        :to="{
          name: component,
          query: { ...$route.query, cursor: pagination.last },
        }"
        :class="{ active: isLastPage }"
        class="item"
      >
        Ende
      </RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  name: "BasePagination",
  props: {
    pagination: {
      type: Object,
      required: true,
    },
    component: {
      type: String,
      required: true,
    },
  },
  computed: {
    hasPages() {
      if (!this.pagination) {
        return false;
      }
      return this.pagination.prev || this.pagination.next;
    },
    isFirstPage() {
      return !this.pagination.prev && this.pagination.next;
    },
    isLastPage() {
      return this.pagination.prev && !this.pagination.next;
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

.two-column-container {
  grid-template-columns: minmax(476.75px, 1fr) auto;
}

.filter-wrapper {
  grid-column: 2 / 3;
  grid-row: 1 / 3;
  box-sizing: border-box;
  padding: 7px 16px;
}

.pagination {
  align-self: start;
  justify-self: center;
}
</style>
