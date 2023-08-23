import { Radio as MRadio, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import {
  TEXT_BODY_400_2_LINES,
  TEXT_BODY_500,
} from "../../../../../../../../theme/common/typography";
import { FormStatusCompletedIcon } from "../../../../../../../common/CustomIcon/components/FormStatusCompletedIcon/formStatusCompletedIcon";
import { FormStatusIncompleteIcon } from "../../../../../../../common/CustomIcon/components/FormStatusIncompleteIcon/formStatusIncompleteIcon";
import {
  Section,
  SectionActions,
  SectionContent,
  SectionStatus,
} from "../../terraSetUpForm.styles";

export interface FormStepProps {
  action: ReactNode;
  completed: boolean;
  disabled?: boolean;
  text: ReactNode;
  title: string;
}

export const FormStep = ({
  action,
  completed,
  disabled = false,
  text,
  title,
}: FormStepProps): JSX.Element => {
  return (
    <Section>
      <SectionStatus>
        <MRadio
          checked={completed}
          checkedIcon={<FormStatusCompletedIcon />}
          color={completed ? "success" : "default"}
          disabled={disabled}
          icon={<FormStatusIncompleteIcon />}
          size="small"
        />
      </SectionStatus>
      <SectionContent>
        <Typography
          color={completed || disabled ? "ink.light" : "ink.main"}
          component="h4"
          variant={TEXT_BODY_500}
        >
          {title}
        </Typography>
        {completed || disabled ? null : (
          <Typography
            color="ink.light"
            component="div"
            variant={TEXT_BODY_400_2_LINES}
          >
            {text}
          </Typography>
        )}
      </SectionContent>
      {completed || disabled ? null : <SectionActions>{action}</SectionActions>}
    </Section>
  );
};
