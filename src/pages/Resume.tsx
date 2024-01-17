import React, { useState } from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Layout from "../components/Layout";

interface PortfolioNode {
  slug: string;
  category: string;
  description: {
    raw: string;
  };
  title: string;
  metaDescription: string;
}

interface PortfolioQuery {
  allContentfulResumePages: {
    edges: {
      node: PortfolioNode;
    }[];
  };
}

const Category: React.FC<PageProps<PortfolioQuery>> = (props) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "About",
  );

  const allPosts = props.data.allContentfulResumePages.edges;

  const categories = [...new Set(allPosts.map((post) => post.node.category))];

  categories.sort();

  const filteredPosts = () => {
    return allPosts.filter((post) => post.node.category === selectedCategory);
  };

  return (
    <Layout>
      <main className="ml-6 mr-6">
        <div className="">
          <div className="">
            {filteredPosts().map(({ node }, index) => (
              <>
                <div className="flex drop-shadow-xl">
                  <ul className="flex-3 pb-12 pl-10 pr-10 pt-2 h-full font-medium drop-shadow-lg rounded-b-full bg-[#3542F4]">
                    {categories.map((category, index) => (
                      <li
                        className="text-lg text-stone-200 hover:text-stone-400"
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
                    <h1 className="text-5xl mt-6 mb-6">{node.title}</h1>

                    <p className="w-2/3 pb-6">
                      {documentToReactComponents(
                        JSON.parse(node.description.raw),
                      )}
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
    allContentfulResumePages {
      edges {
        node {
          description {
            raw
          }
          slug
          metaDescription
          title
          category
        }
      }
    }
  }
`;

export default Category;

export const Head: HeadFC<PortfolioNode> = ({ data }) => {
  const title = data.title;
  const description = data.metaDescription;

  return (
    <>
      <html lang="en" />
      <meta name="description" content={description}></meta>
      <title>{title}</title>
      <link rel="canonical" href="https://ileosonportfolio.netlify.app/" />
    </>
  );
};
