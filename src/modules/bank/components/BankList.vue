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
        <BaseMessage v-if="!banks.length" :message="$tc('bank.not-found', 2)" />
      </template>
    </BaseFrontendPagination>
  </template>
  <BaseLoading v-else />
</template>

<script>
import BaseFrontendPagination from "@/modules/base/components/BaseFrontendPagination.vue";
import BankListItem from "@/modules/bank/components/BankListItem.vue";
import BaseMessage from "@/modules/base/components/BaseMessage.vue";
import BaseLoading from "@/modules/base/components/BaseLoading.vue";

export default {
  name: "BankList",
  components: {
    BaseFrontendPagination,
    BaseLoading,
    BaseMessage,
    BankListItem,
  },
  props: {
    pageNumber: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      isLoading: true,
      banks: [],
    };
  },
  created() {
    this.fetchBanks();
  },
  methods: {
    fetchBanks() {
      this.$bankApi
        .getAll()
        .then((banks) => (this.banks = banks))
        .catch(() => (this.banks = []))
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>
