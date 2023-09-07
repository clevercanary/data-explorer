import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FormControl as MFormControl } from "@mui/material";
import { mediaTabletUp } from "../../../../styles/common/mixins/breakpoints";
import { inkMain, smokeMain } from "../../../../styles/common/mixins/colors";
import { textBody500 } from "../../../../styles/common/mixins/fonts";
import { ThemeProps } from "../../../../theme/theme";
import {
  sectionMargin,
  sectionMarginSm,
} from "../../../common/Section/section.styles";

export const margin = ({ theme }: ThemeProps) => css`
  ${sectionMargin}
  ${mediaTabletUp({ theme })} {
    ${sectionMarginSm}
  }
`;

export const FormControl = styled(MFormControl)`
  &.MuiFormControl-root {
    ${margin};
    display: flex;
    gap: 16px;

    .MuiFormLabel-root {
      ${textBody500};
      color: ${inkMain};
      display: block;
    }

    .MuiRadio-root {
      .MuiSvgIcon-root {
        font-size: 18px;
      }
    }
  }
`;

export const TableFormControl = styled(FormControl)`
  &.MuiFormControl-root {
    display: block;
    margin: 20px 0;

    .MuiFormLabel-root {
      ${margin};
    }

    .MuiFormControlLabel-root {
      gap: 12px;
    }

    .MuiTable-root {
      th {
        .MuiFormControlLabel-label {
          font: inherit;
        }
      }

      td,
      th {
        min-height: 48px;
        padding: 14px 16px;

        ${mediaTabletUp} {
          padding: 14px 20px;
        }
      }
    }
  }
`;

export const GridPaper = styled.div`
  background-color: ${smokeMain};
  border-color: ${smokeMain};
  border-style: solid;
  border-width: 1px 0 1px 0;
  display: grid;
  gap: 1px;
  margin: 20px 0;
`;
