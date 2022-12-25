import type { App, InjectionKey } from "vue";
import { TaskApiService } from "@/services/task-api-service";
import { BankApiService } from "@/services/bank-api-service";
import { TeamApiService } from "@/services/team-api-service";
import { StatisticApiService } from "@/services/statistic-api-service";
import { BrokerApiService } from "@/services/broker-api-service";

export const TASK_API = Symbol() as InjectionKey<TaskApiService>;
export const BANK_API = Symbol() as InjectionKey<BankApiService>;
export const TEAM_API = Symbol() as InjectionKey<TeamApiService>;
export const STATISTIC_API = Symbol() as InjectionKey<StatisticApiService>;
export const BROKER_API = Symbol() as InjectionKey<BrokerApiService>;

const http = {
  install: (app: App<Element>) => {
    app.provide(TASK_API, new TaskApiService());
    app.provide(BANK_API, new BankApiService());
    app.provide(TEAM_API, new TeamApiService());
    app.provide(STATISTIC_API, new StatisticApiService());
    app.provide(BROKER_API, new BrokerApiService());
  },
};

export default http;
