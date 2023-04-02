import type { Bank, CreditConfiguration } from "@hennihaus/bamconfigbackend";
import { RatingLevel } from "@/models/rating-level";

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getCreditConfigurationWithNoEmptyFields =
  (): CreditConfiguration => ({
    minAmountInEuros: 10_000,
    maxAmountInEuros: 50_000,
    minTermInMonths: 6,
    maxTermInMonths: 36,
    minSchufaRating: RatingLevel.A,
    maxSchufaRating: RatingLevel.P,
  });

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getSchufaBank = (): Bank => ({
  uuid: "8ab8fef5-1239-42d5-a199-7cb41f68fc21",
  name: "Schufa",
  jmsQueue: "schufa",
  thumbnailUrl: "http://0.0.0.0:8085/picture.jpg",
  isAsync: false,
  isActive: true,
  updatedAt: "2022-12-26T08:49:22",
});

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getSyncBank = (): Bank => ({
  uuid: "bf6981d4-0413-4767-8232-c7179b169bc7",
  name: "Deutsche Bank",
  jmsQueue: "deutschebank",
  thumbnailUrl: "http://0.0.0.0:8085/picture.jpg",
  isAsync: false,
  isActive: true,
  creditConfiguration: getCreditConfigurationWithNoEmptyFields(),
  updatedAt: "2022-12-26T08:49:22",
});

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getAsyncBank = (): Bank => ({
  uuid: "78eefcd4-2459-412e-857f-60f7c5d531c9",
  name: "Sparkasse",
  jmsQueue: "sparkasse",
  thumbnailUrl: "http://0.0.0.0:8085/picture.jpg",
  isAsync: true,
  isActive: true,
  creditConfiguration: getCreditConfigurationWithNoEmptyFields(),
  updatedAt: "2022-12-26T08:49:22",
});
