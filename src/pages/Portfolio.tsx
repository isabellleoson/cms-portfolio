import { graphql, PageProps } from "gatsby";
import * as React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Link } from "gatsby";
import PortfolioPage from "../components/PortfolioPage";
import Layout from "../components/Layout";

interface PortfolioProps {
  titel: string;
  slug: string;
  underrubrik: string;
  textfield: {
    textfield: string;
  };
  beskrivning: {
    raw: string;
    references: {
      file: {
        url: string | null;
      };
    };
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
      <Layout pageTitle="">
        <main className="flex flex-wrap justify-center gap-3">
          {data.allContentfulPortfolio.nodes.map((portfolio) => (
            <PortfolioPage
              slug={portfolio.slug}
              title={portfolio.titel}
              underrubrik={portfolio.underrubrik}
              imageUrl={portfolio.bild ? portfolio.bild.file.url : null}
              imageRaw={"" ? portfolio.beskrivning.references.file.url : null}
              description={
                ""
                  ? documentToReactComponents(
                      JSON.parse(portfolio.beskrivning.raw),
                    )
                  : null
              }
            />
          ))}
        </main>
      </Layout>
    </>
  );
};

export const query = graphql`
  query MyQuery {
    allContentfulPortfolio {
      nodes {
        slug
        underrubrik
        textfield {
          textfield
        }
        beskrivning {
          raw
          references {
            file {
              url
            }
          }
        }
        titel
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
