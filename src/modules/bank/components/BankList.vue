<script setup lang="ts">
import { useBanksFetch } from "@/modules/bank/composables/fetch";
import BaseFrontendPagination from "@/modules/base/components/BaseFrontendPagination.vue";
import BankListItem from "@/modules/bank/components/BankListItem.vue";
import BaseMessage from "@/modules/base/components/BaseMessage.vue";
import BaseLoading from "@/modules/base/components/BaseLoading.vue";

withDefaults(defineProps<{ pageNumber?: string | null }>(), {
  pageNumber: null,
});

const { banks, isLoading } = useBanksFetch();
</script>

<template>
  <template v-if="!isLoading">
    <BaseFrontendPagination
      :items="banks"
      :page-number="pageNumber"
      component="BankList"
    >
      <template #item="{ item }">
        <BankListItem :key="item.uuid" :bank="item" />
      </template>

      <template #message>
        <BaseMessage v-if="!banks.length" :message="$t('bank.not-found', 2)" />
      </template>
    </BaseFrontendPagination>
  </template>
  <BaseLoading v-else />
</template>
