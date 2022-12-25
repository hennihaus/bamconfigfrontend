<script setup lang="ts">
import { useTasksFetch } from "@/modules/task/composables/fetch";
import BaseFrontendPagination from "@/modules/base/components/BaseFrontendPagination.vue";
import BaseLoading from "@/modules/base/components/BaseLoading.vue";
import TaskListItem from "@/modules/task/components/TaskListItem.vue";
import BaseMessage from "@/modules/base/components/BaseMessage.vue";
import { useTask } from "@/modules/task/composables/task";

const props = withDefaults(defineProps<{ pageNumber?: string | null }>(), {
  pageNumber: null,
});

const { tasks, isLoading, asyncTask } = useTasksFetch();
const { hasNoAsyncBanksActivated } = useTask(asyncTask);
</script>

<template>
  <template v-if="!isLoading">
    <BaseFrontendPagination
      :items="tasks"
      :page-number="props.pageNumber"
      component="TaskList"
    >
      <template #item="{ item }">
        <TaskListItem :key="item.uuid" :task="item" />
      </template>

      <template #message>
        <BaseMessage
          v-if="hasNoAsyncBanksActivated"
          :message="$t('task.no-async-banks')"
          type="warning"
        >
          <template #description>
            <p>{{ $t("task.no-async-banks-description") }}</p>
          </template>
        </BaseMessage>

        <BaseMessage v-if="!tasks.length" :message="$t('task.not-found', 2)" />
      </template>
    </BaseFrontendPagination>
  </template>
  <BaseLoading v-else />
</template>
