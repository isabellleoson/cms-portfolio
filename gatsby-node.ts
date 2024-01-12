import { GatsbyNode } from "gatsby";
import path from "path";

interface ContentfulPortfolioNode {
  titel: string;
  slug: string;
  category: string;
}

interface ContentfulPortfolioQueryResult {
  allContentfulPortfolio: {
    nodes: ContentfulPortfolioNode[];
  };
}

const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions;

  const blogPost = path.resolve("./src/templates/blog-post.tsx");
  const categoryPost = path.resolve("./src/templates/CategoryPage.tsx");

  const result = await graphql<ContentfulPortfolioQueryResult>(
    `
      query MyContentfulQuery {
        allContentfulPortfolio {
          nodes {
            titel
            slug
            category
          }
        }
      }
    `,
  );

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful posts`,
      result.errors,
    );
    return;
  }

  const posts = result.data?.allContentfulPortfolio.nodes || [];

  if (posts.length > 0) {
    posts.forEach((post) => {
      createPage({
        path: `/${post.slug}/`,
        component: blogPost,
        context: {
          slug: post.slug,
        },
      });
    });
  }
};

export { createPages };
