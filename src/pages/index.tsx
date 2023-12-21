import React from "react";
import { graphql, PageProps, HeadFC } from "gatsby";
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

const Index: React.FC<PageProps<QueryResult>> = ({ data }) => {
  const portfolio = data.contentfulPortfolio;

  return (
    <>
      <Layout pageTitle="">
        <main
          style={{
            backgroundImage: `url(${portfolio.bild.file.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "500px",
          }}
          className="flex"
        >
          <div className="p-2 text-end justify-end flex"></div>

          <div className="p-2 text-end items-end flex flex-col">
            <h1 className="">{portfolio.titel}</h1>

            <p className="w-4/12">
              {documentToReactComponents(JSON.parse(portfolio.beskrivning.raw))}
            </p>
          </div>
        </main>
      </Layout>
    </>
  );
};

export const pageQuery = graphql`
  query MyQuery {
    contentfulPortfolio(slug: { eq: "/" }) {
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

export default Index;

export const Head: HeadFC = () => <title>Hem</title>;
