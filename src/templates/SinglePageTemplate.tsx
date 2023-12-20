import React from "react";
import { graphql, PageProps } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import SinglePageComponent from "../components/SinglePageComponent";
import Layout from "../components/Layout";

interface PortfolioProps {
  titel: string;
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
  contentfulPortfolio: PortfolioProps;
}

const SinglePageTemplate: React.FC<PageProps<QueryResult>> = ({ data }) => {
  const { titel, beskrivning, bild } = data.contentfulPortfolio;

  return (
    <>
  <Layout pageTitle="">
      <main className="flex flex-wrap justify-center gap-3">
        <SinglePageComponent
          imageUrl={bild ? bild.file.url : null}
          title={titel}
          description={documentToReactComponents(JSON.parse(beskrivning.raw))}
        />
      </main>
      </Layout>
    </>
  );
};

export const query = graphql`
  query($slug: String!) {
    contentfulPortfolio(slug: { eq: $slug }) {
      titel
      beskrivning {
        raw
        references {
          file {
            url
          }
        }
      }
      bild {
        file {
          url
        }
      }
    }
  }
`;

export default SinglePageTemplate;