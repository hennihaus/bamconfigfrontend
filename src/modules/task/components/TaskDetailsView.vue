<template>
  <h1>{{ task.title }}</h1>
  <h3>
    {{ task.integrationStep }}{{ integrationStep }}
    {{ $t("task.integration-step") }}
  </h3>

  <div class="ui divider" />

  <div id="task-details" class="ui grid"></div>

  <h4>{{ $t("task.description") }}</h4>
  <p v-dompurify-html="taskDescription" />

  <slot name="details">
    <Teleport to="#task-details">
      <div class="two wide column">
        <img
          v-if="!isAsyncTask"
          v-base-image-error
          :src="thumbnailUrl"
          class="ui small image"
        />
        <img
          v-else
          v-base-image-error
          src="https://activemq.apache.org/assets/img/activemq_logo_white_vertical.png"
          class="ui small image"
        />
      </div>

      <div class="six wide column">
        <TaskEndpointList :endpoints="task.endpoints" />
      </div>

      <div class="four wide column">
        <h4>{{ $tc("core.bank", 2) }}</h4>
        <template v-for="bank in task.banks" :key="bank.uuid">
          <div v-if="bank.isActive">
            {{ bank.name }}
          </div>
        </template>
        <div v-if="hasNoAsyncBanksActivated">
          {{ $t("task.no-async-banks") }}
        </div>
      </div>

      <div class="four wide column">
        <h4>{{ $t("task.contact") }}</h4>
        <div>{{ $t("common.name") }}: {{ contactName }}</div>
        <div>
          {{ $t("task.email") }}:
          <a :href="contactEmailLink">{{ task.contact.email }}</a>
        </div>
        <h4 v-if="$slots.options">{{ $tc("task.option", 2) }}</h4>
        <slot name="options" />
      </div>
    </Teleport>
  </slot>

  <TaskTableList :parameters="task.parameters" :responses="task.responses" />
</template>

<script>
import baseImageError from "@/modules/base/directives/base-image-error";
import TaskEndpointList from "@/modules/task/components/TaskEndpointList.vue";
import TaskTableList from "@/modules/task/components/TaskTableList.vue";

export default {
  name: "TaskDetailsView",
  components: { TaskTableList, TaskEndpointList },
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
    hasNoAsyncBanksActivated() {
      if (!this.task.banks.some((bank) => bank.isAsync)) {
        return false;
      }
      return !this.task.banks
        .filter((bank) => bank.isAsync)
        .some((bank) => bank.isActive);
    },
    contactName() {
      return `${this.task.contact.firstname} ${this.task.contact.lastname}`;
    },
    contactEmailLink() {
      return `mailto:${this.task.contact.email}`;
    },
    taskDescription() {
      return this.task.description && this.task.description.length
        ? this.task.description
        : `${this.$t("task.description")} ${this.$tc("common.available", 0)}`;
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
