<template>
  <RouterLink
    :to="{ name: 'BankDetails', params: { uuid: bank.uuid } }"
    class="item custom-item"
  >
    <img
      v-base-image-error
      :src="bank.thumbnailUrl"
      class="ui tiny image custom-image"
    />
    <div class="content">
      <div class="header">{{ bank.name }}</div>
      <div class="description">
        {{ $t("common.status") }}: {{ activeStatus }}
      </div>
      <div class="metadata">
        {{ asyncStatus }}
        <br />
        <div v-if="bank.isAsync">
          {{ $tc("common.counter", 1) }} {{ $tc("core.team", 2) }}
        </div>
        <div v-else>
          {{ $tc("common.counter", 2) }} {{ $tc("core.team", 2) }}
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script>
import baseImageError from "@/modules/base/directives/base-image-error";

export default {
  name: "BankListItem",
  directives: {
    baseImageError,
  },
  props: {
    bank: {
      type: Object,
      required: true,
    },
  },
  computed: {
    activeStatus() {
      return this.bank.isActive
        ? this.$tc("bank.active-status", 1).toLowerCase()
        : this.$tc("bank.active-status", 0).toLowerCase();
    },
    asyncStatus() {
      return this.bank.isAsync
        ? this.$tc("bank.async-status", 1)
        : this.$tc("bank.async-status", 0);
    },
  },
};
</script>

<style scoped>
.custom-item {
  display: flex !important;
  height: 95px;
  align-items: center;
}

.custom-image {
  max-height: 80px;
  max-width: 80px;
}
</style>
