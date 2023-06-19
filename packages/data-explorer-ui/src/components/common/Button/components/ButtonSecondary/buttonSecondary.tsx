import React from "react";
import { Button } from "../../button";

export const ButtonSecondary = ({
  ...props /* Spread props to allow for Button specific prop overrides. */
}): JSX.Element => {
  return <Button color="secondary" variant="contained" {...props} />;
};
