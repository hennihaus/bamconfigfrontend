<template>
  <template v-if="!isLoading">
    <template v-if="bank">
      <BankDetailsView :bank="bank" />

      <button
        v-if="isAsyncBankActive"
        class="ui tiny red labeled icon button"
        @click="updateBank(false)"
      >
        <i class="power off icon" /> {{ $t("bank.deactivate") }}
      </button>

      <button
        v-if="isAsyncBankNotActive"
        class="ui tiny green labeled icon button"
        @click="updateBank(true)"
      >
        <i class="power off icon" /> {{ $t("bank.activate") }}
      </button>

      <RouterLink :to="{ name: 'BankEdit', params: { uuid } }">
        <button class="ui tiny yellow labeled icon button">
          <i class="write icon" />
          {{ $t("bank.edit", { bank: $tc("core.bank", 1) }) }}
        </button>
      </RouterLink>

      <button
        v-if="bank.isAsync"
        class="ui tiny olive labeled icon button"
        @click="saveStatistics"
      >
        <i class="arrow up icon" /> {{ $t("bank.add-teams") }}
      </button>

      <button
        v-if="bank.isAsync"
        class="ui tiny orange labeled icon button"
        @click="deleteStatistics"
      >
        <i class="remove icon" /> {{ $t("bank.remove-teams") }}
      </button>
    </template>

    <BaseMessage v-if="message" :message="message" :type="type" />
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
      type: null,
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
          this.type = "";
        })
        .catch(() => {
          this.type = "negative";
          this.message = this.$tc("bank.not-found", 1);
        })
        .finally(() => (this.isLoading = false));
    },
    updateBank(isActive) {
      this.isLoading = true;

      this.$bankApi
        .update(this.uuid, { ...this.bank, isActive })
        .then((bank) => {
          this.bank = bank;
          this.message = "";
          this.type = "";
        })
        .catch(() => {
          this.message = this.$t("bank.edit-error");
          this.type = "negative";
        })
        .finally(() => (this.isLoading = false));
    },
    saveStatistics() {
      this.isLoading = true;

      this.$statisticApi
        .saveAll(this.bank.uuid)
        .then(() => {
          this.type = "positive";
          this.message = this.$t("bank.add-teams-success");
        })
        .catch(() => {
          this.type = "negative";
          this.message = this.$t("bank.add-teams-error");
        })
        .finally(() => (this.isLoading = false));
    },
    deleteStatistics() {
      if (confirm(this.$t("bank.remove-teams-warning"))) {
        this.isLoading = true;

        this.$statisticApi
          .deleteAll(this.bank.uuid)
          .then(() => {
            this.type = "positive";
            this.message = this.$t("bank.remove-teams-success");
          })
          .catch(() => {
            this.type = "negative";
            this.message = this.$t("bank.remove-teams-error");
          })
          .finally(() => (this.isLoading = false));
      }
    },
  },
};
</script>
