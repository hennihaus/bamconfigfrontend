<template>
  <template v-if="!isLoading">
    <template v-if="bank">
      <h1>{{ $t("bank.edit", { bank: bank.name }) }}</h1>
      <BankForm :bank="bank" @submit-bank="updateBank" />
    </template>

    <template v-if="message">
      <h1 v-if="message !== $t('bank.edit-error')">
        {{ $t("bank.edit", { bank: $tc("core.bank", 1) }) }}
      </h1>
      <BaseMessage :message="message" />
    </template>
  </template>
  <BaseLoading v-else />
</template>

<script>
import BaseMessage from "@/modules/base/components/BaseMessage.vue";
import BaseLoading from "@/modules/base/components/BaseLoading.vue";
import BankForm from "@/modules/bank/components/BankForm.vue";

export default {
  name: "BankEdit",
  components: { BankForm, BaseLoading, BaseMessage },
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
          this.message = "";
          this.bank = bank;
        })
        .catch(() => (this.message = this.$tc("bank.not-found", 1)))
        .finally(() => (this.isLoading = false));
    },
    updateBank(bank) {
      this.isLoading = true;

      this.$bankApi
        .update(bank.uuid, bank)
        .then(({ uuid }) => {
          this.message = "";
          this.$router.push({
            name: "BankDetails",
            params: {
              uuid,
            },
          });
        })
        .catch(() => (this.message = this.$t("bank.edit-error")))
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>
