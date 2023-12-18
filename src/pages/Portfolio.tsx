import { graphql, PageProps } from "gatsby";
import * as React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Link } from "gatsby";
import PortfolioPage from "../components/PortfolioPage";
import Navbar from "../components/Navbar";

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

const Portfolio: React.FC<PageProps<QueryResult>> = ({ data }) => {
  return (
    <>
 <Navbar pageTitle="Portfolio"> <p></p></Navbar>
      <main className="flex flex-row gap-3">
        {data.allContentfulPortfolio.nodes.map((portfolio: PortfolioProps) => (
          <PortfolioPage
            title={portfolio.titel}
            imageUrl={portfolio.bild ? portfolio.bild.file.url : null}
            description={documentToReactComponents(
              JSON.parse(portfolio.beskrivning.raw),
            )}
          />
        ))}
      </main>
    </>
  );
};

export const query = graphql`
  query {
    allContentfulPortfolio {
      nodes {
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

export default Portfolio;
