import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type { NavbarItem } from '@docusaurus/theme-common';

const navbarItems: NavbarItem[] = [
  {
    type: 'docSidebar',
    sidebarId: 'documentationSidebar',
    position: 'left',
    label: 'Documentation',
  },
  {
    type: 'docsVersionDropdown',
    position: 'right',
  },
];

const config: Config = {
  title: 'Eneris User Guide',
  tagline: 'Explore our guides and examples to start using Eneris.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.ener.is',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'eneris-tech', // Usually your GitHub org/user name.
  projectName: 'eneris-docs', // Usually your repo name.
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  trailingSlash: false,

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          lastVersion: 'current',
          includeCurrentVersion: true,
          versions: {
            current: {
              label: 'Latest',
              path: '/',
              banner: 'none',
            },
            legacy: {
              label: 'Legacy',
              path: '/legacy',
              banner: 'none'
            }
          }
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/eneris_social_card.png',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Eneris Docs',
      logo: {
        alt: 'Eneris Logo',
        src: 'img/welcome_logo.png',
      },
      items: navbarItems,
    },
    footer: {
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Overview',
              to: '/docs/overview',
            },
            // Footer can only have one link to the current version of the docs.
            // https://github.com/facebook/docusaurus/issues/7402
            {
              label: 'Getting Started',
              to: '/docs/getting-started/quickstart',
            },
            {
              label: 'Guides & Concepts',
              to: '/docs/category/concepts',
            },
            {
              label: 'FAQ',
              to: '/docs/FAQ',
            },
          ],
        },
        {
          title: 'About',
          items: [
            {
              label: 'Eneris',
              href: 'https://eneris.ca',
            },
            {
              label: 'Contact Us',
              to: '/docs/support/contact-support',
            }
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Eneris Technologies Inc.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    algolia: {
      appId: '0Q77U1C8IY',
      apiKey: 'aa925bbcc61b2aa30b9ace1707566f21',
      indexName: 'ener',
      contextualSearch: true,
      searchParameters: {},
      insights: true,
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
    [
      'posthog-docusaurus',
      {
        apiKey: 'phc_w6sxLsAcQgUg0TfjdZh4jjZhHj53LpKoxaSBR7rWKcP',
        appUrl: 'https://events.ener.is',
        enableInDevelopment: false,
      },
    ],
  ],
};

export default config;
