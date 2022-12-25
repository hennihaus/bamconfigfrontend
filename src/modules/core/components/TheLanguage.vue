<script setup lang="ts">
import { computed } from "vue";
import type { Locales } from "@/plugins/i18n";
import { useRoute, useRouter } from "vue-router";
import { setLocale } from "@vee-validate/i18n";
import { useBaseI18n } from "@/modules/base/composables/i18n";

const { locale } = useBaseI18n();
const route = useRoute();
const router = useRouter();

const locales: Record<string, string> = {
  de: "de",
  en: "gb uk",
};

const flag = computed(() => {
  const newFlag = Object.keys(locales).find(
    (language) => language !== locale.value
  );
  return locales[newFlag || "de"];
});

const onClick = () => {
  const newLocale = Object.keys(locales).find(
    (language) => locales[language] === flag.value
  );
  locale.value = newLocale as Locales;
  setLocale(locale.value);
  router.push({
    ...route,
    params: {
      ...route.params,
      locale: newLocale,
    },
  });
};
</script>

<template>
  <a class="item" @click="onClick">
    <i class="flag custom" :class="[flag]" />
  </a>
</template>

<style scoped>
.custom {
  margin: 0 !important;
}
</style>
