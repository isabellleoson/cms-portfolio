import { graphql, PageProps } from "gatsby";
import * as React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Link } from "gatsby";
// import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SinglePageComponent from "../components/SinglePageComponent";

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
  allContentfulPortfolio: {
    nodes: PortfolioProps[];
  };
}

const SinglePage: React.FC<PageProps<QueryResult>> = ({ data }) => {
  return (
    <>
      {/* <Navbar pageTitle="Single page">
        <p></p>
      </Navbar> */}
      <main className="flex flex-wrap justify-center gap-3">
        {data.allContentfulPortfolio.nodes.map((portfolio: PortfolioProps) => (
          <SinglePageComponent
            imageUrl={portfolio.bild ? portfolio.bild.file.url : null}
            title={portfolio.titel}
            description={documentToReactComponents(
              JSON.parse(portfolio.beskrivning.raw),
            )}
          />
        ))}
      </main>
      <Footer />
    </>
  );
};

export const query = graphql`
  query MyQuery {
    allContentfulPortfolio(filter: { slug: { eq: "htmlcss" } }) {
      nodes {
        slug
        titel
        beskrivning {
          raw
        }
        bild {
          file {
            url
          }
        }
      }
    }
  }
`;

export default SinglePage;
