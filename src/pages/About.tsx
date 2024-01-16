import { HeadFC, PageProps, graphql } from "gatsby";
import React from "react";
import Layout from "../components/Layout";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Node } from "@contentful/rich-text-types";

interface AboutProps {
  title: string;
  slug: string;
  description: {
    raw: string;
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
          <h1 className="mb-4 text-center font-bold">{about.title}</h1>
          <span>
            {documentToReactComponents(
              JSON.parse(about.description.raw),
              options,
            )}
          </span>
        </div>
      </Layout>
    </>
  );
};

export const pageQuery = graphql`
  query MyQuery {
    contentfulResumePages(slug: { eq: "about" }) {
      description {
        raw
      }
      title
      slug
    }
  }
`;

export default About;



