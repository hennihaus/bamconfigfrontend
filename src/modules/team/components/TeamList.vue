<template>
  <div v-if="!isLoading" class="ui middle aligned selection divided list">
    <TeamListItem v-for="team in teams" :key="team.uuid" :team="team" />

    <BaseMessage
      v-if="!teams.length"
      message="Es wurden keine Teams gefunden."
    />
  </div>
  <BaseLoading v-else />
</template>

<script>
import BaseLoading from "@/modules/base/components/BaseLoading.vue";
import TeamListItem from "@/modules/team/components/TeamListItem.vue";
import BaseMessage from "@/modules/base/components/BaseMessage.vue";

export default {
  name: "TeamList",
  components: { BaseMessage, TeamListItem, BaseLoading },
  data() {
    return {
      isLoading: true,
      teams: [],
    };
  },
  created() {
    this.fetchTeams();
  },
  methods: {
    fetchTeams() {
      this.$teamApi
        .getAll()
        .then((teams) => (this.teams = teams))
        .catch(() => (this.teams = []))
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>
