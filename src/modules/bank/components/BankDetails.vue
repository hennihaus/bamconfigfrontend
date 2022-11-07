<template>
  <template v-if="!isLoading">
    <template v-if="bank">
      <BankDetailsView :bank="bank" />

      <button
        v-if="isAsyncBankActive"
        class="ui tiny red labeled icon button"
        @click="updateBank(false)"
      >
        <i class="power off icon" /> Bank deaktivieren
      </button>
      <button
        v-if="isAsyncBankNotActive"
        class="ui tiny green labeled icon button"
        @click="updateBank(true)"
      >
        <i class="power off icon" /> Bank aktivieren
      </button>
      <RouterLink
        v-if="bank.creditConfiguration"
        :to="{ name: 'BankEdit', params: { uuid } }"
      >
        <button class="ui tiny yellow labeled icon button">
          <i class="write icon" /> Bank bearbeiten
        </button>
      </RouterLink>
    </template>

    <BaseMessage v-if="message" :message="message" />
  </template>
  <BaseLoading v-else />
</template>

<script>
import BaseMessage from "@/modules/base/components/BaseMessage.vue";
import BankDetailsView from "@/modules/bank/components/BankDetailsView.vue";
import BaseLoading from "@/modules/base/components/BaseLoading.vue";

export default {
  name: "BankDetails",
  components: { BaseLoading, BankDetailsView, BaseMessage },
  props: {
    uuid: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isLoading: true,
      bank: null,
      message: "",
    };
  },
  computed: {
    isAsyncBankActive() {
      return this.bank.isAsync && this.bank.isActive;
    },
    isAsyncBankNotActive() {
      return this.bank.isAsync && !this.bank.isActive;
    },
  },
  watch: {
    uuid: {
      handler() {
        this.fetchBank();
      },
      immediate: true,
    },
  },
  methods: {
    fetchBank() {
      this.isLoading = true;

      this.$bankApi
        .getOne(this.uuid)
        .then((bank) => {
          this.bank = bank;
          this.message = "";
        })
        .catch(() => (this.message = "Bank wurde nicht gefunden."))
        .finally(() => (this.isLoading = false));
    },
    updateBank(isActive) {
      this.isLoading = true;

      this.$bankApi
        .update(this.uuid, { ...this.bank, isActive })
        .then((bank) => {
          this.bank = bank;
          this.message = "";
        })
        .catch(() => (this.message = "Bank konnte nicht geupdated werden."))
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>
