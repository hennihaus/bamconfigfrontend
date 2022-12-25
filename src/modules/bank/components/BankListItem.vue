<script setup lang="ts">
import type { Bank } from "@hennihaus/bamconfigbackend";
import { useBank } from "@/modules/bank/composables/bank";
import { toRef } from "vue";

const props = defineProps<{ bank: Bank }>();

const { activeStatus, asyncStatus } = useBank(toRef(props, "bank"));
</script>

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
        {{ $t("common.status") }}: {{ activeStatus.toLowerCase() }}
      </div>
      <div class="metadata">
        {{ asyncStatus }}
        <br />
        <div v-if="bank.isAsync">
          {{ $t("common.counter", 1) }} {{ $t("core.team", 2) }}
        </div>
        <div v-else>{{ $t("common.counter", 2) }} {{ $t("core.team", 2) }}</div>
      </div>
    </div>
  </RouterLink>
</template>

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
