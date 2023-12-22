import React, { ReactNode } from "react";
import { AuthenticationResponse } from "../../../../../../../../../../hooks/useAuthentication/common/entities";
import { useAuthentication } from "../../../../../../../../../../hooks/useAuthentication/useAuthentication";
import { TerraEndpointResponse } from "../../../../../../../../../../hooks/useAuthentication/useFetchTerraProfile";
import { useConfig } from "../../../../../../../../../../hooks/useConfig";
import { ButtonPrimary } from "../../../../../../../../../common/Button/components/ButtonPrimary/buttonPrimary";
import { ANCHOR_TARGET } from "../../../../../../../../../Links/common/entities";
import { FormStep } from "../../formStep";

export interface AcceptTerraTOSProps {
  active: boolean;
  completed: boolean;
  step: ReactNode;
}

export const AcceptTerraTOS = ({
  active,
  completed,
  step,
}: AcceptTerraTOSProps): JSX.Element | null => {
  const { config } = useConfig();
  const { exportToTerraUrl } = config;
  const { terraProfileResponse } = useAuthentication();
  const isTOSAccepted = isTermsOfServiceAccepted(terraProfileResponse);

  const onOpenTerra = (): void => {
    if (exportToTerraUrl) {
      window.open(exportToTerraUrl, ANCHOR_TARGET.BLANK, "noopener noreferrer");
    }
  };

  return (
    <FormStep
      action={<ButtonPrimary onClick={onOpenTerra}>Go to Terra</ButtonPrimary>}
      active={active}
      completed={completed}
      step={step}
      text={
        isTOSAccepted ? (
          <p>
            {/* Only show reminder to re-accept TOS if the accepted terms of service version is not current.
            Accepted TOS imply the version is not current. */}
            Terra&apos;s terms of service have changed. Please login to Terra to
            accept the updated terms of service.
          </p>
        ) : (
          <p>
            For full access to the Data Explorer, please sign in to Terra and
            review and accept the Terra terms of service when prompted.
          </p>
        )
      }
      title="Accept the Terra terms of service"
    />
  );
};

/**
 * Returns true if the terms of service have been accepted.
 * @param terraProfileResponse - Terra profile response.
 * @returns true if the terms of service have been accepted.
 */
function isTermsOfServiceAccepted(
  terraProfileResponse: AuthenticationResponse<TerraEndpointResponse>
): boolean {
  return Boolean(terraProfileResponse.response?.enabled?.tosAccepted);
}
