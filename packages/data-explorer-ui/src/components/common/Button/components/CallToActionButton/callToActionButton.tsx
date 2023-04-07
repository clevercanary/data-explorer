import NLink from "next/link";
import React, { ElementType } from "react";
import { ANCHOR_TARGET } from "../../../../Links/common/entities";
import { isClientSideNavigation } from "../../../../Links/common/utils";
import { ButtonPrimary } from "../../button.styles";
import { track } from "common/analytics/analytics";
import { EVENT_NAME, EVENT_PARAM } from "common/analytics/entities";

export interface CallToAction {
  label: string;
  target?: ANCHOR_TARGET;
  url: string;
}

export interface CallToActionButtonProps {
  ButtonElType?: ElementType;
  callToAction: CallToAction;
  className?: string;
  disabled?: boolean;
}

export const CallToActionButton = ({
  ButtonElType: Button = ButtonPrimary,
  callToAction,
  className,
  disabled = false,
}: CallToActionButtonProps): JSX.Element => {
  const { label, target, url } = callToAction;
  const isInternal = isClientSideNavigation(url);
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
        onClick={() => {
          track(EVENT_NAME.CTA_BUTTON_CLICKED, {
            [EVENT_PARAM.CTA_BUTTON_CLICKED]: url.split("=")[1]
          })
        }}
      rel="noopener"
      target={target || ANCHOR_TARGET.BLANK}
    >
      {label}
    </Button>
  );
};
