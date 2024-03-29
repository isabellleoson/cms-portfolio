import React, { useEffect, useState } from "react";
import { graphql, PageProps } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Layout from "../components/Layout";
import PortfolioPage from "../components/PortfolioPage";
import Navbar from "../components/NavbarPortfolioProjects";

interface GatsbyImageSource {
  srcSet: string;
  type: string;
  sizes: string;
}

interface GatsbyImageData {
  images: {
    sources: GatsbyImageSource[];
    fallback: {
      src: String;
      srcSet: String;
      sizes: String;
    };
  };
  layout: string;
  width: number;
  height: number;
  backgroundColor: string;
}

interface images {
  gatsbyImageData: GatsbyImageData;
}

interface PortfolioNode {
  id: string;
  slug: string;
  category: string;
  metaDescription: string;
  categoryFrameworks: string;
  underrubrik: string;
  beskrivning: {
    raw: string;
  };
  titel: string;
  bild: {
    gatsbyImageData: images;
  };
}

interface PortfolioQuery {
  allContentfulPortfolio: {
    edges: {
      node: PortfolioNode;
    }[];
  };
}

const Portfolio: React.FC<PageProps<PortfolioQuery>> = (props) => {
  const [selectedCategory, setSelectedCategory] = useState({
    category: "All",
    categoryFrameworks: "All",
  });
  const allPosts = props.data.allContentfulPortfolio.edges;

  const categories = [
    "All projects",
    ...new Set(
      allPosts
        .map((post) => [post.node.category, post.node.categoryFrameworks])
        .flat()
        .filter((category) => category !== null && category !== ""),
    ),
  ];

  // Function to handle categories change is the selected dropdown
  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedCategory = event.target.value;
    const selectedcategoryFrameworks = event.target.value;

    setSelectedCategory({
      category: selectedCategory,
      categoryFrameworks: selectedcategoryFrameworks,
    });
  };

  // Function to filter posts based on the selected categories
  const filteredPosts = () => {
    if (
      selectedCategory.category === "All" ||
      selectedCategory.categoryFrameworks === "All"
    ) {
      return allPosts;
    } else {
      return allPosts.filter(
        (post) =>
          post.node.category === selectedCategory.category ||
          post.node.categoryFrameworks === selectedCategory.categoryFrameworks,
      );
    }
  };

  return (
    <>
      <Layout>
        <Navbar />
        <main className="">
          <div className="flex justify-end">
            <form>
              <label aria-label="Select for choosing portfolio project by categories of languages and frameworks">
                <select
                  id="categories"
                  className="p-2 m-4 rounded-lg shadow-md bg-white"
                  onChange={(e) => handleCategoryChange(e)}
                >
                  {categories.map((category, index) => (
                    <option className="p-2" key={`${index}`} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>
            </form>
          </div>
          <div className="flex flex-wrap justify-center mt-2">
            {filteredPosts().map(({ node }, index) => (
              <>
                <div className="" key={index}>
                  <PortfolioPage
                    key={node.slug}
                    slug={node.slug}
                    title={node.titel}
                    metaDescription={node.metaDescription}
                    underrubrik={node.underrubrik}
                    imageData={node.bild}
                    description={
                      ""
                        ? documentToReactComponents(
                            JSON.parse(node.beskrivning.raw),
                          )
                        : null
                    }
                  />
                </div>
              </>
            ))}
          </div>
        </main>
      </Layout>
    </>
  );
};

export const pageQuery = graphql`
  query FilterQuery {
    allContentfulPortfolio {
      edges {
        node {
          beskrivning {
            raw
          }
          bild {
            gatsbyImageData
            description
          }
          category
          categoryFrameworks
          galleri {
            gatsbyImageData
            description
          }
          metaDescription
          underrubrik
          titel
          slug
        }
      }
    }
  }
`;

export default Portfolio;

export const Head: React.FC = () => {
  return (
    <>
      <html lang="en" />
      <title>Portfolio</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Here you can find" />
      <link
        rel="canonical"
        href={`https://ileosonportfolio.netlify.app/Portfolio`}
      />
    </>
  );
};
