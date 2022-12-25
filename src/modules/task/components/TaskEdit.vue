<script setup lang="ts">
import { useTaskFetch } from "@/modules/task/composables/fetch";
import { toRef } from "vue";
import BaseLoading from "@/modules/base/components/BaseLoading.vue";
import BaseMessage from "@/modules/base/components/BaseMessage.vue";
import TaskForm from "@/modules/task/components/TaskForm.vue";
import { useRouter } from "vue-router";
import type { Task } from "@hennihaus/bamconfigbackend";

const router = useRouter();

const props = defineProps<{ uuid: string }>();

const { task, isLoading, error, updateTask } = useTaskFetch(
  toRef(props, "uuid")
);

const onSubmitTask = (task: Task) => {
  updateTask(task).then((task) => {
    if (task) {
      router.push({ name: "TaskDetails", params: { uuid: task.uuid } });
    }
  });
};
</script>

<template>
  <template v-if="!isLoading">
    <BaseMessage v-if="error" :message="error" />
    <TaskForm v-if="task" :task="task" @submit-task="onSubmitTask">
      <template #task-headline>{{ $t("task.edit") }}</template>
      <template #parameters-headline>{{ $t("task.parameter-edit") }}</template>
      <template #responses-headline>{{ $t("task.response-edit") }}</template>
    </TaskForm>
  </template>
  <BaseLoading v-else />
</template>
