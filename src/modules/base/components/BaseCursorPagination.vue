<script setup lang="ts">
import type { Pagination } from "@hennihaus/bamconfigbackend";
import { computed } from "vue";

const props = defineProps<{ pagination: Pagination; component: string }>();

const hasPages = computed(() => {
  if (!props.pagination) {
    return false;
  }
  return props.pagination.prev || props.pagination.next;
});
const isFirstPage = computed(
  () => !props.pagination.prev && props.pagination.next
);
const isLastPage = computed(
  () => props.pagination.prev && !props.pagination.next
);
</script>

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
        {{ $t("base.pagination-start") }}
      </RouterLink>
      <RouterLink
        v-if="pagination.prev"
        :to="{
          name: component,
          query: { ...$route.query, cursor: pagination.prev },
        }"
        class="item"
      >
        {{ $t("base.pagination-prev") }}
      </RouterLink>
      <RouterLink
        v-if="pagination.next"
        :to="{
          name: component,
          query: { ...$route.query, cursor: pagination.next },
        }"
        class="item"
      >
        {{ $t("base.pagination-next") }}
      </RouterLink>
      <RouterLink
        :to="{
          name: component,
          query: { ...$route.query, cursor: pagination.last },
        }"
        :class="{ active: isLastPage }"
        class="item"
      >
        {{ $t("base.pagination-end") }}
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
