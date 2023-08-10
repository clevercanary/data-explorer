import React, { Fragment, ReactNode } from "react";
import {
  Breadcrumb,
  Breadcrumbs,
} from "../../../../../common/Breadcrumbs/breadcrumbs";
import { CallToAction } from "../../../../../common/Button/components/CallToActionButton/callToActionButton";
import { Title } from "../../../../../common/Title/title";
import {
  BackPageHeroHeadline,
  CallToActionButton,
  HeroHeader,
} from "./backPageHero.styles";
import { SubTitle } from "./components/SubTitle/subTitle";

/**
 * Back page hero component comprising breadcrumbs, title, status and tabs.
 */

export interface BackPageHeroProps {
  breadcrumbs?: Breadcrumb[];
  callToAction?: CallToAction;
  children?: ReactNode;
  subTitle?: ReactNode;
  title?: ReactNode;
}

export const BackPageHero = ({
  breadcrumbs,
  callToAction,
  children,
  subTitle,
  title,
}: BackPageHeroProps): JSX.Element => {
  const HeroHeadline = callToAction ? BackPageHeroHeadline : Fragment;
  return (
    <>
      {(breadcrumbs || title) && (
        <HeroHeadline>
          <HeroHeader gap={1}>
            {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
            {title && <Title title={title} />}
            <SubTitle subTitle={subTitle} />
          </HeroHeader>
          {callToAction && <CallToActionButton callToAction={callToAction} />}
        </HeroHeadline>
      )}
      {children}
    </>
  );
};
