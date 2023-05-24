import React, { Fragment, ReactNode } from "react";
import { StaticImageProps } from "../StaticImage/staticImage";
import { CardContent, CardSection } from "./card.styles";
import {
  CardAction,
  CardActionProps,
} from "./components/CardAction/cardAction";
import { CardActionArea as ActionArea } from "./components/CardActionArea/cardActionArea";
import { CardActions } from "./components/CardActions/cardActions";
import { CardMedia } from "./components/CardMedia/cardMedia";
import { CardSecondaryText } from "./components/CardSecondaryText/cardSecondaryText";
import { CardSecondaryTitle } from "./components/CardSecondaryTitle/cardSecondaryTitle";
import { CardText } from "./components/CardText/cardText";
import { CardTitle } from "./components/CardTitle/cardTitle";
import { RoundedCard } from "./components/RoundedCard/roundedCard";

export interface CardProps {
  cardActions?: CardActionProps[];
  cardUrl?: string;
  media?: StaticImageProps;
  secondaryText?: ReactNode; // e.g. Date.
  secondaryTitle?: ReactNode;
  text?: ReactNode;
  title?: ReactNode;
}

export const Card = ({
  cardActions,
  cardUrl,
  media,
  secondaryText,
  secondaryTitle,
  text,
  title,
}: CardProps): JSX.Element => {
  const CardActionArea = cardUrl ? ActionArea : Fragment;
  const cardActionAreaProps = cardUrl ? { cardUrl } : {};
  return (
    <RoundedCard>
      <CardActionArea {...cardActionAreaProps}>
        <CardSection>
          <CardContent>
            {title && <CardTitle>{title}</CardTitle>}
            {secondaryTitle && (
              <CardSecondaryTitle>{secondaryTitle}</CardSecondaryTitle>
            )}
            {text && <CardText>{text}</CardText>}
            {secondaryText && (
              <CardSecondaryText>{secondaryText}</CardSecondaryText>
            )}
          </CardContent>
          {media?.src && <CardMedia media={media} />}
          {cardActions && cardActions.length > 0 && (
            <CardActions>
              {cardActions.map((cardAction, i) => (
                <CardAction key={`${cardAction.label}${i}`} {...cardAction} />
              ))}
            </CardActions>
          )}
        </CardSection>
      </CardActionArea>
    </RoundedCard>
  );
};
