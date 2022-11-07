<template>
  <h1>TODO</h1>
  <p>UUID: {{ uuid }}</p>
</template>

<script>
export default {
  name: "TaskEdit",
  props: {
    uuid: {
      type: String,
      required: true,
    },
  },
};
</script>
