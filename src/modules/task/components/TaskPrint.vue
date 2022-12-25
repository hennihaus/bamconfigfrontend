<script setup lang="ts">
import { useTasksFetch } from "@/modules/task/composables/fetch";
import { nextTick, onMounted, onUnmounted } from "vue";
import TaskDetailsView from "@/modules/task/components/TaskDetailsView.vue";
import TaskEndpointList from "@/modules/task/components/TaskEndpointList.vue";
import BankCreditConfigurationList from "@/modules/bank/components/BankCreditConfigurationList.vue";
import BaseLoading from "@/modules/base/components/BaseLoading.vue";
import BaseMessage from "@/modules/base/components/BaseMessage.vue";

const emit = defineEmits<{ (event: "close"): void }>();

const afterTaskFetch = () => {
  nextTick().then(() => setTimeout(() => window.print(), 1000));
};
const { activatedTasks, isLoading } = useTasksFetch(afterTaskFetch);

const onClose = () => emit("close");
onMounted(() => window.addEventListener("afterprint", onClose));
onUnmounted(() => window.removeEventListener("afterprint", onClose));
</script>

<template>
  <template v-if="!isLoading">
    <div v-for="task in activatedTasks" :key="task.uuid" class="page">
      <TaskDetailsView :task="task">
        <template #details>
          <BankCreditConfigurationList :banks="task.banks" />

          <TaskEndpointList :endpoints="task.endpoints" />
        </template>
      </TaskDetailsView>
    </div>

    <BaseMessage
      v-if="!activatedTasks.length"
      :message="$t('task.not-found', 2)"
      size="massive"
    />
  </template>
  <BaseLoading v-else />
</template>

<style scoped>
.page {
  page-break-before: always;
}
</style>
