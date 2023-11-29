import { Alert as MAlert, AlertProps as MAlertProps } from "@mui/material";
import React, { ReactNode } from "react";

export interface BannerProps extends MAlertProps {
  children: ReactNode;
  className?: string;
}

export const Banner = ({
  children,
  className,
  ...props /* Spread props to allow for Mui AlertProps specific prop overrides. */
}: BannerProps): JSX.Element => {
  return (
    <MAlert className={className} {...props}>
      {children}
    </MAlert>
  );
};
