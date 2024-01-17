import React from "react";
import { graphql, PageProps, HeadFC, Link } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Layout from "../components/Layout";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
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

interface BlogProps {
  titel: string;
  slug: string;
  metaDescription: string;
  richText: {
    raw: string;
  };
  image: {
    gatsbyImageData: images;
    description: string;
  };
}

interface QueryResult {
  contentfulPages: BlogProps;
}

const Index: React.FC<PageProps<QueryResult>> = ({ data }) => {
  const portfolio = data.contentfulPages;

  const imageData = data.contentfulPages.image;
  const image = getImage(imageData);

  const Container = styled.div`
    z-index: 10:
    @media (max-width: 700px) {
      flex-direction: column;
    }
  `;

  const RichTextDiv = styled.div`
    z-index: 0 !important;
    @media (max-width: 700px) {
      font-size: 20px;
    }
  `;
  const Pdiv = styled.div`
    z-index: 0 !important;
    @media (max-width: 700px) {
      font-size: 20px;
    }
  `;
  const H1 = styled.h1`
    font-size: 70px;
    @media (max-width: 700px) {
      font-size: 30px;
      margin-right: 30px;
    }
  `;

  const ImgDiv = styled.div`
    // @media (max-width: 500px) and (min-width: 700px);
    //  {
    //   object-fit: contain;
    //   height: 200%;
    // }
    @media (max-width: 500px) {
      display: none;
    }
  `;

  return (
    <>
      <Layout>
        {portfolio.image ? (
          <Container className="flex flex-wrap p-6">
            <ImgDiv className="p-6 flex-1">
              {image && (
                <GatsbyImage
                  className=""
                  image={image}
                  alt={portfolio.image.description}
                />
              )}
            </ImgDiv>

            <div className="flex-1 text-end space-y-8 items-end flex flex-col">
              <H1 className="font-semibold">{portfolio.titel}</H1>

              {portfolio.richText && (
                <RichTextDiv
                  className="text-4xl tracking-wider
                bg-[#F6F1E3] bg-opacity-90 p-6"
                >
                  <Pdiv className="drop-shadow-lg">
                    {documentToReactComponents(
                      JSON.parse(portfolio.richText.raw),
                    )}
                  </Pdiv>
                </RichTextDiv>
              )}

              <RichTextDiv className="space-x-5 text-3xl bg-blue-500 bg-opacity-95 p-6 w-full font-semibold tracking-wider">
                <Link to="/Portfolio" className="hover:text-stone-700">
                  Portfolio
                </Link>
                <Link to="/Resume" className="hover:text-stone-700">
                  Resumé
                </Link>
              </RichTextDiv>
            </div>
          </Container>
        ) : null}
      </Layout>
    </>
  );
};

export const pageQuery = graphql`
  query MyQuery {
    contentfulPages(slug: { eq: "/" }) {
      titel
      slug
      metaDescription
      richText {
        raw
      }
      image {
        gatsbyImageData
        description
      }
    }
  }
`;

export default Index;
