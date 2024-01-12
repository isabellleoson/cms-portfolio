import React, { ReactNode } from "react";
import { graphql, Link, PageProps } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

//Interfaces for single images
interface GatsbyImageSource {
  srcSet: string;
  type: string;
  sizes: string;
}

interface GatsbyImageData {
  images: {
    sources: GatsbyImageSource[];
    fallback: {
      src: String;
      srcSet: String;
      sizes: String;
    };
  };
  layout: string;
  width: number;
  height: number;
  backgroundColor: string;
}

interface images {
  gatsbyImageData: GatsbyImageData;
}

// Interfaces for gallery images

interface GatsbyGalleriSource {
  srcSet: string;
  type: string;
  sizes: string;
}

interface GatsbyGalleriData {
  galleri: {
    sources: GatsbyGalleriSource[];
    fallback: {
      src: String;
      srcSet: String;
      sizes: String;
    };
  };
  layout: string;
  width: number;
  height: number;
  backgroundColor: string;
}

interface galleri {
  gatsbyImageData: GatsbyGalleriData;
}

// Interface for all the contentful data

interface BlogProps {
  titel: string;
  slug: string;
  underrubrik: string;
  link: string;
  image: {
    url: string | null;
  };
  beskrivning: {
    raw: string;
  };
  bild: {
    gatsbyImageData: images;
  };
  galleri: {
    gatsbyImageData: galleri;
    description: string | null;
  };
}

interface QueryResult {
  contentfulPortfolio: BlogProps;
}

const Blog: React.FC<PageProps<QueryResult>> = ({ data }) => {
  const portfolio = data.contentfulPortfolio;

  const imageData = data.contentfulPortfolio.bild;
  const image = getImage(imageData);

  const galleriData = data.contentfulPortfolio.galleri;
  const galleri = getImage(galleriData);

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
                {image && (
                  <GatsbyImage
                    className="max-w-full shadow-lg p-2"
                    style={divHight}
                    image={image}
                    alt=""
                  />
                )}
              </div>
            )}
          </div>
          <div style={bgColor} className="flex justify-end">
            <div className="m-2 w-1/2 text-end">
              {documentToReactComponents(JSON.parse(portfolio.beskrivning.raw))}
            </div>
          </div>
          <Link to={portfolio.link}>{portfolio.link}</Link>

          <div className="max-w-xs flex">
            {Array.isArray(portfolio.galleri) &&
              portfolio.galleri.map((image, index) => (
                <div className="w-1/2 bg-white border border-gray-200 rounded-lg shadow-md m-2">
                  {galleri ? (
                    <GatsbyImage
                      className="max-w-full shadow-lg p-2"
                      style={divHight}
                      image={galleri}
                      alt=""
                    />
                  ) : null}

                  {image.description && (
                    <div className="p-2 font-normal text-gray-700 text-center">
                      {image.description}
                    </div>
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
        gatsbyImageData
        description
      }
      bild {
        gatsbyImageData
      }
    }
  }
`;
