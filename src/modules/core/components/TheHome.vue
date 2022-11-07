<template>
  <h1>Home</h1>
  <p>
    Das ist das Frontend zum Konfigurieren des Kurses BAM Businessintegration.
  </p>

  <a :href="activeMqUrl" target="_blank" class="ui olive button">
    ActiveMQ
    <i class="right info icon" />
  </a>
  <a :href="googleCloudIamUrl" target="_blank" class="ui olive button">
    TODO
    <i class="right info icon" />
  </a>
  <a class="ui red button" @click="resetBroker">
    Kurs neu starten
    <i class="right refresh icon" />
  </a>

  <BaseMessage v-if="message" :message="message" :type="type" />
  <BaseLoading v-if="isLoading" />
</template>

<script>
import BaseMessage from "@/modules/base/components/BaseMessage.vue";
import BaseLoading from "@/modules/base/components/BaseLoading.vue";

export default {
  name: "TheHome",
  components: { BaseMessage, BaseLoading },
  setup() {
    return {
      activeMqUrl: import.meta.env.VITE_ACTIVE_MQ_URL,
      googleCloudIamUrl: import.meta.env.VITE_GCP_IAM_URL,
    };
  },
  data() {
    return {
      isLoading: false,
      message: "",
      type: "",
    };
  },
  methods: {
    resetBroker() {
      const hasConfirmed = confirm(
        "Damit werden alle Queues und Topics auf den Uhrsprungszustand zurückgesetzt. Die Nutzungsstatistiken werden zurückgesetzt und Gruppenpasswörter neu generiert."
      );

      if (hasConfirmed) {
        this.isLoading = true;

        this.$brokerApi
          .resetBroker()
          .then(() => {
            this.type = "positive";
            this.message =
              "Gesamtsystem wurde erfolgreich auf den Uhrsprungszustand zurückgesetzt.";
          })
          .catch(() => {
            this.type = "negative";
            this.message = "Fehler beim Zurücksetzen des Systems.";
          })
          .finally(() => (this.isLoading = false));
      }
    },
  },
};
</script>
