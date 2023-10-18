import React, { ReactNode } from "react";
import { useConfig } from "../../../../../../../../../../hooks/useConfig";
import { ButtonPrimary } from "../../../../../../../../../common/Button/components/ButtonPrimary/buttonPrimary";
import { ANCHOR_TARGET } from "../../../../../../../../../Links/common/entities";
import { FormStep } from "../../formStep";

export interface AcceptTerraTOSProps {
  active: boolean;
  completed: boolean;
  isTOSCurrent?: boolean;
  step: ReactNode;
}

export const AcceptTerraTOS = ({
  active,
  completed,
  isTOSCurrent,
  step,
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
      active={active}
      completed={completed}
      step={step}
      text={
        isTOSCurrent === false ? (
          <p>
            {/* Only show reminder to re-accept TOS if the accepted terms of service version is not current.
            An undefined value could imply the TOS is not accepted. */}
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
