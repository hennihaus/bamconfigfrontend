<template>
  <RouterLink
    :to="{ name: 'TaskDetails', params: { uuid: task.uuid } }"
    class="item"
  >
    <img
      v-if="!isAsyncTask"
      v-base-image-zoom
      v-base-image-error
      :src="thumbnailUrl"
      class="ui tiny image"
    />
    <img
      v-else
      v-base-image-zoom
      v-base-image-error
      src="https://activemq.apache.org/assets/img/activemq_logo_white_vertical.png"
      class="ui tiny image"
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
import baseImageZoom from "@/modules/base/directives/base-image-zoom";
import baseImageError from "@/modules/base/directives/base-image-error";

export default {
  name: "TaskListItem",
  directives: {
    baseImageZoom,
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
