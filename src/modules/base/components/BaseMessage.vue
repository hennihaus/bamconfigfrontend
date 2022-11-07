<template>
  <div class="ui message" :class="[type, size]">
    <div class="header">
      {{ message }}
    </div>
    <slot name="description" />
  </div>
</template>

<script>
export default {
  name: "BaseMessage",
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: "negative",
    },
    size: {
      type: String,
      required: false,
      default: "",
    },
  },
};
</script>
