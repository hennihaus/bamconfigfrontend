import type {
  Bank,
  Contact,
  Endpoint,
  Parameter,
  Response,
  Task,
} from "@hennihaus/bamconfigbackend";
import {
  getActiveMqEndpoint,
  getSchufaRestEndpoint,
  getSyncBankRestEndpoint,
} from "@/__tests__/objectmothers/endpoint-object-mother";
import {
  getAmountInEurosParameter,
  getDelayInMillisecondsParameter,
  getPasswordParameter,
  getRatingLevelParameter,
  getRequestIdParameter,
  getSocialSecurityNumberParameter,
  getTermInMonthsParameter,
  getUsernameParameter,
} from "@/__tests__/objectmothers/parameter-object-mother";
import {
  getBadRequestResponse,
  getBankOkResponse,
  getInternalServerErrorResponse,
  getJmsResponse,
  getNotFoundResponse,
  getSchufaOkResponse,
} from "@/__tests__/objectmothers/response-object-mother";
import {
  getAsyncBank,
  getSchufaBank,
  getSyncBank,
} from "@/__tests__/objectmothers/bank-object-mother";

const getSchufaEndpoints = (): Endpoint[] => [getSchufaRestEndpoint()];

const getSchufaParameters = (): Parameter[] => [
  getSocialSecurityNumberParameter(),
  getRatingLevelParameter(),
  getDelayInMillisecondsParameter(),
  getUsernameParameter(),
  getPasswordParameter(),
];

const getSchufaResponses = (): Response[] => [
  getSchufaOkResponse(),
  getBadRequestResponse(),
  getNotFoundResponse(),
  getInternalServerErrorResponse(),
];

const getSchufaBanks = (): Bank[] => [getSchufaBank()];

const getSynchronousBankEndpoints = (): Endpoint[] => [
  getSyncBankRestEndpoint(),
];

const getSynchronousBankParameters = (): Parameter[] => [
  getAmountInEurosParameter(),
  getTermInMonthsParameter(),
  getRatingLevelParameter(),
  getDelayInMillisecondsParameter(),
  getUsernameParameter(),
  getPasswordParameter(),
];

const getSynchronousBankResponses = (): Response[] => [
  getBankOkResponse(),
  getBadRequestResponse(),
  getNotFoundResponse(),
  getInternalServerErrorResponse(),
];

const getSynchronousBanks = (): Bank[] => [getSyncBank()];

const getAsynchronousBankEndpoints = (): Endpoint[] => [getActiveMqEndpoint()];

const getAsynchronousBankParameters = (): Parameter[] => [
  getRequestIdParameter(),
  getAmountInEurosParameter(),
  getTermInMonthsParameter(),
  getRatingLevelParameter(),
  getDelayInMillisecondsParameter(),
  getUsernameParameter(),
  getPasswordParameter(),
];

const getAsynchronousBankResponses = (): Response[] => [getJmsResponse()];

const getAsynchronousBanks = (): Bank[] => [getAsyncBank()];

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getDefaultContact = (): Contact => ({
  uuid: "ba16bd92-9e64-4de6-916f-d0c4ea91a530",
  firstname: "Jan-Hendrik",
  lastname: "Hausner",
  email: "jan-hendrik.hausner@outlook.com",
});

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getSchufaTask = (): Task => ({
  uuid: "72255554-d295-4684-9ff8-8d262849bb3d",
  title: "Schufa-Auskunft",
  description: '<p>Schufa-Auskunft-Beschreibung ("1. Integrationsschritt")</p>',
  integrationStep: 1,
  isOpenApiVerbose: true,
  contact: getDefaultContact(),
  endpoints: getSchufaEndpoints(),
  parameters: getSchufaParameters(),
  responses: getSchufaResponses(),
  banks: getSchufaBanks(),
  updatedAt: "2022-12-26T08:49:22",
});

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getSynchronousBankTask = (): Task => ({
  uuid: "e2aba7e5-9bb8-458b-a927-8e672b1370f2",
  title: "Deutsche Bank",
  description: '<p>Synchrone-Bank-Beschreibung ("2. Integrationsschritt")</p>',
  integrationStep: 2,
  isOpenApiVerbose: true,
  contact: getDefaultContact(),
  endpoints: getSynchronousBankEndpoints(),
  parameters: getSynchronousBankParameters(),
  responses: getSynchronousBankResponses(),
  banks: getSynchronousBanks(),
  updatedAt: "2022-12-26T08:49:22",
});

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getAsynchronousBankTask = (): Task => ({
  uuid: "4ff1f9cb-e65d-4c8f-908a-d036700b757e",
  title: "Asynchrone Banken",
  description: '<p>Asynchrone-Bank-Beschreibung ("3. Integrationsschritt")</p>',
  integrationStep: 3,
  isOpenApiVerbose: false,
  contact: getDefaultContact(),
  endpoints: getAsynchronousBankEndpoints(),
  parameters: getAsynchronousBankParameters(),
  responses: getAsynchronousBankResponses(),
  banks: getAsynchronousBanks(),
  updatedAt: "2022-12-26T08:49:22",
});
