import { AxiosError, isAxiosError } from "axios";
import React from "react";
import { ErrorBox } from "./components/errorBox";

interface TempErrorProps {
  error: Error | AxiosError;
}

export const TempError = ({ error }: TempErrorProps): JSX.Element => {
  const { code, request } = isAxiosError(error)
    ? {
        ...error,
        code: error.response?.status,
        request: error.request.responseURL,
      }
    : { ...error, code: null, request: null };

  return (
    <div>
      {code && <ErrorBox title="Error Code" message={`${code}`} />}
      {request && <ErrorBox title="Request URL" message={request} />}
      <ErrorBox title="Error Message" message={error.message} />
    </div>
  );
};
