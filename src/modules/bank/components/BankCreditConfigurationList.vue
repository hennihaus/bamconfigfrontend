<script setup lang="ts">
import BankCreditConfigurationListItem from "@/modules/bank/components/BankCreditConfigurationListItem.vue";
import type { Bank } from "@hennihaus/bamconfigbackend";
import { computed } from "vue";

const props = defineProps<{ banks: Bank[] }>();

const activeBanks = computed(() => props.banks.filter((bank) => bank.isActive));
const hasAtLeastOneCreditConfig = computed(() =>
  props.banks.some((bank) => bank.creditConfiguration)
);
</script>

<template>
  <div v-if="hasAtLeastOneCreditConfig" class="ui grid">
    <template v-for="bank in activeBanks" :key="bank.uuid">
      <div v-if="bank.creditConfiguration" class="eight wide column">
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
    </template>
  </div>
</template>
