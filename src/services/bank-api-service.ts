import { http } from "@/services/http-common";
import type { Bank } from "@hennihaus/bamconfigbackend";

export class BankApiService {
  getAll(): Promise<Bank[]> {
    return http.get<Bank[]>("/banks").then((response) => response.data);
  }

  getOne(uuid: string): Promise<Bank> {
    return http.get<Bank>(`/banks/${uuid}`).then((response) => response.data);
  }

  update(bank: Bank): Promise<Bank> {
    return http
      .patch<Bank>(`/banks/${bank.uuid}`, bank)
      .then((response) => response.data);
  }
}
