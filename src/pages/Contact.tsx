import { PageProps, graphql } from "gatsby";
import React from "react";
import Layout from "../components/Layout";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Node } from "@contentful/rich-text-types";

interface ContactProps {
  titel: string;
  slug: string;
  richText: {
    raw: string;
  };
  image: {
    url: string | null;
  };
}

interface QueryResult {
  contentfulPages: ContactProps;
}

const options = {
  renderNode: {
    "embedded-entry-block": (node: Node) => {
      console.log("Embedded Entry Node:", node);

      // Update this based on your actual node structure
      const { target } = node.data;

      if (target && target.fields) {
        // Customize this according to your content structure
        return <a href={`/${target.fields.slug}`}>{target.fields.title}</a>;
      }

      // Default behavior if the structure is not as expected
      return null;
    },
  },
};

const Contact: React.FC<PageProps<QueryResult>> = ({ data }) => {
  const contact = data.contentfulPages;

  return (
    <>
      <Layout pageTitle="">
        <div className="p-6">
          <h1 className="mb-4 text-center font-bold">{contact.titel}</h1>
          {contact.richText ? (
            <span>
              {documentToReactComponents(
                JSON.parse(contact.richText.raw),
                options,
              )}
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
      slug
      image {
        url
      }
    }
  }
`;

export default Contact;
