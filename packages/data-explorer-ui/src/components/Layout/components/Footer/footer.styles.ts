import styled from "@emotion/styled";
import { AppBar as MAppBar } from "@mui/material";
import { mediaTabletUp } from "../../../../styles/common/mixins/breakpoints";
import { inkMain } from "../../../../styles/common/mixins/colors";
import { textBodySmall400 } from "../../../../styles/common/mixins/fonts";
import { Socials as DXSocials } from "../../../common/Socials/socials";
import { Link as DXLink } from "../../../Links/components/Link/link";

export const AppBar = styled(MAppBar)`
  padding: 16px 0;

  .MuiToolbar-root {
    align-items: flex-start;
    flex-direction: column;
    gap: 24px;
    justify-content: space-between;
    min-height: 56px;
    padding: 0 16px;
  }

  ${mediaTabletUp} {
    padding: 0;

    .MuiToolbar-root {
      align-items: center;
      flex-direction: row;
      gap: unset;
    }
  }
` as typeof MAppBar;

export const Logos = styled.div`
  align-items: center;
  display: flex;
  gap: 24px;
`;

export const Links = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  gap: 24px;

  ${mediaTabletUp} {
    flex-direction: row;
  }
`;

export const Link = styled(DXLink)`
  ${textBodySmall400};
  align-items: center;
  color: ${inkMain};
  display: flex;
`;

export const Socials = styled(DXSocials)`
  gap: 8px;
`;
