import React, { ReactNode } from "react";
import { graphql, Link, PageProps } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Layout from "../components/Layout";

interface BlogProps {
  titel: string;
  slug: string;
  underrubrik: string;
  link: string;
  beskrivning: {
    raw: string;
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

  const divStyle = {
    height: "80vh",
  };

  const divHight = {
    // maxHeight: "20vh",
    maxWidth: "26vw",
    marginTop: "10px",
    padding: "10px",
  };

  const bgColor = {
    backgroundColor: "yellow",
  };

  return (
    <>
      <Layout pageTitle="">
        <main className="flex flex-col items-center ">
          <div style={divStyle} className="flex space-x-10 items-center mb-4">
            <div className="text-center items-center justify-center ">
              <h1 className="font-bold mb-2 text-2xl">{portfolio.titel}</h1>
              <h2>{portfolio.underrubrik}</h2>
            </div>

            {portfolio.bild && (
              <div style={divHight} className="max-w-md p-2">
                <img
                  src={portfolio.bild.url}
                  alt=""
                  className="max-w-full p-2 mt-2"
                />
              </div>
            )}
          </div>
          <div className="flex justify-end bg-slate-600 z-50">
            <p className="m-2 w-1/2 text-end">
              {documentToReactComponents(JSON.parse(portfolio.beskrivning.raw))}
            </p>
          </div>
          <Link to={portfolio.link}>{portfolio.link}</Link>

          <div className="flex flex-wrap ">
            {Array.isArray(portfolio.galleri) &&
              portfolio.galleri.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt=""
                  className="p-2 m-2 shadow-md border"
                  width={250}
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
      link
      beskrivning {
        raw
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
