import type { Query } from "@hennihaus/bamconfigbackend";

export type HasPassed = "PASSED" | "NOT_PASSED";
export type FormQuery = Omit<Query, "limit" | "hasPassed"> & {
  hasPassed?: HasPassed;
};

export const buildQuery = (values: FormQuery): FormQuery => {
  const query: FormQuery = {
    ...values,
  };

  if (!query.type) {
    delete query.type;
  }
  if (!query.username) {
    delete query.username;
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
