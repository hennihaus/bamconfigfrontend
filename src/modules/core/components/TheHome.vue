<script setup lang="ts">
import BaseMessage from "@/modules/base/components/BaseMessage.vue";
import { useBrokerFetch } from "@/modules/core/composables/fetch";
import BaseLoading from "@/modules/base/components/BaseLoading.vue";
import { useBaseI18n } from "@/modules/base/composables/i18n";

const { t } = useBaseI18n();
const activeMqUrl = import.meta.env.VITE_ACTIVE_MQ_URL;
const googleCloudIamUrl = import.meta.env.VITE_GCP_IAM_URL;

const { isLoading, message, messageType, resetBroker } = useBrokerFetch();

const onResetBroker = () => {
  if (confirm(t("core.home-restart-course-warning"))) {
    resetBroker();
  }
};
</script>

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
  <a class="ui red button" @click="onResetBroker">
    {{ $t("core.home-restart-course") }}
    <i class="right refresh icon" />
  </a>

  <BaseMessage v-if="message" :message="message" :type="messageType" />
  <BaseLoading v-if="isLoading" />
</template>
