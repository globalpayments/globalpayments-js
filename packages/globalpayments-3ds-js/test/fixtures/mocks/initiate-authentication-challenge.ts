// tslint:disable:max-line-length

export default {
  acsTransactionId: "3ad375c8-4380-4ba5-bda1-7cc9cc1a2cf1",
  authenticationRequestType: "MERCHANT_SYSTEM_AUTHENTICATION",
  authenticationSource: "BROWSER",
  cardholderResponseInfo: null,
  challenge: {
    encodedChallengeRequest:
      "eyJ0aHJlZURTU2VydmVyVHJhbnNJRCI6IjZkMGUzM2Y0LTAwODQtNDA2Yy1iN2E5LTc2NWI1ZjA1MjkzNiIsImFjc1RyYW5zSUQiOiIzYWQzNzVjOC00MzgwLTRiYTUtYmRhMS03Y2M5Y2MxYTJjZjEiLCJtZXNzYWdlRXh0ZW5zaW9uIjpbeyJjcml0aWNhbGl0eUluZGljYXRvciI6dHJ1ZSwiZGF0YSI6InNvbWUgc2FtcGxlIGRhdGEiLCJpZCI6ImV4dC0wMDEiLCJuYW1lIjoic2FtcGxlIn1dLCJtZXNzYWdlVHlwZSI6IkNSZXEiLCJtZXNzYWdlVmVyc2lvbiI6IjIuMS4wIiwiY2hhbGxlbmdlV2luZG93U2l6ZSI6IjA1In0=",
    requestUrl: "http://localhost:8190/acs/challenge",
    windowSize: null,
  },
  challengeMandated: true,
  deviceRenderOptions: {
    sdk_interface: "BROWSER",
    sdk_ui_type: ["MULTI_SELECT"],
  },
  dsTransactionId: "e09822e9-a08b-4139-9aac-d0b3e95f504b",
  messageCategory: "PAYMENT_AUTHENTICATION",
  messageExtension: [
    {
      criticality_indicator: true,
      data: "some sample data",
      id: "ext-001",
      name: "sample",
    },
  ],
  messageVersion: "2.1.0",
  mpi: {
    authenticationValue: null,
    eci: null,
  },
  serverTransactionId: "6d0e33f4-0084-406c-b7a9-765b5f052936",
  status: "CHALLENGE_REQUIRED",
  statusReason: null,
};
