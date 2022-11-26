<template>
  <div class="right menu">
    <div v-if="isTaskItemActive" class="item">
      <div class="tiny ui olive button" @click="$emit('printTasks')">
        Komplette Aufgabenstellung
      </div>
    </div>
    <div v-if="isTeamItemActive" class="item">
      <div class="tiny ui olive button" @click="$emit('printTeams')">
        Teams drucken
      </div>
    </div>
    <div v-if="isTeamItemActive" class="item">
      <RouterLink :to="{ name: 'TeamCreate' }" class="tiny ui olive button">
        <div>Neues Team</div>
      </RouterLink>
    </div>
    <div class="item">
      <div class="tiny ui orange button">TODO</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheHeaderSidebar",
  emits: ["printTeams", "printTasks"],
  computed: {
    isTaskItemActive() {
      return this.$route.matched.some(({ name }) => name === "TheTask");
    },
    isTeamItemActive() {
      return this.$route.matched.some(({ name }) => name === "TheTeam");
    },
  },
};
</script>
