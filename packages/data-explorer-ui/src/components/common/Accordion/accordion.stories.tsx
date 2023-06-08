import { Box } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Accordion } from "./accordion";

export default {
  component: Accordion,
  title: "Components/Common/Accordion",
} as Meta<typeof Accordion>;

type Story = StoryObj<typeof Accordion>;

export const AccordionStory: Story = {
  args: {
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    title: "CSER Phase II Harmonized Measures",
  },
};

export const AccordionsStory: Story = {
  render: () => (
    <Box bgcolor="white">
      <Accordion
        details={AccordionStory.args?.details}
        title={AccordionStory.args?.title || ""}
      />
      <Accordion
        details={AccordionStory.args?.details}
        title={"Information about the CSER1 Consortium"}
      />
      <Accordion
        details={AccordionStory.args?.details}
        title={"Genetic and genomic online CME courses"}
      />
    </Box>
  ),
};
