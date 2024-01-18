import React from "react";
import { graphql, PageProps, HeadFC, Link } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Layout from "../components/Layout";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import styled from "styled-components";
// import Head from "../components/Head";

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
    width-auto;
    @media (max-width: 700px) {
      font-size: 20px;
    
    }
  `;

  const LinkDiv = styled.div`
    @media (min-width: 600px) {
      display: none;
    }
  `;
  const Pdiv = styled.div`
    z-index: 0 !important;
    @media (max-width: 700px) {
      font-size: 20px;
    }
  `;
  const H1 = styled.h1`
    font-size: 50px;
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
    @media (max-width: 700px) {
      display: none;
    }
  `;

  return (
    <>
      {/* <Head
        metaDescription={portfolio.metaDescription}
        titel={portfolio.titel}
      /> */}
      <Layout>
        {portfolio.image ? (
          <Container className="flex pl-6 pr-6 pt-2">
            <ImgDiv className="p-4 flex-1">
              {image && (
                <GatsbyImage
                  className="shadow-lg"
                  image={image}
                  alt={portfolio.image.description}
                />
              )}
            </ImgDiv>

            <div className="flex-1 space-y-6 flex flex-col justify-center">
              <H1 className="font-semibold">{portfolio.titel}</H1>

              {portfolio.richText && (
                <RichTextDiv
                  className="text-3xl text-end tracking-wider
                bg-rose-50 shadow-lg bg-opacity-90 p-8"
                >
                  <Pdiv className="drop-shadow-lg">
                    {documentToReactComponents(
                      JSON.parse(portfolio.richText.raw),
                    )}
                  </Pdiv>
                </RichTextDiv>
              )}

              <LinkDiv className="space-x-5 text-3xl bg-blue-500 bg-opacity-95 p-6 w-full font-semibold tracking-wider shadow-lg">
                <Link to="/Portfolio" className="hover:text-stone-700">
                  Portfolio
                </Link>
                <Link to="/Resume" className="hover:text-stone-700">
                  Resumé
                </Link>
              </LinkDiv>
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

export const Head: HeadFC<BlogProps> = ({ data }) => {
  return (
    <>
      <html lang="en">
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={data.metaDescription} />
        <title>{data.titel}</title>
        <link rel="canonical" href="https://ileosonportfolio.netlify.app/" />
      </html>
    </>
  );
};
