import React, { ReactNode } from "react";
import { HeroTitle } from "../common/Title/title";
import { Hero } from "./components/Hero/hero";
import { Index as IndexLayout } from "./index.styles";

export interface IndexProps {
  List?: ReactNode;
  ListHero?: ReactNode | ReactNode[];
  SubTitleHero?: ReactNode | ReactNode[];
  Summaries?: ReactNode;
  Tabs?: ReactNode;
  title: HeroTitle;
}

export const Index = ({
  List,
  ListHero,
  SubTitleHero,
  Summaries,
  Tabs,
  title,
}: IndexProps): JSX.Element => {
  return (
    <IndexLayout>
      <Hero Summaries={Summaries} title={title} />
      {SubTitleHero}
      {Tabs}
      {ListHero}
      {List}
    </IndexLayout>
  );
};
