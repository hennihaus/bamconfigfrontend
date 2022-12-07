<template>
  <h4>{{ computedTitle }}</h4>
  <slot name="jmsQueue" />
  <div>
    {{ $t("bank.credit-configuration-min-amount-in-euros") }}:
    {{ $n(creditConfiguration.minAmountInEuros, "currency", "de-DE") }}
  </div>
  <div>
    {{ $t("bank.credit-configuration-max-amount-in-euros") }}:
    {{ $n(creditConfiguration.maxAmountInEuros, "currency", "de-DE") }}
  </div>
  <div>
    {{ $t("bank.credit-configuration-min-term-in-months") }}:
    {{ creditConfiguration.minTermInMonths }}
    {{ $tc("bank.credit-configuration-month", 2) }}
  </div>
  <div>
    {{ $t("bank.credit-configuration-max-term-in-months") }}:
    {{ creditConfiguration.maxTermInMonths }}
    {{ $tc("bank.credit-configuration-month", 2) }}
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

<script>
export default {
  name: "BankCreditConfigurationListItem",
  props: {
    creditConfiguration: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: false,
      default: null,
    },
  },
  computed: {
    computedTitle() {
      return this.title ? this.title : this.$t("bank.credit-configuration");
    },
  },
};
</script>
