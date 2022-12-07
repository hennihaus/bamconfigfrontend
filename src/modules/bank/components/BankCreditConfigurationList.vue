<template>
  <div v-if="hasAtLeastOneCreditConfig" class="ui grid">
    <div v-for="bank in activeBanks" :key="bank.uuid" class="eight wide column">
      <BankCreditConfigurationListItem
        :credit-configuration="bank.creditConfiguration"
        :title="bank.name"
      >
        <template #jmsQueue>
          <div v-if="bank.isAsync">
            {{ $t("bank.jms-queue") }}: {{ bank.jmsQueue }}
          </div>
        </template>
      </BankCreditConfigurationListItem>
    </div>
  </div>
</template>

<script>
import BankCreditConfigurationListItem from "@/modules/bank/components/BankCreditConfigurationListItem.vue";

export default {
  name: "BankCreditConfigurationList",
  components: { BankCreditConfigurationListItem },
  props: {
    banks: {
      type: Array,
      required: true,
    },
  },
  computed: {
    hasAtLeastOneCreditConfig() {
      return (
        this.banks && this.banks.length && this.banks[0].creditConfiguration
      );
    },
    activeBanks() {
      return this.banks.filter((bank) => bank.isActive);
    },
  },
};
</script>
