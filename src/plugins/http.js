import { TaskApiService } from "@/services/task-api-service";
import { TeamApiService } from "@/services/team-api-service";
import { BankApiService } from "@/services/bank-api-service";
import { BrokerApiService } from "@/services/broker-api-service";
import { StatisticApiService } from "@/services/statistic-api-service";

const http = {
  install: (app) => {
    app.config.globalProperties.$taskApi = new TaskApiService();
    app.config.globalProperties.$teamApi = new TeamApiService();
    app.config.globalProperties.$bankApi = new BankApiService();
    app.config.globalProperties.$brokerApi = new BrokerApiService();
    app.config.globalProperties.$statisticApi = new StatisticApiService();
  },
};

export default http;
