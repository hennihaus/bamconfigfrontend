import { http } from "@/services/http-common";

export class StatisticApiService {
  saveAll(bankId: string): Promise<void> {
    return http.put(`/statistics/${bankId}`, { responseType: "text" });
  }

  deleteAll(bankId: string): Promise<void> {
    return http.delete(`/statistics/${bankId}`, { responseType: "text" });
  }

  recreateAll(limit: number): Promise<void> {
    return http.post(`/statistics/${limit}`, { responseType: "text" });
  }
}
