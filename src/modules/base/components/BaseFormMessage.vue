<template>
  <div v-for="error in errors" :key="error" class="ui negative message">
    {{ error }}
  </div>
</template>

<script>
export default {
  name: "BaseFormMessage",
  props: {
    errors: {
      type: Array,
      required: true,
    },
  },
};
</script>
