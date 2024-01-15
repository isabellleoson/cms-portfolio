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
  backgroundImage: {
    gatsbyImageData: images;
  };
  image: {
    gatsbyImageData: images;
  };
}

interface QueryResult {
  contentfulPages: BlogProps;
}

const Index: React.FC<PageProps<QueryResult>> = ({ data }) => {
  const portfolio = data.contentfulPages;

  const imageData = data.contentfulPages.backgroundImage;
  const image = getImage(imageData);

  return (
    <>
      <Layout pageTitle="">
        {portfolio.backgroundImage ? (
          <main
            // style={{
            //   backgroundImage: `url(${image})`,
            //   backgroundSize: "cover",
            //   backgroundPosition: "center",
            //   minHeight: "500px",
            // }}
            className="flex justify-end p-6 h-screen"
          >
            {image && <GatsbyImage image={image} alt="" />}

            <div className="p-2 text-end items-end flex flex-col">
              {/* <h1 className="m-2">{portfolio.titel}</h1> */}

              {portfolio.richText && (
                <div
                  className="text-5xl tracking-wider 
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

              {/* <p className="w-4/12">
              {documentToReactComponents(JSON.parse(portfolio.text.text))}
            </p> */}
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
      backgroundImage {
        gatsbyImageData
      }
      image {
        url
      }
    }
  }
`;

export default Index;

export const Head: HeadFC = () => <title>Hem</title>;
