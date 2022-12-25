<script setup lang="ts">
import { useField } from "vee-validate";
import BaseDragDrop from "@/modules/base/components/BaseDragDrop.vue";
import { computed, inject, ref } from "vue";
import { BANKS, TEAM } from "@/models/symbols";
import type { Statistics } from "@/modules/team/services/statistic-service";

const ZERO_REQUESTS = 0;

const team = inject(TEAM, null);
const banks = inject(BANKS, () => ref([]), true);

const { value: statistics, handleBlur: handleStatisticsBlur } =
  useField<Statistics>("statistics", {}, { validateOnValueUpdate: false });

const selectedBanks = computed(() => Object.keys(statistics.value));
const unselectedBanks = computed(() => {
  if (team?.value) {
    return banks.value
      .filter((bank) => bank.isAsync)
      .map((bank) => bank.name)
      .filter((bank) => !Object.keys(statistics.value).includes(bank));
  }
  return banks.value.filter((bank) => bank.isAsync).map((bank) => bank.name);
});

const onDropSelected = (banks: string[]) => {
  statistics.value = banks
    .map((bank) => {
      if (team?.value && statistics.value[bank]) {
        return { [bank]: statistics.value[bank] };
      }
      return { [bank]: ZERO_REQUESTS };
    })
    .reduce((target, source) => Object.assign(target, source), {});

  handleStatisticsBlur();
};
</script>

<template>
  <BaseDragDrop
    :selected="selectedBanks"
    :unselected="unselectedBanks"
    @on-drop-selected="onDropSelected"
  >
    <template #selectedLabel>
      <i18n-t keypath="team.banks-migration" tag="label" class="custom-label">
        <u>{{ $t("common.to", 1) }}</u>
      </i18n-t>
    </template>

    <template #unselectedLabel>
      <i18n-t keypath="team.banks-migration" tag="label" class="custom-label">
        <u>{{ $t("common.to", 0) }}</u>
      </i18n-t>
    </template>
  </BaseDragDrop>
</template>

<style scoped>
.custom-label {
  font-size: 13px;
  font-weight: bold;
}
</style>
