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

  const RichTextDiv = styled.div`
    @media (max-width: 700px) {
      font-size: 20px;
    }
  `;

  const ImgDiv = styled.div`
    @media (max-width: 700px) {
      width: 200%;
      height: 200%;
    }
  `;

  return (
    <>
      <Layout>
        {portfolio.image ? (
          <div className="flex p-6">
            <ImgDiv className="p-6 flex-1">
              {image && (
                <GatsbyImage image={image} alt={portfolio.image.description} />
              )}
            </ImgDiv>

            <div className="flex-1 text-end space-y-8 items-end flex flex-col sm:text-sm">
              <h1 className="text-5xl font-semibold">{portfolio.titel}</h1>

              {portfolio.richText && (
                <RichTextDiv
                  className="text-4xl tracking-wider 
                bg-[#F6F1E3] bg-opacity-90 p-6"
                >
                  <p className="drop-shadow-lg">
                    {documentToReactComponents(
                      JSON.parse(portfolio.richText.raw),
                    )}
                  </p>
                </RichTextDiv>
              )}

              <RichTextDiv className="space-x-5 text-3xl bg-blue-500 bg-opacity-95 p-6 w-full font-semibold tracking-wider">
                <Link to="/Category" className="">
                  Portfolio
                </Link>
                <Link to="/Resume" className="">
                  Resumé
                </Link>
              </RichTextDiv>
            </div>
          </div>
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

export const Head: HeadFC<QueryResult> = ({ data }) => {
  const title = data.contentfulPages.titel;
  const description = data.contentfulPages.metaDescription;

  return (
    <>
      <html lang="en" />
      <meta name="description" content={description}></meta>
      <title>{title}</title>
      <link rel="canonical" href="https://ileosonportfolio.netlify.app/" />
    </>
  );
};
