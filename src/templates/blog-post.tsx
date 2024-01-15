import React, { ReactNode } from "react";
import { graphql, Link, PageProps } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Layout from "../components/Layout";
import Navbar from "../components/NavbarPortfolioProjects";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import styled from "styled-components";

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

  const divStyle = {
    height: "80vh",
  };

  const GalleryContainer = styled.div`
    @media (min-width: 600px) {
      width: 500px;
    }
    @media (in-width: 800px) {
      width: 500px;
    }
    @media (min-width: 400px) {
      width: 500px;
      flex-wrap: wrap;
      display: flex;
    }
  `;

  const OutsideGalleryContainer = styled.div`
    @media (min-width: 600px) {
      flex-wrap: wrap;
      display: flex;
    }
    @media (min-width: 800px) {
      flex-wrap: wrap;
      display: flex;
    }
    @media (min-width: 400px) {
      width: 500px;
      flex-wrap: wrap;
      display: flex;
    }
  `;

  const divHight = {
    maxWidth: "23vw",
    margin: "10px",
    padding: "10px",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  };

  const bgColor = {
    backgroundColor: "rgba(126, 111, 78, 0.25)",
    padding: "50px",
  };

  return (
    <>
      <Layout>
        <Navbar />
        <main className="flex flex-col items-center pl-6 pr-6">
          <div className="flex space-x-10 items-center mb-4">
            <div className="mr-6 ml-6 text-center items-center justify-center">
              <h1 className="font-bold mb-2 text-2xl sm:text-sm md:text-sm ">
                {portfolio.titel}
              </h1>
              <h2 className="sm:text-sm md:text-sm">{portfolio.underrubrik}</h2>
            </div>

            {portfolio.bild && (
              <div className="p-6 shadow-xl max-w-sm lg:max-w-sm xl:max-w-sm">
                {image && (
                  <GatsbyImage className="shadow-lg p-2" image={image} alt="" />
                )}
              </div>
            )}
          </div>
          <div style={bgColor} className="flex justify-end">
            <div className="m-2 w-1/2 sm:w-full sm:text-sm text-end">
              {documentToReactComponents(JSON.parse(portfolio.beskrivning.raw))}
            </div>
          </div>
          <Link to={portfolio.link}>{portfolio.link}</Link>

          <OutsideGalleryContainer className="">
            {Array.isArray(galleriData) &&
              galleriData.map((image, index) => (
                <GalleryContainer key={index}>
                  {image.gatsbyImageData ? (
                    <GatsbyImage
                      className="shadow-lg w-full flex flex-wrap"
                      image={image.gatsbyImageData}
                      alt={`image with description: ${image.description}`}
                    />
                  ) : null}
                  {image.description && (
                    <div className="p-2 font-normal text-gray-700 text-center">
                      {image.description}
                    </div>
                  )}
                </GalleryContainer>
              ))}
          </OutsideGalleryContainer>
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
