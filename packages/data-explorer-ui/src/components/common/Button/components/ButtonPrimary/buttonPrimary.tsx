import React from "react";
import { Button } from "../../button";

export const ButtonPrimary = ({
  ...props /* Spread props to allow for Button specific prop overrides. */
}): JSX.Element => {
  return <Button color="primary" variant="contained" {...props} />;
};
