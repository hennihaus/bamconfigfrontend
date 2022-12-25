<script setup lang="ts">
import { useBankFetch } from "@/modules/bank/composables/fetch";
import { toRef } from "vue";
import BaseLoading from "@/modules/base/components/BaseLoading.vue";
import BankForm from "@/modules/bank/components/BankForm.vue";
import type { Bank } from "@hennihaus/bamconfigbackend";
import { useRouter } from "vue-router";
import BaseMessage from "@/modules/base/components/BaseMessage.vue";

const router = useRouter();

const props = defineProps<{ uuid: string }>();

const { bank, isLoading, message, updateBank } = useBankFetch(
  toRef(props, "uuid")
);

const onSubmitBank = (bank: Bank) => {
  updateBank(bank).then((bank) => {
    if (bank) {
      router.push({ name: "BankDetails", params: { uuid: bank.uuid } });
    }
  });
};
</script>

<template>
  <template v-if="!isLoading">
    <template v-if="bank">
      <h1>{{ $t("bank.edit", { bank: bank.name }) }}</h1>
      <BankForm :bank="bank" @submit-bank="onSubmitBank" />
    </template>

    <template v-if="message">
      <h1 v-if="message !== $t('bank.edit-error')">
        {{ $t("bank.edit", { bank: $t("core.bank", 1) }) }}
      </h1>
      <BaseMessage :message="message" />
    </template>
  </template>
  <BaseLoading v-else />
</template>
