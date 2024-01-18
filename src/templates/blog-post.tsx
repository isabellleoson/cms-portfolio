import React, { ReactNode } from "react";
import { graphql, Link, PageProps } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Layout from "../components/Layout";
import Navbar from "../components/NavbarPortfolioProjects";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import styled from "styled-components";
// import Head from "../components/Head";

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
  metaDescription: string;
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
    // background-color: rgb(250, 244, 240);
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
    @media (max-width: 700px) {
      display: flex;
      flex-direction: column;
    }
  `;

  const FrontImageDiv = styled.div`
    width: 250px;
    margin: 15px;

    @media (max-width: 500px) {
      width: 200x;
    }
  `;

  const TextHeadingDiv = styled.div`
    margin: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content; center;
    width: 400px;

    @media(max-width: 500px) {
    padding-left: 30px;
    padding-right: 30px;

    }
  `;

  const H1 = styled.h1`
    @media (max-width: 500px) {
      font-size: 30px;
      margin-bottom: 5px;
    }
  `;

  const H2 = styled.h2`
    @media (max-width: 500px) {
      font-size: 15px;
    }
  `;

  const bgColor = {
    backgroundColor: " background-color: rgb(255 228 230)",
    padding: "50px",
  };

  return (
    <>
      {/* <Head
        metaDescription={portfolio.metaDescription}
        titel={portfolio.titel}
      /> */}
      <Layout>
        <Navbar />
        <main className="flex flex-col items-center pl-6 pr-6">
          <HeadingDiv className="">
            <TextHeadingDiv className="">
              <H1 className="font-bold">{portfolio.titel}</H1>
              <H2 className="text-center">{portfolio.underrubrik}</H2>
            </TextHeadingDiv>

            {portfolio.bild && (
              <FrontImageDiv className="">
                {image && (
                  <GatsbyImage className="shadow-lg p-2" image={image} alt="" />
                )}
              </FrontImageDiv>
            )}
          </HeadingDiv>
          <div
            style={bgColor}
            className="flex mb-4 justify-end max-w-full bg-rose-200 shadow-lg"
          >
            <div className="m-2 w-1/2 sm:w-full text-end">
              {documentToReactComponents(JSON.parse(portfolio.beskrivning.raw))}
            </div>
          </div>

          <OutsideGalleryContainer className="flex-wrap flex justify-center items-baseline]">
            {Array.isArray(galleriData) &&
              galleriData.map((image, index) => (
                <GalleryContainer
                  className="shadow-lg rounded-lg bg-rose-100"
                  key={index}
                >
                  {image.gatsbyImageData ? (
                    <GatsbyImage
                      className="shadow-lg w-1/2 rounded-lg flex flex-wrap"
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
      metaDescription
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

export const Head: React.FC<PageProps<QueryResult>> = ({ data }) => {
  const portfolio = data.contentfulPortfolio;
  return (
    <>
      <html lang="en" />
      <title>{portfolio.titel}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={portfolio.metaDescription} />
      <link
        rel="canonical"
        href={`https://ileosonportfolio.netlify.app/Resume${portfolio.slug}`}
      />
    </>
  );
};