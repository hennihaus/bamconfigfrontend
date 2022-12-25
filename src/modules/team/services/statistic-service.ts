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

export const mergeStatistics = (team: Team): Statistics => {
  return [...DEFAULT_BANKS, ...Object.keys(team.statistics)]
    .map((bank) => {
      if (team.statistics[bank]) {
        return { [bank]: team.statistics[bank] };
      }
      return { [bank]: 0 };
    })
    .reduce((target, source) => Object.assign(target, source), {});
};
