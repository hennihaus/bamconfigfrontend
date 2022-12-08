<template>
  <BaseCursorPagination :pagination="pagination" component="TeamList">
    <template #items>
      <TeamListItem v-for="team in teams" :key="team.uuid" :team="team" />

      <BaseMessage
        v-if="!isLoading && !teams.length"
        :message="$tc('team.not-found', 2)"
      />
    </template>
    <template #filters>
      <div class="filter">
        <TeamListFilter :banks="banks" />
      </div>
    </template>
  </BaseCursorPagination>
  <BaseLoading v-if="isLoading" />
</template>

<script>
import BaseLoading from "@/modules/base/components/BaseLoading.vue";
import TeamListItem from "@/modules/team/components/TeamListItem.vue";
import BaseMessage from "@/modules/base/components/BaseMessage.vue";
import BaseCursorPagination from "@/modules/base/components/BaseCursorPagination.vue";
import TeamListFilter from "@/modules/team/components/TeamListFilter.vue";

export default {
  name: "TeamList",
  components: {
    TeamListFilter,
    BaseCursorPagination,
    BaseMessage,
    TeamListItem,
    BaseLoading,
  },
  setup() {
    return {
      itemsPerPage: 8,
    };
  },
  data() {
    return {
      isLoading: true,
      pagination: null,
      teams: [],
      banks: [],
    };
  },
  created() {
    this.$watch(
      () => this.$route.query,
      (newQuery, oldQuery) => {
        if (JSON.stringify(newQuery) !== JSON.stringify(oldQuery)) {
          this.fetchAll();
        }
      },
      { immediate: true }
    );
  },
  methods: {
    fetchAll() {
      this.isLoading = true;
      Promise.all([this.fetchBanks(), this.fetchTeams()]).finally(
        () => (this.isLoading = false)
      );
    },
    fetchBanks() {
      return this.$bankApi
        .getAll()
        .then((banks) => (this.banks = banks))
        .catch(() => (this.banks = []));
    },
    fetchTeams() {
      let params = this.$route.query.cursor
        ? { cursor: this.$route.query.cursor }
        : { ...this.$route.query, limit: this.itemsPerPage };

      if (Object.hasOwn(params, "hasPassed")) {
        params = {
          ...params,
          hasPassed: params.hasPassed === "PASSED",
        };
      }
      return this.$teamApi
        .getAll(params)
        .then((response) => {
          this.pagination = response.pagination;
          this.teams = response.items;
        })
        .catch(() => (this.teams = []));
    },
  },
};
</script>

<style scoped>
.filter {
  width: 256.25px;
}
</style>
