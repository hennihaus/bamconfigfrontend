<script setup lang="ts">
import { useField } from "vee-validate";
import { useBaseI18n } from "@/modules/base/composables/i18n";
import BaseFormMessage from "@/modules/base/components/BaseFormMessage.vue";
import { RatingLevel } from "@/models/rating-level";

const { t } = useBaseI18n();
const ratingLevels = RatingLevel;

const {
  value: minAmountInEuros,
  errors: minAmountInEurosErrors,
  validate: validateMinAmountInEuros,
  handleChange: handleMinAmountInEurosChange,
  handleBlur: handleMinAmountInEurosBlur,
} = useField<number>(
  "creditConfiguration.minAmountInEuros",
  {
    required: true,
    integer: true,
    min_value: 0,
    max_value: Number.MAX_SAFE_INTEGER,
    amount_in_euros: true,
  },
  {
    validateOnValueUpdate: false,
    label: t("bank.credit-configuration-min-amount-in-euros"),
  }
);
const {
  value: maxAmountInEuros,
  errors: maxAmountInEurosErrors,
  validate: validateMaxAmountInEuros,
  handleChange: handleMaxAmountInEurosChange,
  handleBlur: handleMaxAmountInEurosBlur,
} = useField<number>(
  "creditConfiguration.maxAmountInEuros",
  {
    required: true,
    integer: true,
    min_value: 0,
    max_value: Number.MAX_SAFE_INTEGER,
    amount_in_euros: true,
  },
  {
    validateOnValueUpdate: false,
    label: t("bank.credit-configuration-max-amount-in-euros"),
  }
);
const handleMinAmountInEurosInput = (event: Event) => {
  handleMinAmountInEurosChange(event);
  validateMaxAmountInEuros();
};
const handleMaxAmountInEurosInput = (event: Event) => {
  handleMaxAmountInEurosChange(event);
  validateMinAmountInEuros();
};

const {
  value: minTermInMonths,
  errors: minTermInMonthsErrors,
  validate: validateMinTermInMonths,
  handleChange: handleMinTermInMonthsChange,
  handleBlur: handleMinTermInMonthsBlur,
} = useField<number>(
  "creditConfiguration.minTermInMonths",
  {
    required: true,
    integer: true,
    min_value: 0,
    max_value: Number.MAX_SAFE_INTEGER,
    term_in_months: true,
  },
  { label: t("bank.credit-configuration-min-term-in-months") }
);
const {
  value: maxTermInMonths,
  errors: maxTermInMonthsErrors,
  validate: validateMaxTermInMonths,
  handleChange: handleMaxTermInMonthsChange,
  handleBlur: handleMaxTermInMonthsBlur,
} = useField<number>(
  "creditConfiguration.maxTermInMonths",
  {
    required: true,
    integer: true,
    min_value: 0,
    max_value: Number.MAX_SAFE_INTEGER,
    term_in_months: true,
  },
  { label: t("bank.credit-configuration-max-term-in-months") }
);
const handleMinTermInMonthsInput = (event: Event) => {
  handleMinTermInMonthsChange(event);
  validateMaxTermInMonths();
};
const handleMaxTermInMonthsInput = (event: Event) => {
  handleMaxTermInMonthsChange(event);
  validateMinTermInMonths();
};

const {
  value: minSchufaRating,
  errors: minSchufaRatingErrors,
  validate: validateMinSchufaRating,
  handleChange: handleMinSchufaRatingChange,
  handleBlur: handleMinSchufaRatingBlur,
} = useField<RatingLevel>("creditConfiguration.minSchufaRating", {
  schufa_rating: true,
});
const {
  value: maxSchufaRating,
  errors: maxSchufaRatingErrors,
  validate: validateMaxSchufaRating,
  handleChange: handleMaxSchufaRatingChange,
  handleBlur: handleMaxSchufaRatingBlur,
} = useField<RatingLevel>("creditConfiguration.maxSchufaRating", {
  schufa_rating: true,
});
const handleMinSchufaRatingInput = (event: Event) => {
  handleMinSchufaRatingChange(event);
  validateMaxSchufaRating();
};
const handleMaxSchufaRatingInput = (event: Event) => {
  handleMaxSchufaRatingChange(event);
  validateMinSchufaRating();
};
</script>

<template>
  <div class="fields">
    <div class="field">
      <label>
        {{ $t("bank.credit-configuration-min-amount-in-euros") }}
        ({{ $t("common.money") }})
      </label>
      <div class="ui left corner labeled input">
        <input
          :value="minAmountInEuros"
          type="number"
          @input="handleMinAmountInEurosInput"
          @blur="handleMinAmountInEurosBlur"
        />
        <div class="ui left corner label">
          <i class="asterisk icon" />
        </div>
      </div>
      <BaseFormMessage :errors="minAmountInEurosErrors" />
    </div>

    <div class="field">
      <label>
        {{ $t("bank.credit-configuration-max-amount-in-euros") }}
        ({{ $t("common.money") }})
      </label>
      <div class="ui left corner labeled input">
        <input
          :value="maxAmountInEuros"
          type="number"
          @input="handleMaxAmountInEurosInput"
          @blur="handleMaxAmountInEurosBlur"
        />
        <div class="ui left corner label">
          <i class="asterisk icon" />
        </div>
      </div>
      <BaseFormMessage :errors="maxAmountInEurosErrors" />
    </div>
  </div>

  <div class="fields">
    <div class="field">
      <label>
        {{ $t("bank.credit-configuration-min-term-in-months") }}
        ({{ $t("bank.credit-configuration-month", 2) }})
      </label>
      <div class="ui left corner labeled input">
        <input
          :value="minTermInMonths"
          type="number"
          @input="handleMinTermInMonthsInput"
          @blur="handleMinTermInMonthsBlur"
        />
        <div class="ui left corner label">
          <i class="asterisk icon" />
        </div>
      </div>
      <BaseFormMessage :errors="minTermInMonthsErrors" />
    </div>

    <div class="field">
      <label>
        {{ $t("bank.credit-configuration-max-term-in-months") }}
        ({{ $t("bank.credit-configuration-month", 2) }})
      </label>
      <div class="ui left corner labeled input">
        <input
          :value="maxTermInMonths"
          type="number"
          @input="handleMaxTermInMonthsInput"
          @blur="handleMaxTermInMonthsBlur"
        />
        <div class="ui left corner label">
          <i class="asterisk icon" />
        </div>
      </div>
      <BaseFormMessage :errors="maxTermInMonthsErrors" />
    </div>
  </div>

  <div class="fields">
    <div class="field">
      <label>{{ $t("bank.credit-configuration-min-schufa-rating") }}</label>
      <select
        :value="minSchufaRating"
        class="select"
        @input="handleMinSchufaRatingInput"
        @blur="handleMinSchufaRatingBlur"
      >
        <option
          v-for="(ratingLevel, index) in ratingLevels"
          :key="index + ratingLevel"
          :value="ratingLevel"
          :selected="minSchufaRating === ratingLevel"
        >
          {{ ratingLevel }}
        </option>
      </select>
      <BaseFormMessage :errors="minSchufaRatingErrors" />
    </div>

    <div class="field">
      <label>{{ $t("bank.credit-configuration-max-schufa-rating") }}</label>
      <select
        :value="maxSchufaRating"
        class="select"
        @input="handleMaxSchufaRatingInput"
        @blur="handleMaxSchufaRatingBlur"
      >
        <option
          v-for="(ratingLevel, index) in ratingLevels"
          :key="ratingLevel + index"
          :value="ratingLevel"
          :selected="maxSchufaRating === ratingLevel"
        >
          {{ ratingLevel }}
        </option>
      </select>
      <BaseFormMessage :errors="maxSchufaRatingErrors" />
    </div>
  </div>
</template>

<style scoped>
.select {
  appearance: none;
}
</style>
