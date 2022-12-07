<template>
  <h1>{{ bank.name }}</h1>
  <h3>{{ activeStatus }}</h3>
  <div class="ui divider" />
  <div class="ui grid">
    <div class="four wide column">
      <img v-base-image-error :src="bank.thumbnailUrl" class="ui small image" />
    </div>

    <div class="four wide column">
      <template v-if="bank.isAsync">
        <h4>{{ $t("bank.jms-queue") }}</h4>
        <div>{{ bank.jmsQueue }}</div>
      </template>
      <h4>{{ $t("bank.interface") }}</h4>
      <div>{{ asyncStatus }}</div>
    </div>

    <div v-if="bank.creditConfiguration" class="four wide column">
      <BankCreditConfigurationListItem
        :credit-configuration="bank.creditConfiguration"
      />
    </div>

    <div class="four wide column">
      <h4>{{ $tc("core.team", 2) }}</h4>
      <div v-if="bank.isAsync">
        {{ $tc("common.counter", 1).toLowerCase() }}
      </div>
      <div v-else>{{ $tc("common.counter", 2).toLowerCase() }}</div>
    </div>
  </div>
  <div class="ui divider"></div>
</template>

<script>
import baseImageError from "@/modules/base/directives/base-image-error";
import BankCreditConfigurationListItem from "@/modules/bank/components/BankCreditConfigurationListItem.vue";

export default {
  name: "BankDetailsView",
  components: { BankCreditConfigurationListItem },
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
        ? this.$tc("bank.active-status", 1)
        : this.$tc("bank.active-status", 0);
    },
    asyncStatus() {
      return this.bank.isAsync
        ? this.$tc("bank.async-status", 1)
        : this.$tc("bank.async-status", 0);
    },
  },
};
</script>
