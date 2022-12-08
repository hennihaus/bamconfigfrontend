<template>
  <template v-if="!isLoading">
    <BaseFrontendPagination
      :items="tasks"
      :page-number="pageNumber"
      component="TaskList"
    >
      <template #item="{ item }">
        <TaskListItem :key="item.uuid" :task="item" />
      </template>

      <template #message>
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
      </template>
    </BaseFrontendPagination>
  </template>
  <BaseLoading v-else />
</template>

<script>
import BaseFrontendPagination from "@/modules/base/components/BaseFrontendPagination.vue";
import TaskListItem from "@/modules/task/components/TaskListItem.vue";
import BaseMessage from "@/modules/base/components/BaseMessage.vue";
import BaseLoading from "@/modules/base/components/BaseLoading.vue";

export default {
  name: "TaskList",
  components: {
    BaseFrontendPagination,
    BaseLoading,
    BaseMessage,
    TaskListItem,
  },
  props: {
    pageNumber: {
      type: String,
      required: false,
      default: null,
    },
  },
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
