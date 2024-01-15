import React, { useState } from "react";
import { graphql, PageProps } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Layout from "../components/Layout";

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
  slug: string;
  category: string;
  richText: {
    raw: string;
  };
  titel: string;
  image: {
    gatsbyImageData: images;
  };
}

interface PortfolioQuery {
  allContentfulPages: {
    edges: {
      node: PortfolioNode;
    }[];
  };
}

const redColor = {
  backgroundColor: "#FCFF72",
  //   color: "white"
};

// const bgColor = {
//   backgroundColor: {
//     red: "#791717",
//     pink: "#FFD0F5",
//     yellow: "#FCFF72",
//   },
// };

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

  // const backgroundImageUrl =
  //   props.data.allContentfulPages.edges[0]?.node?.image?.url;

  return (
    <Layout pageTitle="">
      <main className="ml-6 mr-6">
        <div className="">
          <div className="">
            {filteredPosts().map(({ node }, index) => (
              <>
                <div className="flex">
                  <ul
                    // style={redColor}
                    className="flex-3 p-6 h-full font-medium shadow-md rounded-b-full bg-opacity-90 bg-[#FCFF72]"
                  >
                    {categories.map((category, index) => (
                      <li
                        className="text-lg text-stone-800 hover:text-stone-600"
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
            gatsbyImageData
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
