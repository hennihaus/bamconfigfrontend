<script setup lang="ts">
import {
  useField,
  useFormValues,
  useIsFormValid,
  useIsSubmitting,
} from "vee-validate";
import { inject } from "vue";
import { TEAM_API } from "@/plugins/http";
import type { TeamApiService } from "@/services/team-api-service";
import BaseFormMessage from "@/modules/base/components/BaseFormMessage.vue";
import TeamFormPassword from "@/modules/team/components/TeamFormPassword.vue";
import { useBaseI18n } from "@/modules/base/composables/i18n";
import type { Team } from "@hennihaus/bamconfigbackend";

const { t } = useBaseI18n();
const isSubmitting = useIsSubmitting();
const isFormValid = useIsFormValid();
const form = useFormValues<Team>();

const {
  value: username,
  errors: usernameErrors,
  handleBlur: handleUsernameBlur,
} = useField<string>(
  "username",
  {
    required: true,
    min: 6,
    max: 50,
    unique_username: {
      uuid: form.value.uuid,
      teamApi: inject(TEAM_API) as TeamApiService,
    },
  },
  { label: t("team.username") }
);
const {
  value: jmsQueue,
  errors: jmsQueueErrors,
  handleBlur: handleJmsQueueBlur,
} = useField<string>(
  "jmsQueue",
  {
    required: true,
    min: 6,
    max: 50,
    unique_jms_queue: {
      uuid: form.value.uuid,
      teamApi: inject(TEAM_API) as TeamApiService,
    },
  },
  { label: t("team.username") }
);
</script>

<template>
  <div class="two fields">
    <div class="field">
      <label>{{ $t("team.username") }}</label>
      <div class="ui left corner labeled input">
        <input v-model="username" type="text" @blur="handleUsernameBlur" />
        <div class="ui left corner label">
          <i class="asterisk icon" />
        </div>
      </div>
      <BaseFormMessage :errors="usernameErrors" />
    </div>

    <div class="field">
      <label class="save">Invisible</label>
      <button
        :disabled="isSubmitting"
        :class="[isFormValid ? 'green' : 'red']"
        type="submit"
        class="ui fluid button"
      >
        {{ $t("common.save") }}
      </button>
    </div>
  </div>

  <div class="two fields">
    <div class="field">
      <label>{{ $t("team.jms-queue") }}</label>
      <div class="ui left corner labeled input">
        <input v-model="jmsQueue" type="text" @blur="handleJmsQueueBlur" />
        <div class="ui left corner label">
          <i class="asterisk icon" />
        </div>
      </div>
      <BaseFormMessage :errors="jmsQueueErrors" />
    </div>

    <TeamFormPassword />
  </div>
</template>

<style scoped>
.save {
  visibility: hidden;
}
</style>
