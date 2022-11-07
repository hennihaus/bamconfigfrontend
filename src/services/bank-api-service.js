import { http } from "@/services/http-common";

export class BankApiService {
  getAll() {
    return http.get("/banks").then((response) => response.data);
  }

  getOne(uuid) {
    return http.get(`/banks/${uuid}`).then((response) => response.data);
  }

  update(uuid, bank) {
    return http.patch(`/banks/${uuid}`, bank).then((response) => response.data);
  }
}
