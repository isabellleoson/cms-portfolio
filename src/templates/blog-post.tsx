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

  const GalleryContainer = styled.div`
    background-color: rgb(250, 244, 240);
    width: 300px;
    margin: 10px;
    padding: 15px;
  `;

  const OutsideGalleryContainer = styled.div`
    margin-left: 200px;
    margin-right: 200px;
  `;

  const HeadingDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  const FrontImageDiv = styled.div`
    width: 250px;
    margin: 15px;

    @media (max-width: 600px) {
      width: 300x;
    }
  `;

  const TextHeadingDiv = styled.div`
    margin: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content; center;
    width: 400px;
  `;

  const bgColor = {
    backgroundColor: "rgba(126, 111, 78, 0.25)",
    padding: "50px",
  };

  return (
    <>
      <Layout>
        <Navbar />
        <main className="flex flex-col items-center pl-6 pr-6">
          <HeadingDiv className="">
            <TextHeadingDiv className="">
              <h1 className="font-bold mb-6 text-5xl">{portfolio.titel}</h1>
              <h2 className="text-center">{portfolio.underrubrik}</h2>
            </TextHeadingDiv>

            {portfolio.bild && (
              <FrontImageDiv className="">
                {image && (
                  <GatsbyImage className="shadow-lg p-2" image={image} alt="" />
                )}
              </FrontImageDiv>
            )}
          </HeadingDiv>
          <div style={bgColor} className="flex justify-end">
            <div className="m-2 w-1/2 sm:w-full sm:text-sm text-end">
              {documentToReactComponents(JSON.parse(portfolio.beskrivning.raw))}
            </div>
          </div>
          <Link to={portfolio.link}>{portfolio.link}</Link>

          <OutsideGalleryContainer className="flex-wrap flex justify-center items-baseline]">
            {Array.isArray(galleriData) &&
              galleriData.map((image, index) => (
                <GalleryContainer className="" key={index}>
                  {image.gatsbyImageData ? (
                    <GatsbyImage
                      className="shadow-lg w-1/2 flex flex-wrap"
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
  query MyTemplateQuery($slug: String!) {
    contentfulPortfolio(slug: { eq: $slug }) {
      slug
      titel
      link
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
