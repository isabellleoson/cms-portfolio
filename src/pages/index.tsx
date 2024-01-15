import React from "react";
import { graphql, PageProps, HeadFC, Link } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Layout from "../components/Layout";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

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

  return (
    <>
      <Layout pageTitle="">
        {portfolio.image ? (
          <main
            // style={{
            //   backgroundImage: `url(${image})`,
            //   backgroundSize: "cover",
            //   backgroundPosition: "center",
            //   minHeight: "500px",
            // }}
            className="flex justify-end p-6 h-screen"
          >
            {image && (
              <GatsbyImage image={image} alt={portfolio.image.description} />
            )}

            <div className="p-2 text-end items-end flex flex-col">
              <h1 className="m-2 text-5xl">{portfolio.titel}</h1>

              {portfolio.richText && (
                <div
                  className="text-4xl tracking-wider 
                bg-[#F6F1E3] bg-opacity-90 p-6"
                >
                  <p className="drop-shadow-lg">
                    {documentToReactComponents(
                      JSON.parse(portfolio.richText.raw),
                    )}
                  </p>
                </div>
              )}

              <div className="space-x-5 mt-5 text-4xl bg-rose-200 bg-opacity-95 p-6">
                <Link to="/Category" className="">
                  Portfolio
                </Link>
                <Link to="/Resume" className="">
                  Resumé
                </Link>
              </div>
            </div>
          </main>
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

export const Head: HeadFC = () => <title>Hem</title>;
