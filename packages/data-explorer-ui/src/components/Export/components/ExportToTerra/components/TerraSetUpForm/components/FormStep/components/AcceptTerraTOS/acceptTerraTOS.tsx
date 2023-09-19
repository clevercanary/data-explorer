import React from "react";
import { useConfig } from "../../../../../../../../../../hooks/useConfig";
import { ButtonPrimary } from "../../../../../../../../../common/Button/components/ButtonPrimary/buttonPrimary";
import { ANCHOR_TARGET } from "../../../../../../../../../Links/common/entities";
import { FormStep } from "../../formStep";

export interface AcceptTerraTOSProps {
  disabled: boolean;
  tosAccepted: boolean;
}

export const AcceptTerraTOS = ({
  disabled,
  tosAccepted,
}: AcceptTerraTOSProps): JSX.Element | null => {
  const { config } = useConfig();
  const { exportToTerraUrl } = config;

  const onOpenTerra = (): void => {
    if (exportToTerraUrl) {
      window.open(exportToTerraUrl, ANCHOR_TARGET.BLANK, "noopener noreferrer");
    }
  };

  return (
    <FormStep
      action={<ButtonPrimary onClick={onOpenTerra}>Go to Terra</ButtonPrimary>}
      completed={tosAccepted}
      disabled={disabled}
      text={
        <p>
          For full access to the Data Explorer, please sign in to Terra and
          review and accept the Terra terms of service when prompted.
        </p>
      }
      title="Accept the Terra Terms of Service"
    />
  );
};
