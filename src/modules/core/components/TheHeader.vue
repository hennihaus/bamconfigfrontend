<script setup lang="ts">
import TheLanguage from "@/modules/core/components/TheLanguage.vue";
import TheHeaderSidebar from "@/modules/core/components/TheHeaderSidebar.vue";

defineEmits<{ (event: "printTasks"): void }>();
</script>

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
    <RouterLink
      :to="{ name: 'TaskWrapper' }"
      active-class="active"
      class="item"
    >
      {{ $t("core.task", 2) }}
    </RouterLink>
    <RouterLink
      :to="{ name: 'BankWrapper' }"
      active-class="active"
      class="item"
    >
      {{ $t("core.bank", 2) }}
    </RouterLink>
    <RouterLink
      :to="{ name: 'TeamWrapper' }"
      active-class="active"
      class="item"
    >
      {{ $t("core.team", 2) }}
    </RouterLink>

    <TheHeaderSidebar @print-tasks="$emit('printTasks')" />
  </div>
</template>
