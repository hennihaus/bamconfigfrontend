<template>
  <div class="container">
    <div class="header">
      <TheHeader @print-teams="onPrintTeams" @print-tasks="onPrintTasks" />
    </div>
    <div class="content">
      <RouterView />
    </div>
  </div>
  <TeamPrint v-if="isPrintingTeams" @close="onPrintClose" />
  <TaskPrint v-if="isPrintingTasks" @close="onPrintClose" />
</template>

<script>
import TheHeader from "@/modules/core/components/TheHeader.vue";
import TeamPrint from "@/modules/team/components/TeamPrint.vue";
import TaskPrint from "@/modules/task/components/TaskPrint.vue";

export default {
  name: "TheCore",
  components: { TaskPrint, TeamPrint, TheHeader },
  data() {
    return {
      isPrintingTeams: false,
      isPrintingTasks: false,
    };
  },
  methods: {
    onPrintTeams() {
      this.isPrintingTeams = true;
      this.isPrintingTasks = false;
    },
    onPrintTasks() {
      this.isPrintingTeams = false;
      this.isPrintingTasks = true;
    },
    onPrintClose() {
      this.isPrintingTeams = false;
      this.isPrintingTasks = false;
    },
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  margin-bottom: 30px;
}

.header {
  margin-bottom: 1rem;
}

.content {
  height: 100%;
  padding-bottom: 30px;
}

@media print {
  .container {
    display: none;
  }
}
</style>
