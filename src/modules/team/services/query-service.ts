import type { TeamQuery } from "@hennihaus/bamconfigbackend";

export type HasPassed = "PASSED" | "NOT_PASSED";
export type TeamFormQuery = Omit<TeamQuery, "limit" | "hasPassed"> & {
  hasPassed?: HasPassed;
};

export const buildQuery = (values: TeamFormQuery): TeamFormQuery => {
  const query: TeamFormQuery = {
    ...values,
  };

  if (!query.type) {
    delete query.type;
  }
  if (!query.username) {
    delete query.username;
  }
  if (!query.password) {
    delete query.password;
  }
  if (!query.jmsQueue) {
    delete query.jmsQueue;
  }
  if (!query.hasPassed) {
    delete query.hasPassed;
  }
  if (!query.minRequests) {
    delete query.minRequests;
  }
  if (!query.maxRequests) {
    delete query.maxRequests;
  }
  if (!query.studentFirstname) {
    delete query.studentFirstname;
  }
  if (!query.studentLastname) {
    delete query.studentLastname;
  }
  if (!query.banks?.length) {
    delete query.banks;
  }

  return query;
};
