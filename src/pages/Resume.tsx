import React, { useState } from "react";
import { graphql, PageProps } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Layout from "../components/Layout";

interface PortfolioNode {
  slug: string;
  category: string;
  richText: {
    raw: string;
  };
  titel: string;
  image: {
    url: string;
  };
}

interface PortfolioQuery {
  allContentfulPages: {
    edges: {
      node: PortfolioNode;
    }[];
  };
}

const Category: React.FC<PageProps<PortfolioQuery>> = (props) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "About",
  );
  const allPosts = props.data.allContentfulPages.edges;
  const categories = [...new Set(allPosts.map((post) => post.node.category))];

  const filteredPosts = () => {
    return allPosts.filter((post) => post.node.category === selectedCategory);
  };

  const backgroundImageUrl =
    props.data.allContentfulPages.edges[0].node.image.url;

  return (
    <Layout pageTitle="">
      <main
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "500px",
        }}
        className=""
      >
        <div className="mr-6">
          <div className="flex justify-end">
            <ul className="flex space-x-14 p-2 font-medium">
              {categories.map((category, index) => (
                <li
                  className="text-lg hover:text-gray-600"
                  key={`${index}`}
                >
                  <button onClick={() => setSelectedCategory(category)}>
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="">
            {filteredPosts().map(({ node }, index) => (
              <>
                <div
                  className="flex justify-end text-end bg-opacity-20"
                  key={index}
                >
                  <h1>{node.titel}</h1>
                  <p className="w-1/3">
                    {documentToReactComponents(JSON.parse(node.richText.raw))}
                  </p>
                </div>
              </>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export const pageQuery = graphql`
  query FilterQuery {
    allContentfulPages {
      edges {
        node {
          image {
            url
          }
          richText {
            raw
          }
          titel
          category
        }
      }
    }
  }
`;

export default Category;
