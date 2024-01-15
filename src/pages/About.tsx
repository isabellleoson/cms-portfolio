import { PageProps, graphql } from "gatsby";
import React from "react";
import Layout from "../components/Layout";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Node } from "@contentful/rich-text-types";

interface AboutProps {
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
  contentfulResumePages: AboutProps;
}

const options = {
  renderNode: {
    "embedded-entry-block": (node: Node) => {
      console.log("Embedded Entry Node:", node);
      const { target } = node.data;

      if (target && target.fields) {
        return <a href={`/${target.fields.slug}`}>{target.fields.title}</a>;
      }
      return null;
    },
  },
};

const About: React.FC<PageProps<QueryResult>> = ({ data }) => {
  const about = data.contentfulResumePages;

  return (
    <>
      <Layout>
        <div className="p-6">
          <h1 className="mb-4 text-center font-bold">{about.titel}</h1>
          <span>
            {documentToReactComponents(JSON.parse(about.richText.raw), options)}
          </span>
        </div>
      </Layout>
    </>
  );
};

export const pageQuery = graphql`
  query MyQuery {
    contentfulResumePages(slug: { eq: "about" }) {
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

export default About;
