import type { Endpoint } from "@hennihaus/bamconfigbackend";

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getSchufaRestEndpoint = (): Endpoint => ({
  uuid: "a2058a25-5934-414a-a67f-afeb4c0e1bec",
  type: "REST",
  url: "",
  docsUrl: "http://bambusinessintegration.wi.hs-furtwangen.de/schufa/docs.html",
});

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getSyncBankRestEndpoint = (): Endpoint => ({
  uuid: "08191f25-c0c0-43ac-8244-217965006118",
  type: "REST",
  url: "",
  docsUrl:
    "http://bambusinessintegration.wi.hs-furtwangen.de/deutschebank/docs.html",
});

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getActiveMqEndpoint = (): Endpoint => ({
  uuid: "35540453-ea3d-4f87-a19f-486c29e68b4f",
  type: "JMS",
  url: "tcp://bambusinessintegration.wi.hs-furtwangen.de:61616",
  docsUrl: "",
});
