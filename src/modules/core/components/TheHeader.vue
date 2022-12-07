<template>
  <div class="ui menu">
    <TheLanguage />

    <RouterLink
      :to="{ name: 'TheHome' }"
      exact-active-class="active"
      class="item"
    >
      {{ $t("core.home") }}
    </RouterLink>
    <RouterLink :to="{ name: 'TaskList' }" active-class="active" class="item">
      {{ $tc("core.task", 2) }}
    </RouterLink>
    <RouterLink :to="{ name: 'BankList' }" active-class="active" class="item">
      {{ $tc("core.bank", 2) }}
    </RouterLink>
    <RouterLink :to="{ name: 'TeamList' }" active-class="active" class="item">
      {{ $tc("core.team", 2) }}
    </RouterLink>

    <TheHeaderSidebar @print-tasks="$emit('printTasks')" />
  </div>
</template>

<script>
import TheHeaderSidebar from "@/modules/core/components/TheHeaderSidebar.vue";
import TheLanguage from "@/modules/core/components/TheLanguage.vue";

export default {
  name: "TheHeader",
  components: { TheLanguage, TheHeaderSidebar },
  emits: ["printTasks"],
};
</script>
