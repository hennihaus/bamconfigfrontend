<template>
  <h4>{{ title }}</h4>
  <slot name="jmsQueue" />
  <div>Kreditminimum: {{ minAmountInEuros }}</div>
  <div>Kreditmaximum: {{ maxAmountInEuros }}</div>
  <div>Mindestlaufzeit: {{ creditConfiguration.minTermInMonths }} Monate</div>
  <div>Maximallaufzeit: {{ creditConfiguration.maxTermInMonths }} Monate</div>
  <div>Min. Schufa-Rating: {{ creditConfiguration.minSchufaRating }}</div>
  <div>Max. Schufa-Rating: {{ creditConfiguration.maxSchufaRating }}</div>
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
      default: "Krediteinstellungen",
    },
  },
  computed: {
    minAmountInEuros() {
      const formatter = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
      });
      return formatter.format(this.creditConfiguration.minAmountInEuros);
    },
    maxAmountInEuros() {
      const formatter = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
      });
      return formatter.format(this.creditConfiguration.maxAmountInEuros);
    },
  },
};
</script>
