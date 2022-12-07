<template>
  <h1>{{ $t("bank.edit") }}</h1>
  <div>{{ uuid }}</div>
</template>

<script>
export default {
  name: "BankEdit",
  props: {
    uuid: {
      type: String,
      required: true,
    },
  },
};
</script>
