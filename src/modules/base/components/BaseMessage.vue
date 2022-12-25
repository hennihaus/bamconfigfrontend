<script setup lang="ts">
withDefaults(
  defineProps<{
    message: string;
    type?: string;
    size?: string;
  }>(),
  {
    type: "negative",
    size: "",
  }
);
</script>

<template>
  <div class="ui message" :class="[type, size]">
    <div class="header">
      {{ message }}
    </div>
    <slot name="description" />
  </div>
</template>
