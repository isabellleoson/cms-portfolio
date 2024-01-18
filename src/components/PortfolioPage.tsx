import { GatsbyImage, getImage } from "gatsby-plugin-image";
import * as React from "react";
import Head from "./Head";
import styled from "styled-components";

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

interface PortfolioPageProps {
  title: string;
  description?: React.ReactNode;
  metaDescription: string;
  imageData?: {
    gatsbyImageData: images;
  };
  imageRaw?: string | null;
  slug?: string;
  underrubrik?: string;
}

const Container = styled.div`
  width: 250px;
  height: 490px;

  @media (max-width: 600px) {
    width: auto;
    height: auto;
  }
`;

const ImgDiv = styled.div`
  width: 250px;
  height: 300px;

  @media (max-width: 600px) {
    width: auto;
    height: auto;
  }
`;

const PortfolioPage: React.FC<PortfolioPageProps> = ({
  title,
  imageData,
  underrubrik,
  metaDescription,
  slug,
}) => {
  const gatsbyImage = imageData ? getImage(imageData) : null;
  return (
    <>
      <Head metaDescription={metaDescription} titel={title} />

      <a href={`/${slug}`}>
        <Container className="bg-white border border-gray-200 rounded-lg shadow-md m-2">
          {gatsbyImage && (
            <ImgDiv>
              <GatsbyImage
                className="rounded-t-lg h-full"
                alt="front image for portfolio project"
                image={gatsbyImage}
              />
            </ImgDiv>
          )}
          <div className="p-5">
            <h1 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h1>
            <h2 className="text-sm">{underrubrik}</h2>
          </div>
        </Container>
      </a>
    </>
  );
};

export default PortfolioPage;
