<script setup lang="ts">
import { useTaskFetch } from "@/modules/task/composables/fetch";
import { toRef } from "vue";
import TaskDetailsView from "@/modules/task/components/TaskDetailsView.vue";
import BaseMessage from "@/modules/base/components/BaseMessage.vue";
import BaseLoading from "@/modules/base/components/BaseLoading.vue";

const props = defineProps<{ uuid: string }>();

const { task, isLoading, error } = useTaskFetch(toRef(props, "uuid"));
</script>

<template>
  <template v-if="!isLoading">
    <TaskDetailsView v-if="task" :task="task">
      <template #options>
        <RouterLink :to="{ name: 'TaskEdit', params: { uuid } }">
          <button class="ui tiny yellow labeled icon button">
            <i class="write icon" /> {{ $t("task.edit") }}
          </button>
        </RouterLink>
      </template>
    </TaskDetailsView>

    <BaseMessage v-if="error" :message="error" />
  </template>
  <BaseLoading v-else />
</template>
