<template>
  <h1>{{ $t("task.edit") }}</h1>
  <p>{{ uuid }}</p>
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
