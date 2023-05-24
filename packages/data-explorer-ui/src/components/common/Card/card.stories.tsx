import { Meta, StoryObj } from "@storybook/react";
import logo from "../../../images/logo.svg";
import { Card } from "./card";

export default {
  component: Card,
  title: "Components/Common/Card",
} as Meta<typeof Card>;

type Story = StoryObj<typeof Card>;

export const CardStory: Story = {
  args: {
    cardFn: () => {
      return;
    },
    secondaryText: "22 March 2022",
    text: "Far into the research process, CSER has much to share at the ACMG 2022 meeting over Mar 22-26 2022!",
    title: "Out Now! CSER & eMERGE Variant Bakeoff 2.0",
  },
};

export const CardActionsStory: Story = {
  args: {
    cardActions: [
      { label: "Learn More", url: "https://www.google.com/" },
      { label: "View in Catalog", url: "https://www.google.com/" },
    ],
    secondaryText: "Active August, 2020 to July, 2023",
    text: "The Centers for Common Disease Genomics are a collaborative large-scale genome sequencing effort to comprehensively identify rare risk and protective variants contributing to multiple common disease phenotypes.",
    title: "CCDG",
  },
};

export const CardMediaStory: Story = {
  args: {
    cardFn: () => {
      return;
    },
    media: { ...logo, height: 100, width: 89 },
    secondaryTitle:
      "Baylor College of Medicine, Houston: Sharon Plon, MD, PhD; Will Parsons, MD, PhD; and Amy McGuire, PhD",
    text: "The Baylor College of Medicine Texas KidsCanSeq Study aims to assess the utility of genome-scale testing, compared with more targeted methods, in diverse pediatric cancer patient populations and diverse healthcare settings in Texas.",
    title:
      "Evaluating Utility And Improving Implementation Of Genomic Sequencing For Pediatric Cancer Patients In The Diverse Population And Healthcare Settings Of Texas: The KidsCanSeq Study",
  },
};
