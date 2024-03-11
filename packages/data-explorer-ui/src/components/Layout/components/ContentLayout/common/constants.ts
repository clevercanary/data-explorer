import { LayoutStyle, PANEL_BACKGROUND_COLOR } from "./entities";

export const LAYOUT_STYLE_CONTRAST_LIGHT: LayoutStyle = {
  content: PANEL_BACKGROUND_COLOR.DEFAULT,
  navigation: PANEL_BACKGROUND_COLOR.SMOKE_LIGHT,
  outline: PANEL_BACKGROUND_COLOR.DEFAULT,
};

export const LAYOUT_STYLE_CONTRAST_LIGHTEST: LayoutStyle = {
  content: PANEL_BACKGROUND_COLOR.DEFAULT,
  navigation: PANEL_BACKGROUND_COLOR.SMOKE_LIGHTEST,
  outline: PANEL_BACKGROUND_COLOR.DEFAULT,
};

export const LAYOUT_STYLE_NO_CONTRAST_LIGHT: LayoutStyle = {
  content: PANEL_BACKGROUND_COLOR.SMOKE_LIGHT,
  navigation: PANEL_BACKGROUND_COLOR.SMOKE_LIGHT,
  outline: PANEL_BACKGROUND_COLOR.SMOKE_LIGHT,
};

export const LAYOUT_STYLE_NO_CONTRAST_LIGHTEST: LayoutStyle = {
  content: PANEL_BACKGROUND_COLOR.SMOKE_LIGHTEST,
  navigation: PANEL_BACKGROUND_COLOR.SMOKE_LIGHTEST,
  outline: PANEL_BACKGROUND_COLOR.SMOKE_LIGHTEST,
};
