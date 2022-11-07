import { http } from "@/services/http-common";

export class BrokerApiService {
  resetBroker() {
    return http.delete("/activemq");
  }

  deleteQueueByName(name) {
    return http.delete(`/activemq/${name}`);
  }
}
