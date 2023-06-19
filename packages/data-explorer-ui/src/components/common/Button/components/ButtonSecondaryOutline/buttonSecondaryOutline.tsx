import React from "react";
import { Button } from "../../button";

export const ButtonSecondaryOutline = ({
  ...props /* Spread props to allow for Button specific prop overrides. */
}): JSX.Element => {
  return <Button color="secondary" variant="outlined" {...props} />;
};
