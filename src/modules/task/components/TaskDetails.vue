<template>
  <template v-if="!isLoading">
    <TaskDetailsView v-if="task" :task="task">
      <template #options>
        <RouterLink :to="{ name: 'TaskEdit', params: { uuid } }">
          <button class="ui tiny yellow labeled icon button">
            <i class="write icon" /> Aufgabe bearbeiten
          </button>
        </RouterLink>
      </template>
    </TaskDetailsView>

    <BaseMessage v-if="message" :message="message" />
  </template>
  <BaseLoading v-else />
</template>

<script>
import BaseLoading from "@/modules/base/components/BaseLoading.vue";
import BaseMessage from "@/modules/base/components/BaseMessage.vue";
import TaskDetailsView from "@/modules/task/components/TaskDetailsView.vue";

export default {
  name: "TaskDetails",
  components: { TaskDetailsView, BaseMessage, BaseLoading },
  props: {
    uuid: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isLoading: true,
      task: null,
      message: "",
    };
  },
  watch: {
    uuid: {
      handler() {
        this.fetchTask();
      },
      immediate: true,
    },
  },
  methods: {
    fetchTask() {
      this.isLoading = true;

      this.$taskApi
        .getOne(this.uuid)
        .then((task) => {
          this.task = task;
          this.message = "";
        })
        .catch(() => (this.message = "Aufgabe wurde nicht gefunden."))
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>
