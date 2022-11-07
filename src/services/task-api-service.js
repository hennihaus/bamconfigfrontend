import { http } from "@/services/http-common";

export class TaskApiService {
  getAll() {
    return http.get("/tasks").then((response) => response.data);
  }

  getOne(uuid) {
    return http.get(`/tasks/${uuid}`).then((response) => response.data);
  }

  update(uuid, task) {
    return http.patch(`/tasks/${uuid}`, task).then((response) => response.data);
  }

  isTitleUnique(uuid, title) {
    return http
      .get(`/tasks/${uuid}/unique/title/${title}`)
      .then((response) => response.data.isUnique);
  }
}
