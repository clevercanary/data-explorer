import { SiteConfig } from "./entities";

/**
 * Returns context default config for config provider.
 * @returns context default config for config provider.
 */
export function getDefaultConfig(): SiteConfig {
  return {
    browserURL: "",
    dataSource: {
      url: "",
    },
    entities: [],
    explorerTitle: "",
    layout: {
      footer: {
        logos: [],
        navLinks: [],
        socials: [],
      },
      header: {
        logo: {
          alt: "",
          link: "",
          src: undefined,
        },
        navLinks: [],
        socials: [],
      },
    },
  };
}
