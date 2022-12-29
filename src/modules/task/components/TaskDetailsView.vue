<script setup lang="ts">
import type { Task } from "@hennihaus/bamconfigbackend";
import { useTask } from "@/modules/task/composables/task";
import { toRef } from "vue";
import TaskEndpointList from "@/modules/task/components/TaskEndpointList.vue";
import { useContact } from "@/modules/task/composables/contact";
import TaskTableList from "@/modules/task/components/TaskTableList.vue";

const props = defineProps<{ task: Task }>();

const {
  integrationStep,
  thumbnailUrl,
  description,
  isAsyncTask,
  hasNoAsyncBanksActivated,
  updatedAt,
} = useTask(toRef(props, "task"));

const { name, emailLink } = useContact(toRef(props, "task"));
</script>

<template>
  <h1>{{ task.title }}</h1>
  <h3>{{ integrationStep }} {{ $t("task.integration-step") }}</h3>

  <div class="ui divider" />

  <div id="task-details" class="ui grid"></div>

  <h4>{{ $t("task.description") }}</h4>
  <p v-dompurify-html="description" />

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
        <h4>{{ $t("common.last-updated") }}</h4>
        <div>{{ $d(updatedAt, "long") }}</div>
      </div>

      <div class="four wide column">
        <h4>{{ $t("core.bank", 2) }}</h4>
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
        <div>{{ $t("common.name") }}: {{ name }}</div>
        <div>
          {{ $t("task.email") }}:
          <a :href="emailLink">{{ task.contact.email }}</a>
        </div>
        <h4 v-if="$slots.options">{{ $t("task.option", 2) }}</h4>
        <slot name="options" />
      </div>
    </Teleport>
  </slot>

  <TaskTableList :parameters="task.parameters" :responses="task.responses" />
</template>
