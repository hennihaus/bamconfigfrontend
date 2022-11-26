<template>
  <RouterLink
    :to="{ name: 'BankDetails', params: { uuid: bank.uuid } }"
    class="item"
  >
    <img
      v-base-image-zoom
      v-base-image-error
      :src="bank.thumbnailUrl"
      class="ui tiny image"
    />
    <div class="content">
      <div class="header">{{ bank.name }}</div>
      <div class="description">Status: {{ activeStatus }}</div>
      <div class="metadata">
        {{ asyncStatus }}
        <br />
        <span v-if="bank.isAsync">{{ bank.teamsCount }} Teams</span>
        <span v-else>Alle Teams</span>
      </div>
    </div>
  </RouterLink>
</template>

<script>
import baseImageZoom from "@/modules/base/directives/base-image-zoom";
import baseImageError from "@/modules/base/directives/base-image-error";

export default {
  name: "BankListItem",
  directives: {
    baseImageZoom,
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
