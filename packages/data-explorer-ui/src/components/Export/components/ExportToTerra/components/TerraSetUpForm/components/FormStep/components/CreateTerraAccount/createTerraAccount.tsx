import React from "react";
import { useConfig } from "../../../../../../../../../../hooks/useConfig";
import { ButtonPrimary } from "../../../../../../../../../common/Button/components/ButtonPrimary/buttonPrimary";
import { ANCHOR_TARGET } from "../../../../../../../../../Links/common/entities";
import { FormStep } from "../../formStep";

export interface CreateTerraAccountProps {
  hasTerraAccount: boolean;
}

export const CreateTerraAccount = ({
  hasTerraAccount,
}: CreateTerraAccountProps): JSX.Element | null => {
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
      completed={hasTerraAccount}
      text={
        <>
          <p>
            Create a Terra account using the same email that you used to log in
            to data explorer.
          </p>
          <p>
            Please note that Terra account registration may take several hours
            to complete.
          </p>
        </>
      }
      title="Create a Terra account"
    />
  );
};
