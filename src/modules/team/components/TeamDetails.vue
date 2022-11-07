<template>
  <template v-if="!isLoading">
    <template v-if="team">
      <TeamDetailsView :team="team" :thumbnail-url="thumbnailUrl" />

      <button class="ui tiny red labeled icon button" @click="deleteTeam">
        <i class="trash icon" /> Team löschen
      </button>
      <RouterLink :to="{ name: 'TeamEdit', params: { uuid, thumbnailUrl } }">
        <button class="ui tiny yellow labeled icon button">
          <i class="write icon" /> Team bearbeiten
        </button>
      </RouterLink>
      <button class="ui tiny orange labeled icon button" @click="deleteQueue">
        <i class="remove icon" /> JMS-Queue zurücksetzen
      </button>
      <button class="ui tiny orange labeled icon button" @click="resetStats">
        <i class="remove icon" /> Anfragen zurücksetzen
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
          this.message = "Team wurde nicht gefunden.";
        })
        .finally(() => (this.isLoading = false));
    },
    deleteTeam() {
      if (confirm("Team wirklich löschen?")) {
        this.isLoading = true;

        this.$teamApi
          .delete(this.uuid)
          .then(() => {
            this.$router.push({ name: "TeamList" });
            this.message = "";
          })
          .catch(() => {
            this.type = "negative";
            this.message = "Team konnte nicht gelöscht werden.";
          })
          .finally(() => (this.isLoading = false));
      }
    },
    deleteQueue() {
      if (confirm("JMS-Queue wirklich leeren?")) {
        this.isLoading = true;

        this.$brokerApi
          .deleteQueueByName(this.team.jmsQueue)
          .then(() => {
            this.type = "positive";
            this.message = `Die JMS-Queue ${this.team.jmsQueue} wurde erfolgreich auf den Uhrsprungszustand zurückgesetzt.`;
          })
          .catch(() => {
            this.type = "negative";
            this.message = "JMS-Queue konnte nicht geleert werden.";
          })
          .finally(() => (this.isLoading = false));
      }
    },
    resetStats() {
      if (
        confirm(
          "Statistiken wirklich zurücksetzen. Der Status wird damit auf nicht bestanden zurückgesetzt?"
        )
      ) {
        this.isLoading = true;

        this.$teamApi
          .resetStatistics(this.uuid)
          .then((team) => {
            this.team = team;
            this.message = "";
          })
          .catch(() => {
            this.type = "negative";
            this.message = "Statistiken konnten nicht zurückgesetzt werden.";
          })
          .finally(() => (this.isLoading = false));
      }
    },
  },
};
</script>
