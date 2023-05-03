import { Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { CollapsableSection } from "../../../common/Section/components/CollapsableSection/collapsableSection";
import { SectionDetailsEmpty } from "../../../common/Section/components/SectionDetailsEmpty/sectionDetailsEmpty";
import { Stack } from "../../../common/Stack/stack";
import { ANCHOR_TARGET } from "../../../Links/common/entities";
import { Link } from "../../../Links/components/Link/link";
import { CitationLink } from "./citation.styles";

export interface CitationProps {
  projectPath?: string;
  url?: string;
}

export const Citation = ({ projectPath, url }: CitationProps): JSX.Element => {
  return (
    <CollapsableSection collapsable title="Citation">
      {projectPath && url ? (
        <Stack gap={1}>
          <Typography>
            To reference this project, please use the following link:
          </Typography>
          <CitationLink>
            <Link
              copyable
              label={buildCitationLinkLabel(url, projectPath)}
              target={ANCHOR_TARGET.BLANK}
              url={`${url}${projectPath}`}
            />
          </CitationLink>
        </Stack>
      ) : (
        <SectionDetailsEmpty />
      )}
    </CollapsableSection>
  );
};

/**
 * Builds citation label for display as citation link.
 * @param url - URL.
 * @param projectPath - Project path.
 * @returns Element to display as citation text.
 */
function buildCitationLinkLabel(url: string, projectPath: string): ReactNode {
  const { origin, pathname } = new URL(url);
  return (
    <>
      {origin}/
      <wbr />
      {removeLeadingSlash(pathname)}
      <wbr />
      {projectPath}
    </>
  );
}

/**
 * Removes leading slash "/" from path.
 * @param pathName - Path possibly containing leading /.
 * @returns pathName without leading slash.
 */
function removeLeadingSlash(pathName: string): string {
  return pathName.replace(/^\//, "");
}
