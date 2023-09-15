import React from "react";
import { ButtonPrimary } from "../../../../../../../../../common/Button/components/ButtonPrimary/buttonPrimary";
import { ANCHOR_TARGET } from "../../../../../../../../../Links/common/entities";
import { FormStep } from "../../formStep";

export interface ConnectTerraToNIHAccountProps {
  disabled: boolean;
  linkedNIHAccount: boolean;
}

export const ConnectTerraToNIHAccount = ({
  disabled,
  linkedNIHAccount,
}: ConnectTerraToNIHAccountProps): JSX.Element | null => {
  const onGotoTutorial = (): void => {
    window.open(
      "https://support.terra.bio/hc/en-us/articles/360038086332-Linking-authorization-accessing-controlled-data-on-external-servers",
      ANCHOR_TARGET.BLANK,
      "noopener noreferrer"
    );
  };
  return (
    <FormStep
      action={
        <ButtonPrimary onClick={onGotoTutorial}>Go to Tutorial</ButtonPrimary>
      }
      completed={linkedNIHAccount}
      disabled={disabled}
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
