import type { Errors, Reason } from "@hennihaus/bamconfigbackend";

const getBadRequestErrorReason = (): Reason => ({
  exception: "BadRequestException",
  message: "invalid request",
});

const getInternalServerErrorReason = (): Reason => ({
  exception: "Exception",
  message: "internal server error",
});

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getBadRequestErrors = (): Errors => ({
  dateTime: "2022-01-31T07:43:30",
  reasons: [getBadRequestErrorReason()],
});

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getInternalServerErrors = (): Errors => ({
  dateTime: "2022-01-31T07:43:30",
  reasons: [getInternalServerErrorReason()],
});
