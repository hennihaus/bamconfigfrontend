<script setup lang="ts">
import type { Bank } from "@hennihaus/bamconfigbackend";
import { computed } from "vue";
import { useForm } from "vee-validate";
import BankFormCommon from "@/modules/bank/components/BankFormCommon.vue";
import BankFormCreditConfiguration from "@/modules/bank/components/BankFormCreditConfiguration.vue";

const props = defineProps<{ bank: Bank }>();

const emit = defineEmits<{ (event: "submitBank", bank: Bank): void }>();

const initialValues = computed(() => props.bank);
const { handleSubmit, meta, isSubmitting } = useForm<Bank>({
  initialValues,
  validateOnMount: false,
  keepValuesOnUnmount: false,
});
const onSubmit = handleSubmit((values: Bank) => {
  if (values.creditConfiguration) {
    emit("submitBank", {
      ...values,
      creditConfiguration: {
        minAmountInEuros: +values.creditConfiguration.minAmountInEuros,
        maxAmountInEuros: +values.creditConfiguration.maxAmountInEuros,
        minTermInMonths: +values.creditConfiguration.minTermInMonths,
        maxTermInMonths: +values.creditConfiguration.maxTermInMonths,
        minSchufaRating: values.creditConfiguration.minSchufaRating,
        maxSchufaRating: values.creditConfiguration.maxSchufaRating,
      },
    });
  } else {
    emit("submitBank", values);
  }
});
</script>

<template>
  <form class="ui equal width form" @submit="onSubmit">
    <BankFormCommon />
    <BankFormCreditConfiguration v-if="bank.creditConfiguration" />

    <p />

    <button
      :disabled="isSubmitting"
      :class="[meta.valid ? 'green' : 'red']"
      type="submit"
      class="ui fluid button"
    >
      {{ $t("common.save") }}
    </button>
  </form>
</template>
