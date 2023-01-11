import type { Response } from "@hennihaus/bamconfigbackend";

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getSchufaOkResponse = (): Response => ({
  uuid: "d95fe79a-ee08-4481-86d2-6b95f0b96f99",
  httpStatusCode: 200,
  contentType: "application/json",
  description: "Schufa-Score des Debitors",
  example: '{"score": 9858, "failureRiskInPercent": 0.77}',
});

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getBankOkResponse = (): Response => ({
  ...getSchufaOkResponse(),
  description: "Kreditzins in Prozent",
  example: '{"lendingRateInPercent": 3.8}',
});

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getBadRequestResponse = (): Response => ({
  uuid: "a4133bba-824a-4063-abdf-29399ccf685f",
  httpStatusCode: 400,
  contentType: "application/json",
  description: "Ungültige Parameter",
  example:
    '{"reasons": [{"message": "password is required", "exception": "RequestValidationException"}], "dateTime": "2022-01-31T07:43:30"}',
});

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getNotFoundResponse = (): Response => ({
  uuid: "7736d7b7-9f55-4a2c-8e6a-7f7fb1bf6ce5",
  httpStatusCode: 404,
  contentType: "application/json",
  description: "Team wurde nicht gefunden",
  example:
    '{"reasons": [{"message": "team not found by username and password", "exception": "NotFoundException"}], "dateTime": "2022-01-31T07:43:30"}',
});

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getInternalServerErrorResponse = (): Response => ({
  uuid: "52c2b022-7b0b-4017-baba-3dae02f938b0",
  httpStatusCode: 500,
  contentType: "application/json",
  description: "Interner Server Fehler",
  example:
    '{"reasons": [{"message": "internal server error", "exception": "Exception"}], "dateTime": "2022-01-31T07:43:30"}',
});

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getJmsResponse = (): Response => ({
  uuid: "45d2b3fd-f87f-4dde-a8cd-36c02612cd50",
  httpStatusCode: -1,
  contentType: "application/json",
  description: "Kreditzins in Prozent",
  example: '{"requestId": "123", "lendingRateInPercent": 2.738343644690228}',
});
