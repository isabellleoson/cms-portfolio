import React, { useEffect, useState } from "react";
import { graphql, PageProps } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Layout from "../components/Layout";
import PortfolioPage from "../components/PortfolioPage";

interface PortfolioNode {
  id: string;
  slug: string;
  category: string;
  categoryFrameworks: string;
  underrubrik: string;
  beskrivning: {
    raw: string;
  };
  titel: string;
  bild: {
    url: string;
  };
}

interface PortfolioQuery {
  allContentfulPortfolio: {
    edges: {
      node: PortfolioNode;
    }[];
  };
}

const Category: React.FC<PageProps<PortfolioQuery>> = (props) => {
  const [selectedCategory, setSelectedCategory] = useState({
    category: "All",
    categoryFrameworks: "All",
  });
  const allPosts = props.data.allContentfulPortfolio.edges;

  const categories = [
    "Alla projekt",
    ...new Set(allPosts.map((post) => post.node.category)),
    ...new Set(allPosts.map((post) => post.node.categoryFrameworks)),
  ];

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

  console.log("selectedCategory:", selectedCategory);
  console.log("filteredPosts:", filteredPosts());

  return (
    <Layout pageTitle="">
      <main className="">
        <div className="flex justify-end">
          <select
            className="p-2 m-2 rounded-lg shadow-md"
            onChange={(e) => handleCategoryChange(e)}
          >
            {categories.map((category, index) => (
              <option key={`${index}`} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap justify-center space-x-4 mt-2">
          {filteredPosts().map(({ node }, index) => (
            <>
              <div key={index}>
                <PortfolioPage
                  slug={node.slug}
                  title={node.titel}
                  underrubrik={node.underrubrik}
                  imageUrl={node.bild ? node.bild.url : null}
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
  );
};

export const pageQuery = graphql`
  query FilterQuery {
    allContentfulPortfolio {
      edges {
        node {
          slug
          id
          category
          categoryFrameworks
          underrubrik
          beskrivning {
            raw
          }
          titel
          bild {
            url
          }
        }
      }
    }
  }
`;

export default Category;
