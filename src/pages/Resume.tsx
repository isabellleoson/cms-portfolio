import React, { useEffect, useState } from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Layout from "../components/Layout";
import styled from "styled-components";

const Container = styled.div`
  margin-left: 40px;
  margin-right: 40px;

  @media (max-width: 600px) {
    margin-left: 5px;
    margin-right: 5px;
  }
`;

const H1Container = styled.div`
  @media (max-width: 600px) {
    font-size: 25px;
    width: 140px;
  }
`;

const H1 = styled.h1`
  font-size: 70px;

  @media (max-width: 600px) {
    font-size: 25px;
    width: 100%;
  }
`;

const PDiv = styled.div`
  width: 60%;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const P = styled.p`
  width: 70%;
`;

const Ul = styled.ul`
  padding: 10px 120px 50px;

  @media (min-width: 600px) and (max-width: 950px) {
    padding: 10px 20px 40px;
  }
  @media (max-width: 600px) {
    padding: 10px 15px 30px;
  }
`;
const Li = styled.li`
  font-size: 18px;
  padding-bottom: 10px;

  @media (max-width: 600px) {
    font-size: 14px;
    padding-bottom: 5px;
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

  useEffect(() => {
    const pageTitle =
      filteredPosts().length > 0 ? filteredPosts()[0].node.title : "About";
    document.title = pageTitle;
  }, [selectedCategory]);

  return (
    <Layout>
      <Container>
        {filteredPosts().map(({ node }, index) => (
          <>
            <div className="flex items-center justify-between">
              <Ul className="drop-shadow-lg text-center rounded-b-full bg-blue-500">
                {categories.map((category, index) => (
                  <Li
                    className="text-stone-900 hover:text-stone-700"
                    key={`${index}`}
                  >
                    <button onClick={() => setSelectedCategory(category)}>
                      {category}
                    </button>
                  </Li>
                ))}
              </Ul>
              <H1Container>
                <H1 className="text-center">{node.title}</H1>
              </H1Container>
            </div>

            <PDiv
              className="flex items-end text-end justify-end w-full"
              key={index}
            >
              <P className="pb-6 bg-rose-50 p-4 text-end leading-8">
                {documentToReactComponents(JSON.parse(node.description.raw))}
              </P>
            </PDiv>
          </>
        ))}
      </Container>
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

export const Head: React.FC<PageProps<PortfolioQuery>> = ({ data }) => {
  const [selectedPage, setSelectedPage] = useState<string | null>("About");
  const allResume = data.allContentfulResumePages.edges;

  const resume = [...new Set(allResume.map((post) => post.node.title))];

  resume.sort();

  const filteredPosts = () => {
    return allResume.filter((post) => post.node.title === selectedPage);
  };
  return (
    <>
      <html lang="en" />
      {filteredPosts().map(({ node }, index) => (
        <>
          <title>{node.title}</title>
          <meta name="description" content={node.metaDescription} />
          <link
            rel="canonical"
            href={`https://ileosonportfolio.netlify.app/${node.slug}`}
          />
        </>
      ))}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </>
  );
};
