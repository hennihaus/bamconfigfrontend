<script setup lang="ts">
import { useField, useFormValues } from "vee-validate";
import { inject } from "vue";
import { TEAM_API } from "@/plugins/http";
import { useBaseI18n } from "@/modules/base/composables/i18n";
import type { Team } from "@hennihaus/bamconfigbackend";
import BaseFormMessage from "@/modules/base/components/BaseFormMessage.vue";
import type { TeamApiService } from "@/services/team-api-service";

const { t } = useBaseI18n();
const team = useFormValues<Team>();

const passwordLength = import.meta.env.VITE_PASSWORD_LENGTH;
const passwordSequence = import.meta.env.VITE_PASSWORD_SEQUENCE;

const {
  value: password,
  errors: passwordErrors,
  handleBlur: handlePasswordBlur,
} = useField<string>(
  "password",
  {
    required: true,
    min: 10,
    max: 50,
    unique_password: {
      uuid: team.value.uuid,
      teamApi: inject(TEAM_API) as TeamApiService,
    },
  },
  { label: t("team.password") }
);

const onGeneratePassword = () => {
  let text = "";
  for (let i = 0; i < passwordLength; i++) {
    text = `${text}${passwordSequence.charAt(
      Math.floor(Math.random() * passwordSequence.length)
    )}`;
  }
  password.value = text;
};
</script>

<template>
  <div class="field">
    <label>{{ $t("team.password") }}</label>
    <div class="ui action input left corner labeled">
      <input v-model="password" type="text" @blur="handlePasswordBlur" />
      <div class="ui left corner label">
        <i class="asterisk icon" />
      </div>
      <button type="button" class="ui button" @click="onGeneratePassword">
        {{ $t("common.generate") }}
      </button>
    </div>
    <BaseFormMessage :errors="passwordErrors" />
  </div>
</template>
