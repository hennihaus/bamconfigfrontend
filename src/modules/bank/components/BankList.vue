<template>
  <div v-if="!isLoading" class="ui middle aligned selection divided list">
    <BankListItem v-for="bank in banks" :key="bank.uuid" :bank="bank" />

    <BaseMessage
      v-if="!banks.length"
      message="Es wurden keine Banken gefunden."
    />
  </div>
  <BaseLoading v-else />
</template>

<script>
import BankListItem from "@/modules/bank/components/BankListItem.vue";
import BaseMessage from "@/modules/base/components/BaseMessage.vue";
import BaseLoading from "@/modules/base/components/BaseLoading.vue";

export default {
  name: "BankList",
  components: { BaseLoading, BaseMessage, BankListItem },
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
