<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useBanksFetch } from "@/modules/bank/composables/fetch";
import BaseLoading from "@/modules/base/components/BaseLoading.vue";
import { useBaseI18n } from "@/modules/base/composables/i18n";
import { useStatisticsFetch } from "@/modules/core/composables/fetch";

const { t } = useBaseI18n();
const route = useRoute();

defineEmits<{ (event: "printTasks"): void }>();

const isTaskItemActive = computed(() =>
  route.matched.some(({ name }) => name === "TheTask")
);
const isBankItemActive = computed(() =>
  route.matched.some(({ name }) => name === "TheBank")
);
const isTeamItemActive = computed(() =>
  route.matched.some(({ name }) => name === "TheTeam")
);

const { banks } = useBanksFetch();
const { isLoading, recreateStatistics } = useStatisticsFetch();

const onRecreateStatistics = (limit: number) => {
  if (confirm(t("core.team-recreate-warning"))) {
    recreateStatistics(limit).then((result) => {
      if (result === null) {
        alert(t("core.team-recreate-error"));
      }
    });
  }
};
</script>

<template>
  <div class="right menu">
    <div v-if="isTaskItemActive" class="item">
      <div class="tiny ui olive button" @click="$emit('printTasks')">
        {{ $t("core.task-print") }}
      </div>
    </div>

    <div v-if="isBankItemActive && banks.length" class="item">
      <div class="tiny ui yellow simple dropdown button">
        {{ $t("core.team-recreate") }}
        <div class="menu">
          <div
            v-for="limit in banks.length"
            :key="limit"
            class="item"
            @click="onRecreateStatistics(limit)"
          >
            {{ limit }}
            <span v-if="limit === 1">{{ $t("core.bank", 1) }}</span>
            <span v-else>{{ $t("core.bank", 2) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isTeamItemActive" class="item">
      <RouterLink :to="{ name: 'TeamCreate' }" class="tiny ui olive button">
        <div>{{ $t("team.create") }}</div>
      </RouterLink>
    </div>

    <div class="item">
      <div class="tiny ui orange button">{{ $t("core.logout") }}</div>
    </div>
  </div>

  <BaseLoading v-if="isLoading" />
</template>
