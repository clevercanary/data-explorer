import React from "react";
import { Button } from "../../button";

export const ButtonText = ({
  ...props /* Spread props to allow for Button specific prop overrides. */
}): JSX.Element => {
  return <Button color="inherit" variant="text" {...props} />;
};
