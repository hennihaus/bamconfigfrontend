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
      v-if="!tasks.length"
      message="Es wurden keine Aufgaben gefunden."
      size="massive"
    />
  </template>
  <BaseLoading v-else />
</template>

<script>
import BaseMessage from "@/modules/base/components/BaseMessage.vue";
import TaskDetailsView from "@/modules/task/components/TaskDetailsView.vue";
import TaskEndpointList from "@/modules/task/components/TaskEndpointList.vue";
import BankCreditConfigurationList from "@/modules/bank/components/BankCreditConfigurationList.vue";
import BaseLoading from "@/modules/base/components/BaseLoading.vue";

export default {
  name: "TaskPrint",
  components: {
    BaseLoading,
    BankCreditConfigurationList,
    TaskEndpointList,
    TaskDetailsView,
    BaseMessage,
  },
  emits: ["close"],
  data() {
    return {
      isLoading: true,
      tasks: [],
    };
  },
  computed: {
    activatedTasks() {
      return this.tasks.filter((task) => {
        if (!task.banks.some((bank) => bank.isAsync)) {
          return true;
        }
        return task.banks.some((bank) => bank.isActive);
      });
    },
  },
  created() {
    this.fetchTasks();
  },
  mounted() {
    window.addEventListener("afterprint", this.onClose);
  },
  unmounted() {
    window.removeEventListener("afterprint", this.onClose);
  },
  methods: {
    fetchTasks() {
      this.$taskApi
        .getAll()
        .then((tasks) => (this.tasks = tasks))
        .catch(() => (this.tasks = []))
        .finally(() => (this.isLoading = false))
        .then(() => this.$nextTick())
        .then(() => setTimeout(() => window.print(), 1000));
    },
    onClose() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.page {
  page-break-before: always;
}
</style>
