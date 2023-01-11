import { http } from "@/services/http-common";
import type {
  Team,
  TeamQuery,
  Teams,
  Unique,
} from "@hennihaus/bamconfigbackend";
import type { PaginationQuery } from "@/models/pagination-query";

export class TeamApiService {
  getAll(params: TeamQuery | PaginationQuery): Promise<Teams> {
    return http
      .get<Teams>("/teams", { params })
      .then((response) => response.data);
  }

  getOne(uuid: string): Promise<Team> {
    return http.get<Team>(`/teams/${uuid}`).then((response) => response.data);
  }

  update(team: Team): Promise<Team> {
    return http
      .put<Team>(`/teams/${team.uuid}`, team)
      .then((response) => response.data);
  }

  delete(uuid: string): Promise<void> {
    return http.delete(`/teams/${uuid}`, { responseType: "text" });
  }

  resetStatistics(uuid: string): Promise<Team> {
    return http
      .delete<Team>(`/teams/${uuid}/statistics`)
      .then((response) => response.data);
  }

  isUsernameUnique(uuid: string, username: string): Promise<boolean> {
    return http
      .get<Unique>(`/teams/${uuid}/unique/username/${username}`)
      .then((response) => response.data.isUnique);
  }

  isPasswordUnique(uuid: string, password: string): Promise<boolean> {
    return http
      .get<Unique>(`/teams/${uuid}/unique/password/${password}`)
      .then((response) => response.data.isUnique);
  }

  isJmsQueueUnique(uuid: string, jmsQueue: string): Promise<boolean> {
    return http
      .get<Unique>(`/teams/${uuid}/unique/jmsQueue/${jmsQueue}`)
      .then((response) => response.data.isUnique);
  }
}
