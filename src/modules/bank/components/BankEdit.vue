<template>
  <h1>TODO</h1>
  <div>UUID: {{ uuid }}</div>
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
