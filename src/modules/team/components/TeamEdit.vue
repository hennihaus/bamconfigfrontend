<template>
  <template v-if="!isLoading">
    <h1>{{ $t("team.edit") }}</h1>
    <BaseMessage v-if="message" :message="message" />
    <TeamForm
      v-if="hasData"
      :team="team"
      :banks="banks"
      @submit-team="updateTeam"
    />
  </template>
  <BaseLoading v-else />
</template>

<script>
import BaseLoading from "@/modules/base/components/BaseLoading.vue";
import BaseMessage from "@/modules/base/components/BaseMessage.vue";
import TeamForm from "@/modules/team/components/TeamForm.vue";

export default {
  name: "TeamEdit",
  components: { BaseMessage, BaseLoading, TeamForm },
  props: {
    uuid: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isLoading: true,
      team: null,
      banks: [],
      message: "",
    };
  },
  computed: {
    hasData() {
      return this.team && this.banks;
    },
  },
  watch: {
    uuid: {
      handler() {
        this.fetchAll();
      },
      immediate: true,
    },
  },
  methods: {
    updateTeam(team) {
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
        .catch(() => (this.message = this.$t("team.edit-error")))
        .finally(() => (this.isLoading = false));
    },
    fetchAll() {
      this.isLoading = true;
      Promise.all([this.fetchTeam(), this.fetchBanks()]).finally(
        () => (this.isLoading = false)
      );
    },
    fetchTeam() {
      return this.$teamApi
        .getOne(this.uuid)
        .then((team) => {
          this.message = "";
          this.team = team;
        })
        .catch(() => (this.message = this.$tc("team.not-found", 1)));
    },
    fetchBanks() {
      return this.$bankApi
        .getAll()
        .then((banks) => (this.banks = banks))
        .catch(() => (this.banks = []));
    },
  },
};
</script>
