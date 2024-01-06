import React, { ReactNode } from "react";
import { graphql, PageProps } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Layout from "../components/Layout";

interface BlogProps {
  titel: string;
  slug: string;
  underrubrik: string;
  textfield: {
    textfield: string;
  };

  bild: {
    url: string;
  };
  galleri: {
    url: string | null;
  };
}

interface QueryResult {
  contentfulPortfolio: BlogProps;
}

const Blog: React.FC<PageProps<QueryResult>> = ({ data }) => {
  const portfolio = data.contentfulPortfolio;

  return (
    <>
      <Layout pageTitle={portfolio.titel}>
        <main className="flex flex-col">
          <h2>{portfolio.underrubrik}</h2>
          <div className="flex">
            {portfolio.bild && (
              <img src={portfolio.bild.url} alt="" className="max-w-sm p-2" />
            )}
            <div className="w-1/2 text-center bg-slate-400">
              {portfolio.textfield && (
                <p className="m-4 flex justify-end font-serif text-end bg-blue-500">
                  {portfolio.textfield.textfield}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap">
            {Array.isArray(portfolio.galleri) &&
              portfolio.galleri.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt=""
                  className="p-2"
                  width={200}
                />
              ))}
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Blog;

export const pageQuery = graphql`
  query MyQuery($slug: String!) {
    contentfulPortfolio(slug: { eq: $slug }) {
      slug
      titel
      textfield {
        textfield
      }
      underrubrik
      galleri {
        url
      }
      bild {
        url
      }
    }
  }
`;