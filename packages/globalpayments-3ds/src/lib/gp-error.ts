export interface IGPErrorReason {
  code: string;
  message: string;
}

export class GPError extends Error {
  public error = true;
  public reasons: IGPErrorReason[];

  constructor(reasons: IGPErrorReason[], message?: string) {
    super(message || "Error: see `reasons` property");
    this.reasons = reasons;
  }
}
