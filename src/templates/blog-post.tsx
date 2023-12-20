import React from "react";
import { graphql, PageProps } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Navbar from "../components/Navbar";
import { Link } from "gatsby";
import Layout from "../components/Layout";
import SinglePageComponent from "../components/SinglePageComponent";

interface BlogProps {
  titel: string;
  slug: string;
  beskrivning: {
    raw: string;
  };
  bild: {
    file: {
      url: string | null;
    };
  };
}

interface QueryResult {
  contentfulPortfolio: BlogProps;
}

const Blog: React.FC<PageProps<QueryResult>> = ({ data }) => {
  const portfolio = data.contentfulPortfolio;

  return (
    <>
      <Layout pageTitle="">
        <h1>{portfolio.titel}</h1>
        <SinglePageComponent
          imageUrl={portfolio.bild ? portfolio.bild.file.url : null}
          title={portfolio.titel}
          description={documentToReactComponents(JSON.parse(portfolio.beskrivning.raw))}
        />

        <p>
          {documentToReactComponents(JSON.parse(portfolio.beskrivning.raw))}
        </p>
      </Layout>
    </>
  );
};

export default Blog;

export const pageQuery = graphql`
  query MyQuery($slug: String!) {
    contentfulPortfolio(slug: { eq: $slug }) {
      titel
      slug
      bild {
        file {
          url
        }
      }
      beskrivning {
        raw
      }
    }
  }
`;

