<script setup lang="ts">
import type { Bank } from "@hennihaus/bamconfigbackend";
import { computed } from "vue";
import { useField, useForm } from "vee-validate";
import { useBaseI18n } from "@/modules/base/composables/i18n";
import BankFormCreditConfiguration from "@/modules/bank/components/BankFormCreditConfiguration.vue";
import BaseFormMessage from "@/modules/base/components/BaseFormMessage.vue";

const { t } = useBaseI18n();

const props = defineProps<{ bank: Bank }>();

const emit = defineEmits<{ (event: "submitBank", bank: Bank): void }>();

const initialValues = computed(() => props.bank);
const { handleSubmit, meta, isSubmitting } = useForm<Bank>({
  initialValues,
  validateOnMount: false,
  keepValuesOnUnmount: false,
});
const onSubmit = handleSubmit((values: Bank) => emit("submitBank", values));

const { value: isActive, handleBlur: handleIsActiveBlur } =
  useField<boolean>("isActive");
const {
  value: thumbnailUrl,
  errors: thumbnailUrlErrors,
  handleBlur: handleThumbnailUrlBlur,
} = useField<string>(
  "thumbnailUrl",
  { required: true, url: true },
  { label: t("bank.thumbnail-url") }
);
</script>

<template>
  <form class="ui equal width form" @submit="onSubmit">
    <div v-if="bank.isAsync" class="field">
      <label>{{ $t("common.status") }}</label>
      <select v-model="isActive" class="select" @blur="handleIsActiveBlur">
        <option :value="true" :selected="isActive">
          {{ $t("bank.active-status", 1) }}
        </option>
        <option :value="false" :selected="!isActive">
          {{ $t("bank.active-status", 0) }}
        </option>
      </select>
    </div>

    <div class="field">
      <label>{{ $t("bank.thumbnail-url") }}</label>
      <div class="ui left corner labeled input">
        <input
          v-model="thumbnailUrl"
          type="url"
          @blur="handleThumbnailUrlBlur"
        />
        <div class="ui left corner label">
          <i class="asterisk icon" />
        </div>
      </div>
      <BaseFormMessage :errors="thumbnailUrlErrors" />
    </div>

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

<style scoped>
.select {
  appearance: none;
}
</style>
