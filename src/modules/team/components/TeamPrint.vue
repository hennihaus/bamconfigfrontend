<template>
  <template v-if="!isLoading">
    <TeamDivision v-if="teams.length" :teams="teams" />

    <div v-for="team in teams" :key="team.uuid" class="page">
      <TeamDetailsView :team="team">
        <template #banks>
          <h4>Zu integrierende Banken</h4>
          <div v-for="bank in Object.keys(team.statistics)" :key="bank">
            {{ bank }}
          </div>
        </template>
      </TeamDetailsView>
    </div>

    <BaseMessage
      v-if="!teams.length"
      message="Es wurden keine Teams gefunden."
      size="massive"
    />
  </template>
  <BaseLoading v-else />
</template>

<script>
import TeamDivision from "@/modules/team/components/TeamDivision.vue";
import BaseLoading from "@/modules/base/components/BaseLoading.vue";
import TeamDetailsView from "@/modules/team/components/TeamDetailsView.vue";
import BaseMessage from "@/modules/base/components/BaseMessage.vue";

export default {
  name: "TeamPrint",
  components: {
    BaseMessage,
    TeamDetailsView,
    BaseLoading,
    TeamDivision,
  },
  emits: ["close"],
  data() {
    return {
      isLoading: true,
      teams: [],
    };
  },
  created() {
    this.fetchTeams();
  },
  mounted() {
    window.addEventListener("afterprint", this.onClose);
  },
  unmounted() {
    window.removeEventListener("afterprint", this.onClose);
  },
  methods: {
    fetchTeams() {
      this.$teamApi
        .getAll()
        .then((teams) => (this.teams = teams))
        .catch(() => (this.teams = []))
        .finally(() => (this.isLoading = false))
        .then(() => this.$nextTick())
        .then(() => setTimeout(() => window.print(), 1000));
    },
    onClose() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.page {
  page-break-before: always;
}
</style>
