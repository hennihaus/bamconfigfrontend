<script setup lang="ts">
import { computed } from "vue";

const FIRST_PAGE_NUMBER = 1;
const PAGE_STEPPER_RANGE = 2;

const props = withDefaults(
  defineProps<{
    pageNumber?: string | null;
    component: string;
    items: readonly any[];
    itemsPerPage?: number;
  }>(),
  {
    pageNumber: null,
    itemsPerPage: 8,
  }
);

const totalPages = computed(() =>
  Math.ceil(props.items.length / props.itemsPerPage)
);
const currentPage = computed(() => {
  if (!props.pageNumber) {
    return FIRST_PAGE_NUMBER;
  }
  if (+props.pageNumber < FIRST_PAGE_NUMBER) {
    return FIRST_PAGE_NUMBER;
  }
  if (+props.pageNumber > totalPages.value) {
    return totalPages.value;
  }
  return +props.pageNumber;
});
const pages = computed(() => {
  const index = currentPage.value * props.itemsPerPage - props.itemsPerPage;
  return props.items.slice(index, index + props.itemsPerPage);
});

const hasPages = computed(() => totalPages.value > FIRST_PAGE_NUMBER);
const pageNumbers = computed(() => {
  return [...Array(totalPages.value).keys()]
    .map((number) => number + 1)
    .filter((number) => {
      if (number === FIRST_PAGE_NUMBER) {
        return true;
      }
      if (number === totalPages.value) {
        return true;
      }
      return Math.abs(number - currentPage.value) < PAGE_STEPPER_RANGE;
    });
});
</script>

<template>
  <div class="container">
    <div class="ui middle aligned selection divided list">
      <template v-for="item in pages">
        <slot :item="item" name="item" />
      </template>

      <slot name="message" />
    </div>

    <div v-if="hasPages" class="ui pagination menu">
      <RouterLink
        v-for="number in pageNumbers"
        :key="number"
        :to="{ name: component, params: { pageNumber: number } }"
        :class="{ active: number === currentPage }"
        class="item"
      >
        {{ number }}
      </RouterLink>
    </div>
  </div>
</template>

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
