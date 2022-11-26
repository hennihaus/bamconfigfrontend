<template>
  <template v-if="!isLoading">
    <h1>Team hinzufügen</h1>
    <BaseMessage v-if="message" :message="message" />
    <TeamForm :banks="banks" @submit-team="createTeam" />
  </template>
  <BaseLoading v-else />
</template>

<script>
import TeamForm from "@/modules/team/components/TeamForm.vue";
import BaseLoading from "@/modules/base/components/BaseLoading.vue";
import { getRandomAvatarThumbnailUrl } from "@/modules/team/services/thumbnail-service";
import BaseMessage from "@/modules/base/components/BaseMessage.vue";

export default {
  name: "TeamCreate",
  components: { BaseMessage, BaseLoading, TeamForm },
  setup() {
    return {
      thumbnailUrl: getRandomAvatarThumbnailUrl(),
    };
  },
  data() {
    return {
      isLoading: true,
      message: "",
      banks: [],
    };
  },
  created() {
    this.fetchBanks();
  },
  methods: {
    fetchBanks() {
      this.$bankApi
        .getAll()
        .then((banks) => (this.banks = banks))
        .catch(() => (this.banks = []))
        .finally(() => (this.isLoading = false));
    },
    createTeam(team) {
      this.isLoading = true;

      this.$teamApi
        .update(team.uuid, team)
        .then(({ uuid }) => {
          this.$router.push({
            name: "TeamDetails",
            params: {
              uuid,
              thumbnailUrl: this.thumbnailUrl,
            },
          });
        })
        .catch(() => (this.message = "Fehler beim Erstellen des Teams."))
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>
