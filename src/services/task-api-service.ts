import { http } from "@/services/http-common";
import type { Task, Unique } from "@hennihaus/bamconfigbackend";

export class TaskApiService {
  getAll(): Promise<Task[]> {
    return http.get<Task[]>("/tasks").then((response) => response.data);
  }

  getOne(uuid: string): Promise<Task> {
    return http.get<Task>(`/tasks/${uuid}`).then((response) => response.data);
  }

  update(task: Task): Promise<Task> {
    return http
      .patch<Task>(`/tasks/${task.uuid}`, task)
      .then((response) => response.data);
  }

  isTitleUnique(uuid: string, title: string): Promise<boolean> {
    return http
      .get<Unique>(`/tasks/${uuid}/unique/title/${title}`)
      .then((response) => response.data.isUnique);
  }
}
