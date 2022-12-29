import type { Ref } from "vue";
import { computed } from "vue";
import type { Team } from "@hennihaus/bamconfigbackend";
import { useBaseI18n } from "@/modules/base/composables/i18n";
import { TeamType } from "@/models/team-type";

export const useTeam = (team: Ref<Team>) => {
  const { t } = useBaseI18n();

  const type = computed(() => {
    let type;

    switch (team.value.type) {
      case TeamType.EXAMPLE:
        type = t("team.type-checkbox", 0);
        break;
      case TeamType.REGULAR:
        type = t("team.type-checkbox", 1);
        break;
      default:
        type = t("common.unknown");
    }

    return type;
  });

  const totalRequests = computed(() => {
    return Object.keys(team.value.statistics)
      .map((bank) => team.value.statistics[bank])
      .reduce((sum, requests) => sum + requests, 0);
  });

  const hasPassedStatus = computed(() =>
    team.value.hasPassed ? t("team.passed", 1) : t("team.passed", 0)
  );

  const isRegular = computed(() => team.value.type === TeamType.REGULAR);

  const createdAt = computed(() => new Date(team.value.createdAt));

  const updatedAt = computed(() => new Date(team.value.updatedAt));

  return {
    type,
    totalRequests,
    hasPassedStatus,
    isRegular,
    createdAt,
    updatedAt,
  };
};
