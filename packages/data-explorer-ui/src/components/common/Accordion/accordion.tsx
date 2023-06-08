import {
  Accordion as MAccordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import React, { ReactNode, useState } from "react";
import { TEXT_BODY_LARGE_500 } from "../../../theme/common/typography";
import { AddIcon } from "../CustomIcon/components/AddIcon/addIcon";
import { RemoveIcon } from "../CustomIcon/components/RemoveIcon/removeIcon";

export interface AccordionProps {
  collapseIcon?: ReactNode;
  details: ReactNode;
  expandIcon?: ReactNode;
  title: string;
}

export const Accordion = ({
  expandIcon = <AddIcon color="primary" fontSize="medium" />,
  collapseIcon = <RemoveIcon color="primary" fontSize="medium" />,
  details,
  title,
}: AccordionProps): JSX.Element => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const onToggleExpanded = (): void => {
    setExpanded((expanded) => !expanded);
  };

  return (
    <MAccordion expanded={expanded} onClick={onToggleExpanded}>
      <AccordionSummary expandIcon={expanded ? collapseIcon : expandIcon}>
        <Typography variant={TEXT_BODY_LARGE_500}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{details}</AccordionDetails>
    </MAccordion>
  );
};
