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
        {{ task.integrationStep }}{{ integrationStep }}
        {{ $t("task.integration-step") }}
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

<script>
import baseImageError from "@/modules/base/directives/base-image-error";

export default {
  name: "TaskListItem",
  directives: {
    baseImageError,
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isAsyncTask() {
      return (
        this.task.banks && this.task.banks.length && this.task.banks[0].isAsync
      );
    },
    thumbnailUrl() {
      return this.task.banks[0].thumbnailUrl;
    },
    integrationStep() {
      if (this.$i18n.locale === "de") {
        return ".";
      }
      if (this.task.integrationStep === 1) {
        return "st";
      }
      if (this.task.integrationStep === 2) {
        return "nd";
      }
      if (this.task.integrationStep === 3) {
        return "rd";
      }
      return "th";
    },
  },
};
</script>

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
