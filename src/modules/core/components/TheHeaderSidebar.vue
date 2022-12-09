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
            @click="recreateStatistics(limit)"
          >
            {{ limit }}
            <span v-if="limit === 1">{{ $tc("core.bank", 1) }}</span>
            <span v-else>{{ $tc("core.bank", 2) }}</span>
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

<script>
import BaseLoading from "@/modules/base/components/BaseLoading.vue";

export default {
  name: "TheHeaderSidebar",
  components: { BaseLoading },
  emits: ["printTasks"],
  data() {
    return {
      isLoading: false,
      banks: [],
    };
  },
  computed: {
    isTaskItemActive() {
      return this.$route.matched.some(({ name }) => name === "TheTask");
    },
    isBankItemActive() {
      return this.$route.matched.some(({ name }) => name === "TheBank");
    },
    isTeamItemActive() {
      return this.$route.matched.some(({ name }) => name === "TheTeam");
    },
  },
  created() {
    this.fetchBanks();
  },
  methods: {
    fetchBanks() {
      this.$bankApi
        .getAll()
        .then((banks) => (this.banks = banks))
        .catch(() => (this.banks = []));
    },
    recreateStatistics(limit) {
      if (confirm(this.$t("core.team-recreate-warning"))) {
        this.isLoading = true;

        this.$statisticApi
          .recreateAll(limit)
          .catch(() => alert(this.$t("core.team-recreate-error")))
          .finally(() => (this.isLoading = false));
      }
    },
  },
};
</script>
