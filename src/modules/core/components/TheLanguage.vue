<template>
  <a class="item" @click="onClick(flag)">
    <i class="flag custom" :class="[flag]" />
  </a>
</template>

<script>
export default {
  name: "TheLanguage",
  setup() {
    return {
      locales: {
        de: "de",
        en: "gb uk",
      },
    };
  },
  computed: {
    flag() {
      const newFlag = Object.keys(this.locales).find(
        (language) => language !== this.$root.$i18n.locale
      );
      return this.locales[newFlag];
    },
  },
  methods: {
    onClick(flag) {
      const locale = Object.keys(this.locales).find(
        (language) => this.locales[language] === flag
      );
      this.$router.push({
        ...this.$route,
        params: {
          ...this.$route.params,
          locale,
        },
      });
    },
  },
};
</script>

<style scoped>
.custom {
  margin: 0 !important;
}
</style>
