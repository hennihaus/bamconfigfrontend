<template>
  <VeeForm
    v-slot="{ isSubmitting, meta }"
    :initial-values="initialValues"
    :validation-schema="validationSchema"
    class="ui equal width form"
    @submit="onSubmit"
  >
    <div v-if="isAsyncBank" class="field">
      <label>{{ $t("common.status") }}</label>
      <VeeField v-slot="{ value }" name="isActive" as="select" class="select">
        <option :value="true" :selected="value">
          {{ $tc("bank.active-status", 1) }}
        </option>
        <option :value="false" :selected="!value">
          {{ $tc("bank.active-status", 0) }}
        </option>
      </VeeField>
    </div>

    <div class="field">
      <label>{{ $t("bank.thumbnail-url") }}</label>
      <VeeField
        v-slot="{ field, errors }"
        :label="$t('bank.thumbnail-url')"
        name="thumbnailUrl"
      >
        <div class="ui left corner labeled input">
          <input v-bind="field" type="url" />
          <div class="ui left corner label">
            <i class="asterisk icon" />
          </div>
        </div>
        <BaseFormMessage :errors="errors" />
      </VeeField>
    </div>

    <div v-if="hasCreditConfigurations" class="fields">
      <div class="field">
        <label>
          {{ $t("bank.credit-configuration-min-amount-in-euros") }}
          ({{ $t("common.money") }})
        </label>
        <VeeField
          v-slot="{ field, errors }"
          :label="$t('bank.credit-configuration-min-amount-in-euros')"
          name="creditConfiguration.minAmountInEuros"
        >
          <div class="ui left corner labeled input">
            <input v-bind="field" type="number" />
            <div class="ui left corner label">
              <i class="asterisk icon" />
            </div>
          </div>
          <BaseFormMessage :errors="errors" />
        </VeeField>
      </div>

      <div class="field">
        <label>
          {{ $t("bank.credit-configuration-max-amount-in-euros") }}
          ({{ $t("common.money") }})
        </label>
        <VeeField
          v-slot="{ field, errors }"
          :label="$t('bank.credit-configuration-max-amount-in-euros')"
          name="creditConfiguration.maxAmountInEuros"
        >
          <div class="ui left corner labeled input">
            <input v-bind="field" type="number" />
            <div class="ui left corner label">
              <i class="asterisk icon" />
            </div>
          </div>
          <BaseFormMessage :errors="errors" />
        </VeeField>
      </div>
    </div>

    <div v-if="hasCreditConfigurations" class="fields">
      <div class="field">
        <label>
          {{ $t("bank.credit-configuration-min-term-in-months") }}
          ({{ $tc("bank.credit-configuration-month", 2) }})
        </label>
        <VeeField
          v-slot="{ field, errors }"
          :label="$t('bank.credit-configuration-min-term-in-months')"
          name="creditConfiguration.minTermInMonths"
        >
          <div class="ui left corner labeled input">
            <input v-bind="field" type="number" />
            <div class="ui left corner label">
              <i class="asterisk icon" />
            </div>
          </div>
          <BaseFormMessage :errors="errors" />
        </VeeField>
      </div>

      <div class="field">
        <label>
          {{ $t("bank.credit-configuration-max-term-in-months") }}
          ({{ $tc("bank.credit-configuration-month", 2) }})
        </label>
        <VeeField
          v-slot="{ field, errors }"
          :label="$t('bank.credit-configuration-max-term-in-months')"
          name="creditConfiguration.maxTermInMonths"
        >
          <div class="ui left corner labeled input">
            <input v-bind="field" type="number" />
            <div class="ui left corner label">
              <i class="asterisk icon" />
            </div>
          </div>
          <BaseFormMessage :errors="errors" />
        </VeeField>
      </div>
    </div>

    <div v-if="hasCreditConfigurations" class="fields">
      <div class="field">
        <label>{{ $t("bank.credit-configuration-min-schufa-rating") }}</label>
        <VeeField
          v-slot="{ value }"
          name="creditConfiguration.minSchufaRating"
          as="select"
          class="select"
        >
          <option
            v-for="(ratingLevel, index) in ratingLevels"
            :key="index + ratingLevel"
            :value="ratingLevel"
            :selected="value === ratingLevel"
          >
            {{ ratingLevel }}
          </option>
        </VeeField>
        <VeeErrorMessage
          v-slot="{ message }"
          name="creditConfiguration.minSchufaRating"
        >
          <BaseFormMessage :errors="[message]" />
        </VeeErrorMessage>
      </div>

      <div class="field">
        <label>{{ $t("bank.credit-configuration-max-schufa-rating") }}</label>
        <VeeField
          v-slot="{ value }"
          name="creditConfiguration.maxSchufaRating"
          as="select"
          class="select"
        >
          <option
            v-for="(ratingLevel, index) in ratingLevels"
            :key="ratingLevel + index"
            :value="ratingLevel"
            :selected="value === ratingLevel"
          >
            {{ ratingLevel }}
          </option>
        </VeeField>
        <VeeErrorMessage
          v-slot="{ message }"
          name="creditConfiguration.maxSchufaRating"
        >
          <BaseFormMessage :errors="[message]" />
        </VeeErrorMessage>
      </div>
    </div>

    <p />

    <button
      :disabled="isSubmitting"
      :class="[meta.valid ? 'green' : 'red']"
      type="submit"
      class="fluid ui green button"
    >
      {{ $t("common.save") }}
    </button>
  </VeeForm>
</template>

<script>
import {
  ErrorMessage as VeeErrorMessage,
  Field as VeeField,
  Form as VeeForm,
} from "vee-validate";
import BaseFormMessage from "@/modules/base/components/BaseFormMessage.vue";

export default {
  name: "BankForm",
  components: {
    VeeForm,
    VeeField,
    VeeErrorMessage,
    BaseFormMessage,
  },
  props: {
    bank: {
      type: Object,
      required: true,
    },
  },
  emits: ["submitBank"],
  setup(props) {
    const creditConfigValidationSchema = {
      "creditConfiguration.minAmountInEuros": {
        required: true,
        integer: true,
        min_value: 0,
        max_value: Number.MAX_SAFE_INTEGER,
        amount_in_euros: true,
      },
      "creditConfiguration.maxAmountInEuros": {
        required: true,
        integer: true,
        min_value: 0,
        max_value: Number.MAX_SAFE_INTEGER,
        amount_in_euros: true,
      },
      "creditConfiguration.minTermInMonths": {
        required: true,
        integer: true,
        min_value: 0,
        max_value: Number.MAX_SAFE_INTEGER,
        term_in_months: true,
      },
      "creditConfiguration.maxTermInMonths": {
        required: true,
        integer: true,
        min_value: 0,
        max_value: Number.MAX_SAFE_INTEGER,
        term_in_months: true,
      },
      "creditConfiguration.minSchufaRating": {
        schufa_rating: true,
      },
      "creditConfiguration.maxSchufaRating": {
        schufa_rating: true,
      },
    };

    return {
      initialValues: {
        ...props.bank,
      },
      validationSchema: {
        thumbnailUrl: {
          required: true,
          url: true,
        },
        ...(props.bank.creditConfiguration ? creditConfigValidationSchema : {}),
      },
      ratingLevels: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "N",
        "O",
        "P",
      ],
    };
  },
  computed: {
    isAsyncBank() {
      return this.bank.isAsync;
    },
    hasCreditConfigurations() {
      return this.bank.creditConfiguration;
    },
  },
  methods: {
    onSubmit(values) {
      this.$emit("submitBank", values);
    },
  },
};
</script>

<style scoped>
.select {
  appearance: none;
}
</style>
