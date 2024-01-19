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

// const config: GatsbyConfig = {
// siteMetadata: {
//   title: `Portfolio`,
//   description: `Portfolio project`,
//   // siteUrl: `https://ileosonportfolio.netlify.app/`,
// },

module.exports = {
  graphqlTypegen: true,

  plugins: [
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`titel`, `slug`],

        resolvers: {
          ContentfulPortfolio: {
            title: (node: { titel: string }) => node.titel,
            slug: (node: { slug: string }) => node.slug,
          },
        },
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
