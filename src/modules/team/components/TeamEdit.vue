<template>
  <h1>TODO</h1>
  <p>UUID: {{ uuid }}</p>
  <p>Thumbnail URL: {{ thumbnailUrl }}</p>
</template>

<script>
export default {
  name: "TeamEdit",
  props: {
    uuid: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
  },
};
</script>
