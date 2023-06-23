import React, { Fragment, ReactNode } from "react";
import {
  Breadcrumb,
  Breadcrumbs,
} from "../../../../../common/Breadcrumbs/breadcrumbs";
import { CallToAction } from "../../../../../common/Button/components/CallToActionButton/callToActionButton";
import { Stack } from "../../../../../common/Stack/stack";
import {
  Status,
  StatusBadge,
} from "../../../../../common/StatusBadge/statusBadge";
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
  status?: Status;
  subTitle?: ReactNode;
  title?: ReactNode;
}

export const BackPageHero = ({
  breadcrumbs,
  callToAction,
  status,
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
          {callToAction && (
            <CallToActionButton
              callToAction={callToAction}
              row={status ? 3 : 2}
            />
          )}
        </HeroHeadline>
      )}
      {status && (
        <Stack direction="row" gap={4}>
          <StatusBadge status={status} />
        </Stack>
      )}
    </>
  );
};
