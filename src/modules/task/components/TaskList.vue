<template>
  <div v-if="!isLoading" class="ui middle aligned selection divided list">
    <TaskListItem v-for="task in tasks" :key="task.uuid" :task="task" />

    <BaseMessage
      v-if="hasNoAsyncBanksActivated"
      type="warning"
      :message="$t('task.no-async-banks')"
    >
      <template #description>
        <p>{{ $t("task.no-async-banks-description") }}</p>
      </template>
    </BaseMessage>

    <BaseMessage v-if="!tasks.length" :message="$tc('task.not-found', 2)" />
  </div>
  <BaseLoading v-else />
</template>

<script>
import TaskListItem from "@/modules/task/components/TaskListItem.vue";
import BaseMessage from "@/modules/base/components/BaseMessage.vue";
import BaseLoading from "@/modules/base/components/BaseLoading.vue";

export default {
  name: "TaskList",
  components: { BaseLoading, BaseMessage, TaskListItem },
  data() {
    return {
      isLoading: true,
      tasks: [],
    };
  },
  computed: {
    hasNoAsyncBanksActivated() {
      if (this.tasks.length === 0) {
        return false;
      }
      return !this.tasks
        .flatMap((task) => task.banks)
        .filter((bank) => bank.isAsync)
        .some((bank) => bank.isActive);
    },
  },
  created() {
    this.fetchTasks();
  },
  methods: {
    fetchTasks() {
      this.$taskApi
        .getAll()
        .then((tasks) => (this.tasks = tasks))
        .catch(() => (this.tasks = []))
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>
