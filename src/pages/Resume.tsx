import React, { useState } from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Layout from "../components/Layout";
import Head from "../components/Head";
import styled from "styled-components";

const H1 = styled.h1`
  font-size: 50px;

  @media (max-width: 600px) {
    font-size: 30px;
  }
`;

const Ul = styled.ul`
  padding: 5px 30px 50px;
  margin: 0 30px 50px;
  @media (max-width: 600px) {
    padding: 10px;
    padding-bottom: 40px;
  }
`;
const Li = styled.li`
  @media (max-width: 600px) {
    font-size: 14px;
    padding: 5px;
  }
`;

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

  const title = filteredPosts().length > 0 ? filteredPosts()[0].node.title : "";
  const metaDescription =
    filteredPosts().length > 0 ? filteredPosts()[0].node.metaDescription : "";

  return (
    <Layout>
      <Head metaDescription={metaDescription} titel={title} />
      <main className="ml-6 mr-6">
        <div className="">
          <div className="">
            {filteredPosts().map(({ node }, index) => (
              <>
                <div className="flex drop-shadow-xl">
                  <Ul className="flex-3 h-full drop-shadow-lg rounded-b-full bg-blue-500">
                    {categories.map((category, index) => (
                      <Li
                        className="text-stone-900 hover:text-stone-400"
                        key={`${index}`}
                      >
                        <button onClick={() => setSelectedCategory(category)}>
                          {category}
                        </button>
                      </Li>
                    ))}
                  </Ul>

                  <div
                    className="flex flex-1 flex-col items-end text-end bg-opacity-20"
                    key={index}
                  >
                    <H1 className="mt-6 mb-6">{node.title}</H1>

                    <p className="pb-6 bg-rose-50 p-4">
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
          category
          description {
            raw
          }
          slug
          title
          metaDescription
        }
      }
    }
  }
`;

export default Category;
