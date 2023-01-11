import type { Team } from "@hennihaus/bamconfigbackend";

const DEFAULT_BANKS = ["Schufa", "Deutsche Bank"];

export type Statistics = { [key: string]: number };

export const removeStatistics = (team: Team): Statistics => {
  return Object.keys(team.statistics).reduce(
    (statistics: Statistics, bank: string) => {
      if (!DEFAULT_BANKS.includes(bank)) {
        statistics[bank] = team.statistics[bank];
      }
      return statistics;
    },
    {}
  );
};

export const mergeStatistics = (newTeam: Team, oldTeam?: Team): Statistics => {
  return [...Object.keys(newTeam.statistics), ...DEFAULT_BANKS]
    .map((bank) => {
      if (oldTeam && oldTeam.statistics[bank]) {
        return { [bank]: oldTeam.statistics[bank] };
      }
      return { [bank]: 0 };
    })
    .reduce((target, source) => Object.assign(target, source), {});
};
