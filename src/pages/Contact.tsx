import { HeadFC, PageProps, graphql } from "gatsby";
import React from "react";
import Layout from "../components/Layout";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Head from "../components/Head";

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

interface ContactProps {
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
  contentfulPages: ContactProps;
}

const Contact: React.FC<PageProps<QueryResult>> = ({ data }) => {
  const contact = data.contentfulPages;

  const imageData = data.contentfulPages.image;
  const image = getImage(imageData);

  return (
    <>
      <Head metaDescription={contact.metaDescription} titel={contact.titel} />
      <Layout>
        <div className="p-6 flex items-center justify-center space-x-10">
          <div className="max-w-md">
            {image && (
              <GatsbyImage image={image} alt={contact.image.description} />
            )}
          </div>
          {contact.richText ? (
            <span>
              {documentToReactComponents(JSON.parse(contact.richText.raw))}
            </span>
          ) : null}
        </div>
      </Layout>
    </>
  );
};

export const pageQuery = graphql`
  query MyQuery {
    contentfulPages(slug: { eq: "contact" }) {
      richText {
        raw
      }
      titel
      metaDescription
      slug
      image {
        gatsbyImageData
        description
      }
    }
  }
`;

export default Contact;
