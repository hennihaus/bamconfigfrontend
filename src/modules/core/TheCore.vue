<script setup lang="ts">
import { ref } from "vue";
import TheHeader from "@/modules/core/components/TheHeader.vue";
import TaskPrint from "@/modules/task/components/TaskPrint.vue";

const isPrintingTasks = ref(false);
const onPrintTasks = () => (isPrintingTasks.value = true);
const onPrintClose = () => (isPrintingTasks.value = false);
</script>

<template>
  <div class="container">
    <div class="header">
      <TheHeader @print-tasks="onPrintTasks" />
    </div>
    <div class="content">
      <RouterView />
    </div>
  </div>
  <TaskPrint v-if="isPrintingTasks" @close="onPrintClose" />
</template>

<style scoped>
.container {
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
}

.header {
  margin-bottom: 1rem;
}

.content {
  height: 100%;
  padding-bottom: 10px;
}

@media print {
  .container {
    display: none;
  }
}
</style>
