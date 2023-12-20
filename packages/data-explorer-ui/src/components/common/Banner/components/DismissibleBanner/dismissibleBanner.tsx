import {
  Alert as MAlert,
  AlertProps as MAlertProps,
  Fade,
} from "@mui/material";
import React, { ElementType, ReactNode, useState } from "react";

export interface CookieBannerProps extends MAlertProps {
  Alert?: ElementType;
  children: ReactNode;
  className?: string;
  onDismiss?: () => void;
  open: boolean;
}

export const DismissibleBanner = ({
  Alert = MAlert /* Requires forwardRef to be used as a child of Fade. */,
  className,
  children,
  onDismiss,
  open,
  ...props /* Spread props to allow for Mui AlertProps specific prop overrides. */
}: CookieBannerProps): JSX.Element => {
  const [isIn, setIsIn] = useState<boolean>(open);

  // Callback fired when the component requests to be closed.
  const onClose = (): void => {
    onDismiss?.();
    setIsIn(false);
  };

  return (
    <Fade in={isIn}>
      <Alert className={className} onClose={onClose} {...props}>
        {children}
      </Alert>
    </Fade>
  );
};
