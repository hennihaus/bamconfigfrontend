<script setup lang="ts">
import type { CreditConfiguration } from "@hennihaus/bamconfigbackend";
import { computed } from "vue";
import { useBaseI18n } from "@/modules/base/composables/i18n";

const { t } = useBaseI18n();

const props = withDefaults(
  defineProps<{
    creditConfiguration: CreditConfiguration;
    title?: string | null;
  }>(),
  {
    title: null,
  }
);

const computedTitle = computed(() =>
  props.title ? props.title : t("bank.credit-configuration")
);
</script>

<template>
  <h4>{{ computedTitle }}</h4>
  <slot name="jmsQueue" />

  <div>
    {{ $t("bank.credit-configuration-min-amount-in-euros") }}:
    {{ $n(creditConfiguration.minAmountInEuros, "currency") }}
  </div>
  <div>
    {{ $t("bank.credit-configuration-max-amount-in-euros") }}:
    {{ $n(creditConfiguration.maxAmountInEuros, "currency") }}
  </div>
  <div>
    {{ $t("bank.credit-configuration-min-term-in-months") }}:
    {{ creditConfiguration.minTermInMonths }}
    {{ $t("bank.credit-configuration-month", 2) }}
  </div>
  <div>
    {{ $t("bank.credit-configuration-max-term-in-months") }}:
    {{ creditConfiguration.maxTermInMonths }}
    {{ $t("bank.credit-configuration-month", 2) }}
  </div>
  <div>
    {{ $t("bank.credit-configuration-min-schufa-rating") }}:
    {{ creditConfiguration.minSchufaRating }}
  </div>
  <div>
    {{ $t("bank.credit-configuration-max-schufa-rating") }}:
    {{ creditConfiguration.maxSchufaRating }}
  </div>
</template>
