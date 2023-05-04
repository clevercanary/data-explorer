import { Divider, Typography } from "@mui/material";
import { RoundedPaper } from "components/common/Paper/paper.styles";
import Link from "next/link";
import React from "react";
import { ButtonPrimary } from "../common/Button/button.styles";
import { AlertIcon } from "../common/CustomIcon/components/AlertIcon/alertIcon";
import { SectionActions } from "../common/Section/section.styles";
import { PRIORITY, StatusIcon } from "../common/StatusIcon/statusIcon";
import {
  Error as CustomError,
  ErrorDetailSectionContent,
  ErrorDetailsWrapper,
  ErrorSection,
  SectionContent,
} from "./error.styles";

interface ErrorDetailSectionProps {
  detail: string;
  title: string;
}

const ErrorDetailSection = ({
  detail,
  title,
}: ErrorDetailSectionProps): JSX.Element => (
  <ErrorDetailsWrapper>
    <Typography component="h3" variant="text-body-large-500">
      {title}
    </Typography>
    <RoundedPaper>
      <ErrorDetailSectionContent>{detail}</ErrorDetailSectionContent>
    </RoundedPaper>
  </ErrorDetailsWrapper>
);

export interface ErrorProps {
  errorMessage?: string;
  requestUrlMessage?: string;
  rootPath?: string;
}

export const Error = ({
  errorMessage,
  requestUrlMessage,
  rootPath,
}: ErrorProps): JSX.Element => {
  return (
    <CustomError>
      <ErrorSection>
        <StatusIcon priority={PRIORITY.HIGH} StatusIcon={AlertIcon} />
        <SectionContent>
          <Typography component="h1" variant="text-heading-xlarge">
            Error
          </Typography>
          <Typography variant="text-body-large-400">
            An error occurred processing your request
          </Typography>
        </SectionContent>
        {rootPath && (
          <SectionActions>
            <Link href={rootPath} passHref>
              <ButtonPrimary href="passHref">To Homepage</ButtonPrimary>
            </Link>
          </SectionActions>
        )}
      </ErrorSection>
      {(requestUrlMessage || errorMessage) && (
        <>
          <Divider />
          {requestUrlMessage && (
            <ErrorDetailSection
              detail={requestUrlMessage}
              title="Request URL"
            />
          )}

          {errorMessage && (
            <ErrorDetailSection detail={errorMessage} title="Error Message" />
          )}
        </>
      )}
    </CustomError>
  );
};
