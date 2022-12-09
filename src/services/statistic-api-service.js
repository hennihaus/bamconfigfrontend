import { http } from "@/services/http-common";

export class StatisticApiService {
  saveAll(bankId) {
    return http.put(`/statistics/${bankId}`, { responseType: "text" });
  }

  deleteAll(bankId) {
    return http.delete(`/statistics/${bankId}`, { responseType: "text" });
  }

  recreateAll(limit) {
    return http.post(`/statistics/${limit}`, { responseType: "text" });
  }
}
