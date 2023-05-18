export class DataExplorerError extends Error {
  statusCode?: string | number;
  requestUrlMessage?: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- DataExplorerError can receive any kind of error object
  constructor(error: Error & any) {
    super(error.message, error);
    this.statusCode = error.statusCode ?? error.response?.status;
    this.requestUrlMessage = error.request?.responseURL;
  }
}
