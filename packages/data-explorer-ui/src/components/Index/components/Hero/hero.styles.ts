import styled from "@emotion/styled";
import { mediaDesktopSmallUp } from "../../../../styles/common/mixins/breakpoints";
import { ButtonPrimary } from "../../../common/Button/components/ButtonPrimary/buttonPrimary";

interface Props {
  buttonWidget: boolean;
}

export const HeroLayout = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
`;

export const Widgets = styled.div`
  align-items: center;
  display: flex;
  height: 40px;
  justify-self: flex-start;

  ${mediaDesktopSmallUp} {
    justify-self: flex-end;
  }
`;

export const SummaryWidget = styled.div<Props>`
  align-items: center;
  border: 1px solid ${({ theme }) => theme.palette.smoke.main};
  border-radius: ${({ buttonWidget }) =>
    buttonWidget ? "4px 0 0 4px" : "4px"};
  display: grid;
  gap: 0 8px;
  grid-auto-flow: column;
  height: inherit;
  padding: 0 16px;
`;

export const ExportButton = styled(ButtonPrimary)`
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  margin-left: -1px;
`;
