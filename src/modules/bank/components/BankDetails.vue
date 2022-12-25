<script setup lang="ts">
import { useBankFetch } from "@/modules/bank/composables/fetch";
import type { Ref } from "vue";
import { toRef } from "vue";
import BankDetailsView from "@/modules/bank/components/BankDetailsView.vue";
import { useBank } from "@/modules/bank/composables/bank";
import type { Bank } from "@hennihaus/bamconfigbackend";
import BaseLoading from "@/modules/base/components/BaseLoading.vue";
import BaseMessage from "@/modules/base/components/BaseMessage.vue";

const props = defineProps<{ uuid: string }>();

const {
  bank,
  isLoading,
  message,
  messageType,
  updateBank,
  saveStatistics,
  deleteStatistics,
} = useBankFetch(toRef(props, "uuid"));

const { isAsyncBankActive, isAsyncBankNotActive } = useBank(bank as Ref<Bank>);
const onDeactivateClick = () => {
  updateBank({ ...(bank.value as Bank), isActive: false });
};
const onActivateClick = () => {
  updateBank({ ...(bank.value as Bank), isActive: true });
};
</script>

<template>
  <template v-if="!isLoading">
    <template v-if="bank">
      <BankDetailsView :bank="bank" />

      <button
        v-if="isAsyncBankActive"
        class="ui tiny red labeled icon button"
        @click="onDeactivateClick"
      >
        <i class="power off icon" /> {{ $t("bank.deactivate") }}
      </button>

      <button
        v-if="isAsyncBankNotActive"
        class="ui tiny green labeled icon button"
        @click="onActivateClick"
      >
        <i class="power off icon" /> {{ $t("bank.activate") }}
      </button>

      <RouterLink :to="{ name: 'BankEdit', params: { uuid } }">
        <button class="ui tiny yellow labeled icon button">
          <i class="write icon" />
          {{ $t("bank.edit", { bank: $t("core.bank", 1) }) }}
        </button>
      </RouterLink>

      <button
        v-if="bank?.isAsync"
        class="ui tiny olive labeled icon button"
        @click="saveStatistics(uuid)"
      >
        <i class="arrow up icon" /> {{ $t("bank.add-teams") }}
      </button>

      <button
        v-if="bank?.isAsync"
        class="ui tiny orange labeled icon button"
        @click="deleteStatistics(uuid)"
      >
        <i class="remove icon" /> {{ $t("bank.remove-teams") }}
      </button>
    </template>

    <BaseMessage v-if="message" :message="message" :type="messageType" />
  </template>
  <BaseLoading v-else />
</template>
