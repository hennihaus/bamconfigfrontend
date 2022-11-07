<template>
  <div class="ui menu">
    <RouterLink
      :to="{ name: 'TheHome' }"
      exact-active-class="active"
      class="item"
    >
      Home
    </RouterLink>
    <RouterLink :to="{ name: 'TaskList' }" active-class="active" class="item">
      Aufgaben
    </RouterLink>
    <RouterLink :to="{ name: 'BankList' }" active-class="active" class="item">
      Banken
    </RouterLink>
    <RouterLink :to="{ name: 'TeamList' }" active-class="active" class="item">
      Teams
    </RouterLink>

    <TheHeaderSidebar
      @print-teams="$emit('printTeams')"
      @print-tasks="$emit('printTasks')"
    />
  </div>
</template>

<script>
import TheHeaderSidebar from "@/modules/core/components/TheHeaderSidebar.vue";

export default {
  name: "TheHeader",
  components: { TheHeaderSidebar },
  emits: ["printTeams", "printTasks"],
};
</script>
