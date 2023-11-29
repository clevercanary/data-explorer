import Link from "next/link";
import React, { ReactNode } from "react";
import { useSystemStatus } from "../../../../hooks/useSystemStatus";
import { HeroTitle, Title } from "../../../common/Title/title";
import {
  ExportButton,
  HeroLayout,
  SummaryWidget,
  Widgets,
} from "./hero.styles";

/**
 * ExploreView page hero component comprising title, summary counts, and export button.
 */

export interface HeroProps {
  SideBarButton?: ReactNode;
  Summaries?: ReactNode;
  title: HeroTitle;
}

export const Hero = ({
  SideBarButton,
  Summaries,
  title,
}: HeroProps): JSX.Element => {
  const { indexing } = useSystemStatus();
  return (
    <>
      {(title || SideBarButton || Summaries) && (
        <HeroLayout>
          <Title title={title} />
          {SideBarButton}
          {Summaries && (
            <Widgets>
              <SummaryWidget buttonWidget={true}>
                {/* TODO +n link widget, and accompanying Dot separator */}
                {Summaries}
              </SummaryWidget>
              <Link href="/export" passHref>
                <ExportButton disabled={indexing} href="passHref">
                  Export
                </ExportButton>
              </Link>
            </Widgets>
          )}
        </HeroLayout>
      )}
    </>
  );
};
