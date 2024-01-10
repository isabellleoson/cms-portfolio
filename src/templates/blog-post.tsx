import React, { ReactNode } from "react";
import { graphql, Link, PageProps } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";

interface BlogProps {
  titel: string;
  slug: string;
  underrubrik: string;
  link: string;
  image: {
    url: string;
  };
  beskrivning: {
    raw: string;
  };
  bild: {
    url: string;
  };
  galleri: {
    url: string | null;
    description: string | null;
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
    maxWidth: "23vw",
    margin: "10px",
    padding: "10px",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  };

  const bgColor = {
    backgroundColor: "rgba(126, 111, 78, 0.25)",
    padding: "30px",
  };

  return (
    <>
      <Layout pageTitle="">
        <Navbar />
        <main className="flex flex-col items-center pl-6 pr-6">
          <div style={divStyle} className="flex space-x-10 items-center mb-4">
            <div className="mr-6 ml-6 text-center items-center justify-center">
              <h1 className="font-bold mb-2 text-2xl">{portfolio.titel}</h1>
              <h2 className="">{portfolio.underrubrik}</h2>
            </div>

            {portfolio.bild && (
              <div className="max-w-md p-6 shadow-xl">
                <img
                  style={divHight}
                  src={portfolio.bild.url}
                  alt=""
                  className="max-w-full shadow-xl p-2 mt-2"
                />
              </div>
            )}
            {portfolio.image && (
              <div className="max-w-md p-2 shadow-xl">
                <img
                  src={portfolio.image.url}
                  alt=""
                  className="max-w-full shadow-xl p-2 mt-2"
                />
              </div>
            )}
          </div>
          <div style={bgColor} className="flex justify-end">
            <p className="m-2 w-1/2 text-end">
              {documentToReactComponents(JSON.parse(portfolio.beskrivning.raw))}
            </p>
          </div>
          <Link to={portfolio.link}>{portfolio.link}</Link>

          <div className="max-w-xs flex">
            {Array.isArray(portfolio.galleri) &&
              portfolio.galleri.map((image, index) => (
                <div className="w-1/2 bg-white border border-gray-200 rounded-lg shadow-md m-2">
                  <img
                    className="rounded-t-lg"
                    key={index}
                    src={image.url}
                    alt=""
                  />
                  {image.description && (
                    <p className="p-2 font-normal text-gray-700 text-center">
                      {image.description}
                    </p>
                  )}
                </div>
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
      image {
        url
      }
      beskrivning {
        raw
      }
      underrubrik
      galleri {
        url
        description
      }
      bild {
        url
      }
    }
  }
`;
