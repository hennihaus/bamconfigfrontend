import type { Parameter } from "@hennihaus/bamconfigbackend";

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getSocialSecurityNumberParameter = (): Parameter => ({
  uuid: "caba3d46-2e06-4678-8690-542ce08acda0",
  name: "socialSecurityNumber",
  type: "STRING",
  description: "Zufällige Sozialversicherungsnummer",
  example: "12123456M123",
});

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getRatingLevelParameter = (): Parameter => ({
  uuid: "b5beb647-26be-4e5e-bbee-b4279b9c8e90",
  name: "ratingLevel",
  type: "CHARACTER",
  description: "Bewertung des Debitors",
  example: "A",
});

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getDelayInMillisecondsParameter = (): Parameter => ({
  uuid: "200916e1-9f68-48ba-9fdd-672f27bfe123",
  name: "delayInMilliseconds",
  type: "LONG",
  description:
    "Zeit in Millisekunden, um die die Antwort verzögert werden soll",
  example: "0",
});

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getUsernameParameter = (): Parameter => ({
  uuid: "58e5c73b-cad6-4b2c-8e25-635b4e5eb7c6",
  name: "username",
  type: "STRING",
  description: "Benutzername des Teams",
  example: "Beispielteam",
});

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getPasswordParameter = (): Parameter => ({
  uuid: "e17421f6-26d6-422a-9087-1ce3dcdf6a12",
  name: "password",
  type: "STRING",
  description: "Passwort des Teams",
  example: "OOfKqWksmA",
});

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getAmountInEurosParameter = (): Parameter => ({
  uuid: "8fbf56d5-ac30-42aa-aca3-24dde32c63fa",
  name: "amountInEuros",
  type: "INTEGER",
  description: "Gewünschte Höhe des Kredites in Euro",
  example: "30000",
});

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getTermInMonthsParameter = (): Parameter => ({
  uuid: "77bc374e-dcb6-4859-b356-c511a5860bdc",
  name: "termInMonths",
  type: "INTEGER",
  description: "Gewünschte Länge des Kredites in Monaten",
  example: "21",
});

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getRequestIdParameter = (): Parameter => ({
  uuid: "0ae3aa19-e421-4c5f-bb9a-d9f932689e5f",
  name: "requestId",
  type: "STRING",
  description: "Zufällige Request-ID",
  example: "62a47e4d6230501f22e7c28f",
});
