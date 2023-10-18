import { FORM_CONTROL_NAME, RequestValue, UploadResponse } from "./entities";

/**
 * Create support request.
 * @param url - Request URL.
 * @param requestValue - Request values.
 * @returns support request response.
 */
export async function createSupportRequest(
  url: string,
  requestValue: RequestValue
): Promise<Response> {
  const attachmentToken = requestValue[FORM_CONTROL_NAME.ATTACHMENT_TOKEN];
  const description = requestValue[FORM_CONTROL_NAME.DESCRIPTION];
  const email = requestValue[FORM_CONTROL_NAME.EMAIL];
  const name = requestValue[FORM_CONTROL_NAME.NAME];
  const subject = requestValue[FORM_CONTROL_NAME.SUBJECT];
  const type = requestValue[FORM_CONTROL_NAME.TYPE];
  const requestedFromUrl = window.location.href;
  return await fetchWithErrorRejection(url, {
    body: JSON.stringify({
      request: {
        comment: {
          body: `${description}\n\n------------------\nSubmitted from: ${requestedFromUrl}`,
          uploads: [attachmentToken],
        },
        custom_fields: [
          { id: 360012782111, value: email },
          { id: 360007369412, value: description },
          { id: 360007369392, value: subject },
          { id: 360012744452, value: type },
        ],
        requester: {
          email,
          name,
        },
        subject,
        ticket_form_id: 360000932232,
      },
    }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });
}

/**
 * Upload file to add as attachment to request.
 * @param url - Upload URL.
 * @param file - File.
 */
export async function uploadAttachment<T extends File>(
  url: string,
  file: T
): Promise<UploadResponse> {
  const res = await fetchWithErrorRejection(`${url}?filename=${file.name}`, {
    body: file,
    headers: {
      "Content-Type": "application/binary",
    },
    method: "POST",
  });
  const json = await res.json();
  return json.upload;
}

/**
 * Execute fetch, throwing error on non-200 response.
 * @param input - Request URL.
 * @param options - Request options.
 */
async function fetchWithErrorRejection(
  input: RequestInfo | URL,
  options?: RequestInit
): Promise<Response> {
  const res = await fetch(input, options);
  if (res.ok) {
    return res;
  }
  throw res;
}
