<template>
  <h1>{{ $t("core.home") }}</h1>
  <p>{{ $t("core.home-description") }}</p>

  <a :href="activeMqUrl" target="_blank" class="ui olive button">
    ActiveMQ
    <i class="right info icon" />
  </a>
  <a :href="googleCloudIamUrl" target="_blank" class="ui olive button">
    TODO
    <i class="right info icon" />
  </a>
  <a class="ui red button" @click="resetBroker">
    {{ $t("core.home-restart-course") }}
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
      const hasConfirmed = confirm(this.$t("core.home-restart-course-warning"));

      if (hasConfirmed) {
        this.isLoading = true;

        this.$brokerApi
          .resetBroker()
          .then(() => {
            this.type = "positive";
            this.message = this.$t("core.home-restart-course-success");
          })
          .catch(() => {
            this.type = "negative";
            this.message = this.$t("core.home-restart-course-error");
          })
          .finally(() => (this.isLoading = false));
      }
    },
  },
};
</script>
