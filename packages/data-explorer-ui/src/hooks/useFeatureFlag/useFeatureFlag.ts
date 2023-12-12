import { useEffect, useState } from "react";
import { FLAG } from "./common/entities";
import { getLocalStorage } from "./common/utils";

/**
 * Determine if feature is available to user.
 * @param featureFlag - Name of feature.
 * @returns true if feature is available to user.
 */
export function useFeatureFlag(featureFlag: string): boolean {
  /* Flag value from local storage. */
  const enabled = getLocalStorage(featureFlag) === FLAG.TRUE;
  /* Flag indicating if feature is available to user. */
  const [isEnabled, setIsEnabled] = useState<boolean>(enabled);

  /* Update state of enabled flag and redirect user if feature is not available to them. */
  useEffect(() => {
    setIsEnabled(enabled);
  }, [enabled, featureFlag]);

  return isEnabled;
}
