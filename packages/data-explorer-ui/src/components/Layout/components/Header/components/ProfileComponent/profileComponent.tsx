import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import { Button, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import React, { useCallback, useContext } from "react";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../../../hooks/useBreakpointHelper";
import { AuthContext } from "../../../../../../providers/authentication";
import { DESKTOP_SM } from "../../../../../../theme/common/breakpoints";
import { AuthenticationMenu } from "./components/AuthenticationMenu/authenticationMenu";

export const ProfileComponent = (): JSX.Element => {
  const { isAuthorized, requestAuthorization, userProfile } =
    useContext(AuthContext);
  const smDesktop = useBreakpointHelper(BREAKPOINT_FN_NAME.UP, DESKTOP_SM);
  const router = useRouter();
  const onLogout = useCallback((): void => {
    location.href = router.basePath;
  }, [router]);
  return (
    <>
      {isAuthorized && userProfile ? (
        <AuthenticationMenu onLogout={onLogout} userProfile={userProfile} />
      ) : smDesktop ? (
        <Button
          startIcon={<LoginRoundedIcon />}
          variant="nav"
          onClick={requestAuthorization}
        >
          Sign in
        </Button>
      ) : (
        <IconButton color="ink" onClick={requestAuthorization}>
          <LoginRoundedIcon />
        </IconButton>
      )}
    </>
  );
};
