import React from "react";
import { ButtonPrimary } from "../../../../../../../../../common/Button/components/ButtonPrimary/buttonPrimary";
import { ANCHOR_TARGET } from "../../../../../../../../../Links/common/entities";
import { FormStep } from "../../formStep";

export interface ConnectTerraToNIHAccountProps {
  hasNIHAccount: boolean;
}

export const ConnectTerraToNIHAccount = ({
  hasNIHAccount,
}: ConnectTerraToNIHAccountProps): JSX.Element | null => {
  const onGotoTutorial = (): void => {
    window.open("/", ANCHOR_TARGET.BLANK, "noopener noreferrer");
  };
  return (
    <FormStep
      action={
        <ButtonPrimary onClick={onGotoTutorial}>Go to Tutorial</ButtonPrimary>
      }
      completed={hasNIHAccount}
      disabled
      text={
        <p>
          Next, connect your Terra account to your NIH account by following the
          tutorial below.
        </p>
      }
      title="Connect Terra to your NIH Account"
    />
  );
};
