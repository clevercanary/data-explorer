import { StyledComponent } from "@emotion/styled";
import { ButtonTypeMap, ExtendButtonBase } from "@mui/material";
import NLink from "next/link";
import React, { ElementType } from "react";
import { ANCHOR_TARGET } from "../../../../Links/common/entities";
import { isClientSideNavigation } from "../../../../Links/common/utils";
import * as StyledButtons from "../../button.styles";
import { ButtonPrimary } from "../../button.styles";

export interface CallToAction {
  label: string;
  target?: ANCHOR_TARGET;
  url: string;
}

export interface CallToActionButtonProps {
  ButtonElType?: ElementType | keyof typeof StyledButtons;
  callToAction: CallToAction;
  className?: string;
  disabled?: boolean;
}

const isStyledComponent = (
  buttonType: ElementType | keyof typeof StyledButtons | undefined
): buttonType is keyof typeof StyledButtons => {
  return Object.keys(StyledButtons).includes(
    buttonType as keyof typeof StyledButtons
  );
};

const getButtonElement = (
  buttonType: ElementType | keyof typeof StyledButtons | undefined
):
  | ElementType
  | ExtendButtonBase<ButtonTypeMap<object, "button">>
  | StyledComponent<object, object, object> => {
  if (!buttonType) return ButtonPrimary;

  if (isStyledComponent(buttonType)) {
    return StyledButtons[buttonType];
  }

  return buttonType;
};

export const CallToActionButton = ({
  ButtonElType,
  callToAction,
  className,
  disabled = false,
}: CallToActionButtonProps): JSX.Element => {
  const { label, target, url } = callToAction;
  const isInternal = isClientSideNavigation(url);
  const Button = getButtonElement(ButtonElType);

  return isInternal ? (
    <NLink href={url} passHref>
      <Button
        className={className}
        disabled={disabled}
        href="passHref"
        rel="noopener"
        target={target || ANCHOR_TARGET.SELF}
      >
        {label}
      </Button>
    </NLink>
  ) : (
    <Button
      className={className}
      disabled={disabled}
      href={url}
      rel="noopener"
      target={target || ANCHOR_TARGET.BLANK}
    >
      {label}
    </Button>
  );
};
