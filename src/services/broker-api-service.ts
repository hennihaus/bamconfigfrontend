import { http } from "@/services/http-common";

export class BrokerApiService {
  resetBroker(): Promise<void> {
    return http.delete("/activemq", { responseType: "text" });
  }

  deleteQueueByName(name: string): Promise<void> {
    return http.delete(`/activemq/${name}`, { responseType: "text" });
  }
}
