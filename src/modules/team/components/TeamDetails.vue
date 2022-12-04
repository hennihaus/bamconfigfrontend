<template>
  <template v-if="!isLoading">
    <template v-if="team">
      <TeamDetailsView :team="team" :thumbnail-url="thumbnailUrl" />

      <button class="ui tiny red labeled icon button" @click="deleteTeam">
        <i class="trash icon" /> {{ $t("team.delete") }}
      </button>
      <RouterLink :to="{ name: 'TeamEdit', params: { uuid, thumbnailUrl } }">
        <button class="ui tiny yellow labeled icon button">
          <i class="write icon" /> {{ $t("team.edit") }}
        </button>
      </RouterLink>
      <button class="ui tiny orange labeled icon button" @click="deleteQueue">
        <i class="remove icon" /> {{ $t("team.reset-jms-queue") }}
      </button>
      <button class="ui tiny orange labeled icon button" @click="resetStats">
        <i class="remove icon" /> {{ $t("team.reset-requests") }}
      </button>
    </template>

    <BaseMessage v-if="message" :message="message" :type="type" />
  </template>
  <BaseLoading v-else />
</template>

<script>
import BaseLoading from "@/modules/base/components/BaseLoading.vue";
import TeamDetailsView from "@/modules/team/components/TeamDetailsView.vue";
import BaseMessage from "@/modules/base/components/BaseMessage.vue";

export default {
  name: "TeamDetails",
  components: {
    BaseMessage,
    TeamDetailsView,
    BaseLoading,
  },
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
      message: "",
      type: "",
    };
  },
  watch: {
    uuid: {
      handler() {
        this.fetchTeam();
      },
      immediate: true,
    },
  },
  methods: {
    fetchTeam() {
      this.isLoading = true;

      this.$teamApi
        .getOne(this.uuid)
        .then((team) => {
          this.team = team;
          this.message = "";
        })
        .catch(() => {
          this.type = "negative";
          this.message = this.$tc("team.not-found", 1);
        })
        .finally(() => (this.isLoading = false));
    },
    deleteTeam() {
      if (confirm(this.$t("team.delete-warning"))) {
        this.isLoading = true;

        this.$teamApi
          .delete(this.uuid)
          .then(() => {
            this.$router.push({ name: "TeamList" });
            this.message = "";
          })
          .catch(() => {
            this.type = "negative";
            this.message = this.$t("team.delete-error");
          })
          .finally(() => (this.isLoading = false));
      }
    },
    deleteQueue() {
      if (confirm(this.$t("team.reset-jms-queue-warning"))) {
        this.isLoading = true;

        this.$brokerApi
          .deleteQueueByName(this.team.jmsQueue)
          .then(() => {
            this.type = "positive";
            this.message = this.$t("team.reset-jms-queue-success", {
              jmsQueue: this.team.jmsQueue,
            });
          })
          .catch(() => {
            this.type = "negative";
            this.message = this.$t("team.reset-jms-queue-error");
          })
          .finally(() => (this.isLoading = false));
      }
    },
    resetStats() {
      if (confirm(this.$t("team.reset-requests-warning"))) {
        this.isLoading = true;

        this.$teamApi
          .resetStatistics(this.uuid)
          .then((team) => {
            this.team = team;
            this.message = "";
          })
          .catch(() => {
            this.type = "negative";
            this.message = this.$t("team.reset-requests-error");
          })
          .finally(() => (this.isLoading = false));
      }
    },
  },
};
</script>
