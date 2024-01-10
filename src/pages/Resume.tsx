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
    url: string | null;
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

  categories.sort();

  const filteredPosts = () => {
    return allPosts.filter((post) => post.node.category === selectedCategory);
  };

  const backgroundImageUrl =
    props.data.allContentfulPages.edges[0]?.node?.image?.url;

  return (
    <Layout pageTitle="">
      <main
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "500px",
        }}
        className="ml-6 mr-6"
      >
        <div className="">
          <div className="">
            {filteredPosts().map(({ node }, index) => (
              <>
                <div className="flex">
                  <ul className="flex-3 p-6 h-full font-medium bg-neutral-200">
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

                  <div
                    className="flex flex-1 flex-col items-end text-end bg-opacity-20"
                    key={index}
                  >
                    <h1 className="text-5xl mt-6 mb-6">{node.titel}</h1>

                    <p className="w-2/3">
                      {documentToReactComponents(JSON.parse(node.richText.raw))}
                    </p>
                  </div>
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
