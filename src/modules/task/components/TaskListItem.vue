<script setup lang="ts">
import type { Task } from "@hennihaus/bamconfigbackend";
import { toRef } from "vue";
import { useTask } from "@/modules/task/composables/task";

const props = defineProps<{ task: Task }>();

const { integrationStep, thumbnailUrl, isAsyncTask } = useTask(
  toRef(props, "task")
);
</script>

<template>
  <RouterLink
    :to="{ name: 'TaskDetails', params: { uuid: task.uuid } }"
    class="item custom-item"
  >
    <img
      v-if="!isAsyncTask"
      v-base-image-error
      :src="thumbnailUrl"
      class="ui tiny image custom-image"
    />
    <img
      v-else
      v-base-image-error
      src="https://activemq.apache.org/assets/img/activemq_logo_white_vertical.png"
      class="ui tiny image custom-image"
    />

    <div class="content">
      <div class="header">
        {{ task.title }}
      </div>
      <div class="description">
        {{ integrationStep }} {{ $t("task.integration-step") }}
      </div>
      <div class="metadata">
        <span v-for="(endpoint, index) in task.endpoints" :key="endpoint.uuid">
          {{ endpoint.type
          }}<span v-if="index !== task.endpoints.length - 1">, </span>
        </span>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.custom-item {
  display: flex !important;
  height: 95px;
  align-items: center;
}

.custom-image {
  max-height: 80px;
  max-width: 80px;
}
</style>
