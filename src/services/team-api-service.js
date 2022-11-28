import { http } from "@/services/http-common";

export class TeamApiService {
  getAll(params) {
    return http.get(`/teams`, { params }).then((response) => response.data);
  }

  getOne(uuid) {
    return http.get(`/teams/${uuid}`).then((response) => response.data);
  }

  update(uuid, team) {
    return http.put(`/teams/${uuid}`, team).then((response) => response.data);
  }

  delete(uuid) {
    return http.delete(`/teams/${uuid}`, { responseType: "text" });
  }

  resetStatistics(uuid) {
    return http
      .delete(`/teams/${uuid}/statistics`)
      .then((response) => response.data);
  }

  isUsernameUnique(uuid, username) {
    return http
      .get(`/teams/${uuid}/unique/username/${username}`)
      .then((response) => response.data.isUnique);
  }

  isPasswordUnique(uuid, password) {
    return http
      .get(`/teams/${uuid}/unique/password/${password}`)
      .then((response) => response.data.isUnique);
  }

  isJmsQueueUnique(uuid, jmsQueue) {
    return http
      .get(`/teams/${uuid}/unique/jmsQueue/${jmsQueue}`)
      .then((response) => response.data.isUnique);
  }
}
