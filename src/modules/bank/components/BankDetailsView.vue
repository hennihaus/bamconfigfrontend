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
        <h4>JMS-Queue</h4>
        <div>{{ bank.jmsQueue }}</div>
      </template>
      <h4>Schnittstelle</h4>
      <div>{{ asyncStatus }}</div>
    </div>

    <div v-if="bank.creditConfiguration" class="four wide column">
      <BankCreditConfigurationListItem
        :credit-configuration="bank.creditConfiguration"
      />
    </div>

    <div class="four wide column">
      <h4>Teams</h4>
      <template v-if="bank.isAsync">
        <div v-if="bank.teamsCount">{{ bank.teamsCount }} Teams</div>
        <div v-else>Keine Teams vorhanden</div>
      </template>
      <div v-else>Alle</div>
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
      return this.bank.isActive ? "Aktiv" : "Deaktiviert";
    },
    asyncStatus() {
      return this.bank.isAsync ? "JMS" : "SOAP/REST";
    },
  },
};
</script>
