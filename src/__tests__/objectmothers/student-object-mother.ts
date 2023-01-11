import type { Student } from "@hennihaus/bamconfigbackend";

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getFirstStudent = (): Student => ({
  uuid: "474e90cb-de6e-47f2-844a-44ea7dc09516",
  firstname: "Angela",
  lastname: "Merkel",
});

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getSecondStudent = (): Student => ({
  uuid: "31b1631b-66c9-4720-94fc-95891a38f964",
  firstname: "Max",
  lastname: "Mustermann",
});

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getThirdStudent = (): Student => ({
  uuid: "f334a0c0-0c26-4499-aa95-061546839a75",
  firstname: "Thomas",
  lastname: "Müller",
});
