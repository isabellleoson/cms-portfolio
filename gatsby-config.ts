import type { GatsbyConfig } from "gatsby";

const dotenv = require("dotenv");

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

// require("dotenv").config({
//   path: `.env${process.env.NODE_ENV}`,
// });

// module.exports = {
//   siteMetadata: {
//     title: `Portfolio Isabell Leoson`,
//     description: `Portfolio project`,
//     siteUrl: `https://ileosonportfolio.netlify.app/`,
//   },
// };

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Portfolio`,
    description: `Portfolio project`,
    // siteUrl: `https://ileosonportfolio.netlify.app/`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,

  plugins: [
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`titel`, `slug`],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields` values
          ContentfulPortfolio: {
            title: (node: { titel: string }) => node.titel,
            slug: (node: { slug: string }) => node.slug,
          },
        },
        // Optional filter to limit indexed nodes
        //filter: (node, getNode) => node.frontmatter.tags !== "exempt",
      },
    },
    {
      resolve: "gatsby-source-contentful",
      options: {
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        spaceId: process.env.CONTENTFUL_SPACE_ID,
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-postcss",
  ],
};

export default config;
